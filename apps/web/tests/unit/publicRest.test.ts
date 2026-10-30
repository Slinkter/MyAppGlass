import { describe, it, expect } from "vitest";
import { fromRestFields } from "@/shared/api/firebase/publicRest";
import { ServiceSchema } from "@/shared/api/firebase/types";

describe("publicRest - conversión de campos REST de Firestore", () => {
  it("convierte tipos primitivos, arreglos y mapas anidados", () => {
    const result = fromRestFields({
      title: { stringValue: "Ventanas" },
      order: { integerValue: "3" },
      lat: { doubleValue: -12.1 },
      published: { booleanValue: true },
      empty: { nullValue: null },
      createdAt: { timestampValue: "2026-10-30T15:32:55.084Z" },
      features: { arrayValue: { values: [{ stringValue: "antirruido" }] } },
      emptyList: { arrayValue: {} },
      gallery: {
        arrayValue: {
          values: [
            { mapValue: { fields: { id: { stringValue: "g1" }, url: { stringValue: "https://x/y.webp" } } } },
          ],
        },
      },
    });

    expect(result).toEqual({
      title: "Ventanas",
      order: 3,
      lat: -12.1,
      published: true,
      empty: null,
      createdAt: "2026-10-30T15:32:55.084Z",
      features: ["antirruido"],
      emptyList: [],
      gallery: [{ id: "g1", url: "https://x/y.webp" }],
    });
  });

  it("el resultado valida con ServiceSchema", () => {
    const raw = {
      id: "ventana",
      ...fromRestFields({
        slug: { stringValue: "ventana" },
        title: { stringValue: "Ventanas" },
        shortDescription: { stringValue: "Resumen" },
        fullDescription: { stringValue: "Detalle" },
        coverImage: { stringValue: "https://x/cover.webp" },
        order: { integerValue: "1" },
        published: { booleanValue: true },
      }),
    };
    const parsed = ServiceSchema.safeParse(raw);
    expect(parsed.success).toBe(true);
  });
});
