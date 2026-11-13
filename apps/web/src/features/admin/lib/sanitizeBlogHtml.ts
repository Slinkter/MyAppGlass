/**
 * @file sanitizeBlogHtml.ts
 * @description Sanitizador de HTML para artículos del blog antes de guardar o previsualizar.
 * Aplica lista blanca de etiquetas seguras y elimina etiquetas/atributos peligrosos
 * (`<script>`, `<iframe>`, `<object>`, `<embed>`, `on*=`, `javascript:`).
 */

const BLOCKED_ELEMENTS = new Set([
  "script",
  "style",
  "iframe",
  "object",
  "embed",
  "form",
  "input",
  "button",
  "textarea",
  "select",
  "option",
  "svg",
  "math",
  "link",
  "meta",
  "base",
]);

const ALLOWED_TAGS = new Set([
  "h2",
  "h3",
  "h4",
  "p",
  "br",
  "hr",
  "strong",
  "b",
  "em",
  "i",
  "u",
  "s",
  "ul",
  "ol",
  "li",
  "blockquote",
  "a",
  "img",
  "code",
  "pre",
  "table",
  "thead",
  "tbody",
  "tr",
  "th",
  "td",
  "figure",
  "figcaption",
  "span",
  "div",
]);

const GLOBAL_ALLOWED_ATTRS = new Set(["class", "id"]);

const TAG_ALLOWED_ATTRS: Record<string, Set<string>> = {
  a: new Set(["href", "title", "target", "rel"]),
  img: new Set(["src", "alt", "title", "width", "height", "loading"]),
};

const VOID_TAGS = new Set(["br", "hr", "img"]);

/**
 * Verifica que una URL de `href` o `src` no use esquemas ejecutables (`javascript:`, `vbscript:`, `data:`).
 */
function isSafeUrl(rawUrl: string): boolean {
  // Elimina espacios y caracteres de control usados para evadir filtros (ej. "java\tscript:")
  // eslint-disable-next-line no-control-regex
  const normalized = rawUrl.replace(/[\u0000-\u0020]+/g, "").toLowerCase();
  if (
    normalized.startsWith("javascript:") ||
    normalized.startsWith("vbscript:") ||
    normalized.startsWith("data:")
  ) {
    return false;
  }
  return true;
}

function sanitizeAttributes(el: Element, tagName: string): void {
  const allowedForTag = TAG_ALLOWED_ATTRS[tagName];
  const attrs = Array.from(el.attributes);

  for (const attr of attrs) {
    const name = attr.name.toLowerCase();

    // Bloqueo explícito de cualquier manejador de eventos inline (onclick, onload, etc.)
    if (name.startsWith("on")) {
      el.removeAttribute(attr.name);
      continue;
    }

    const isAllowed =
      GLOBAL_ALLOWED_ATTRS.has(name) ||
      (allowedForTag ? allowedForTag.has(name) : false);

    if (!isAllowed) {
      el.removeAttribute(attr.name);
      continue;
    }

    if ((name === "href" || name === "src") && !isSafeUrl(attr.value)) {
      el.removeAttribute(attr.name);
    }
  }

  if (tagName === "a" && el.getAttribute("target") === "_blank") {
    el.setAttribute("rel", "noopener noreferrer");
  }
}

function sanitizeNode(node: Node, doc: Document): Node | null {
  if (node.nodeType === Node.TEXT_NODE) {
    return doc.createTextNode(node.textContent || "");
  }

  if (node.nodeType !== Node.ELEMENT_NODE) {
    return null;
  }

  const element = node as Element;
  const tagName = element.tagName.toLowerCase();

  if (BLOCKED_ELEMENTS.has(tagName)) {
    return null;
  }

  if (!ALLOWED_TAGS.has(tagName)) {
    const fragment = doc.createDocumentFragment();
    for (const child of Array.from(element.childNodes)) {
      const cleanChild = sanitizeNode(child, doc);
      if (cleanChild) {
        fragment.appendChild(cleanChild);
      }
    }
    return fragment;
  }

  const cleanEl = doc.createElement(tagName);
  for (const attr of Array.from(element.attributes)) {
    cleanEl.setAttribute(attr.name, attr.value);
  }
  sanitizeAttributes(cleanEl, tagName);

  if (!VOID_TAGS.has(tagName)) {
    for (const child of Array.from(element.childNodes)) {
      const cleanChild = sanitizeNode(child, doc);
      if (cleanChild) {
        cleanEl.appendChild(cleanChild);
      }
    }
  }

  return cleanEl;
}

/**
 * Sanitiza un fragmento HTML usando el parser del navegador con lista blanca de etiquetas.
 * Incluye respaldo por expresiones regulares en caso de ejecutarse sin DOM.
 */
export function sanitizeBlogHtml(html: string): string {
  if (!html) return "";

  if (typeof window !== "undefined" && typeof DOMParser !== "undefined") {
    const parser = new DOMParser();
    const parsed = parser.parseFromString(html, "text/html");
    const outputDoc = document.implementation.createHTMLDocument("");
    const container = outputDoc.createElement("div");

    for (const child of Array.from(parsed.body.childNodes)) {
      const clean = sanitizeNode(child, outputDoc);
      if (clean) {
        container.appendChild(clean);
      }
    }

    return container.innerHTML.trim();
  }

  // Respaldo básico para entornos sin DOM
  return html
    .replace(/<(script|style|iframe|object|embed)[^>]*>[\s\S]*?<\/\1>/gi, "")
    .replace(/<(iframe|object|embed)[^>]*\/?>/gi, "")
    .replace(/\son[a-z]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(/(href|src)\s*=\s*(["'])\s*javascript:[^"']*\2/gi, "$1=$2#$2")
    .trim();
}
