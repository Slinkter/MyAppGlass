import { describe, it, expect } from "vitest";
import { parseQuoteEntry, quoteEntryHref } from "@/entities/quote";

const HREF = "/presupuesto?categoria=ventana&sistema=ventana_nova";

describe("quoteEntryHref", () => {
  it("Nova en ventana lleva al cotizador", () => {
    expect(quoteEntryHref("ventana", "Nova")).toBe(HREF);
  });

  it("acepta variantes del nombre", () => {
    expect(quoteEntryHref("ventana", "Sistema Nova")).toBe(HREF);
    expect(quoteEntryHref("ventana", "NOVA")).toBe(HREF);
    expect(quoteEntryHref("ventana", "nova ")).toBe(HREF);
  });

  it("Serie 25 en ventana sigue por WhatsApp", () => {
    expect(quoteEntryHref("ventana", "Serie 25")).toBeNull();
  });

  it("Nova en otro servicio sigue por WhatsApp", () => {
    expect(quoteEntryHref("mampara", "Sistema Nova")).toBeNull();
  });

  it("sin datos devuelve null", () => {
    expect(quoteEntryHref(undefined, "Nova")).toBeNull();
    expect(quoteEntryHref("ventana", undefined)).toBeNull();
    expect(quoteEntryHref(undefined, undefined)).toBeNull();
  });
});

describe("parseQuoteEntry", () => {
  it("valida categoría y sistema", () => {
    expect(parseQuoteEntry("?categoria=ventana&sistema=ventana_nova")).toEqual({
      categoria: "ventana",
      sistema: "ventana_nova",
    });
    expect(parseQuoteEntry(new URLSearchParams("categoria=ventana&sistema=ventana_nova"))).not.toBeNull();
  });

  it("sistema inexistente devuelve null", () => {
    expect(parseQuoteEntry("categoria=ventana&sistema=no_existe")).toBeNull();
  });

  it("categoría desconocida devuelve null", () => {
    expect(parseQuoteEntry("categoria=mampara&sistema=ventana_nova")).toBeNull();
  });

  it("vacío devuelve null", () => {
    expect(parseQuoteEntry("")).toBeNull();
    expect(parseQuoteEntry(new URLSearchParams())).toBeNull();
  });
});
