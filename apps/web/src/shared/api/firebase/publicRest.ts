/**
 * @file publicRest.ts
 * @description Lectura SERVER-ONLY (build / generateStaticParams / generateMetadata) de
 * `/services` y `/projects` por la API REST pública de Firestore, sin autenticación.
 * Alimenta el HTML del export estático (SEO). No importar desde componentes cliente:
 * en el navegador se usa el SDK (servicesRepository / projectsRepository).
 *
 * Si la lectura falla (red, reglas aún no desplegadas -> 403, documento inválido) se
 * registra un aviso y se devuelve `[]`, de modo que el build nunca se rompe.
 * @module shared/api/firebase
 */

import { logger } from "@/shared/utils/logger";
import {
  ProjectSchema,
  ServiceSchema,
  type Project,
  type Service,
} from "./types";

const PROJECT_ID = "gya-app-4c8a9";
const PAGE_SIZE = 300;
const REQUEST_TIMEOUT_MS = 15000;
/** Evita repetir la lectura en cada página del build (generateStaticParams + metadata + page). */
const CACHE_TTL_MS = 30000;

type RestValue = Record<string, unknown>;

interface RestDocument {
  name: string;
  fields?: Record<string, RestValue>;
}

interface RestListResponse {
  documents?: RestDocument[];
  nextPageToken?: string;
}

const getBaseUrl = (): string =>
  process.env.NEXT_PUBLIC_USE_EMULATORS === "true"
    ? `http://127.0.0.1:8081/v1/projects/${PROJECT_ID}/databases/(default)/documents`
    : `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`;

/** Convierte un valor tipado de la API REST de Firestore a un valor JS plano. */
export const fromRestValue = (value: RestValue): unknown => {
  if ("stringValue" in value) return value.stringValue;
  if ("integerValue" in value) return Number(value.integerValue);
  if ("doubleValue" in value) return Number(value.doubleValue);
  if ("booleanValue" in value) return value.booleanValue;
  if ("nullValue" in value) return null;
  if ("timestampValue" in value) return value.timestampValue;
  if ("referenceValue" in value) return value.referenceValue;
  if ("arrayValue" in value) {
    const arr = value.arrayValue as { values?: RestValue[] };
    return (arr.values ?? []).map(fromRestValue);
  }
  if ("mapValue" in value) {
    const map = value.mapValue as { fields?: Record<string, RestValue> };
    return fromRestFields(map.fields ?? {});
  }
  return undefined;
};

/** Convierte el mapa `fields` de un documento REST a un objeto plano. */
export const fromRestFields = (fields: Record<string, RestValue>): Record<string, unknown> => {
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(fields)) out[key] = fromRestValue(value);
  return out;
};

const listCollection = async (collection: string): Promise<RestDocument[]> => {
  const documents: RestDocument[] = [];
  let pageToken: string | undefined;
  do {
    const url = new URL(`${getBaseUrl()}/${collection}`);
    url.searchParams.set("pageSize", String(PAGE_SIZE));
    if (pageToken) url.searchParams.set("pageToken", pageToken);

    // Sin `cache: "no-store"`: forzaría la ruta a dinámica y rompería `output: 'export'`.
    const response = await fetch(url, { signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS) });
    if (!response.ok) {
      throw new Error(`Firestore REST respondió ${response.status} al leer /${collection}`);
    }
    const body = (await response.json()) as RestListResponse;
    documents.push(...(body.documents ?? []));
    pageToken = body.nextPageToken;
  } while (pageToken);
  return documents;
};

const readCollection = async <T>(
  collection: string,
  parse: (raw: Record<string, unknown>) => T | null
): Promise<T[]> => {
  // Solo servidor: en el navegador se usa el SDK de Firebase.
  if (typeof window !== "undefined") return [];
  try {
    const documents = await listCollection(collection);
    const items: T[] = [];
    for (const document of documents) {
      const id = document.name.split("/").pop() ?? "";
      const raw = { ...fromRestFields(document.fields ?? {}) };
      raw.id = typeof raw.id === "string" && raw.id ? raw.id : id;
      const parsed = parse(raw);
      if (parsed) items.push(parsed);
      else logger.warn("Documento de Firestore inválido omitido en la lectura de build", { collection, id });
    }
    return items;
  } catch (error) {
    logger.warn(
      "No se pudo leer Firestore por REST durante el build; se continúa sin datos remotos",
      { collection, error: error instanceof Error ? error.message : String(error) }
    );
    return [];
  }
};

const memoize = <T,>(load: () => Promise<T>): (() => Promise<T>) => {
  let cached: { at: number; value: Promise<T> } | null = null;
  return () => {
    if (!cached || Date.now() - cached.at > CACHE_TTL_MS) {
      cached = { at: Date.now(), value: load() };
    }
    return cached.value;
  };
};

/** Servicios publicados, ordenados por `order`. `[]` si la lectura falla. */
export const getBuildServices = memoize(async (): Promise<Service[]> => {
  const services = await readCollection<Service>("services", (raw) => {
    const result = ServiceSchema.safeParse(raw);
    return result.success ? result.data : null;
  });
  return services.filter((s) => s.published).sort((a, b) => a.order - b.order);
});

/** Proyectos publicados, más recientes primero (ids numéricos descendentes). `[]` si falla. */
export const getBuildProjects = memoize(async (): Promise<Project[]> => {
  const projects = await readCollection<Project>("projects", (raw) => {
    const result = ProjectSchema.safeParse(raw);
    return result.success ? result.data : null;
  });
  return projects
    .filter((p) => p.published)
    .sort((a, b) => {
      const na = Number(a.id);
      const nb = Number(b.id);
      return !Number.isNaN(na) && !Number.isNaN(nb) ? nb - na : 0;
    });
});
