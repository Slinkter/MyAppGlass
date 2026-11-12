import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { system } from "@/shared/providers/theme";
import { QuoteCart } from "@/features/presupuesto/components/QuoteCart";
import type { WindowQuoteItem } from "@/entities/quote";

const mk = (id: string, widthM: number, heightM: number): WindowQuoteItem => ({
  id,
  widthM,
  heightM,
  glass: "crudo",
  finish: "ninguno",
  glassColor: "incoloro",
  profileColor: "negro",
});

const ITEMS = [mk("a", 1.2, 1.6), mk("b", 1.45, 1.6), mk("c", 1.48, 1.8)];

const setup = (over: Partial<React.ComponentProps<typeof QuoteCart>> = {}) => {
  const props = {
    items: ITEMS,
    outsideLaMolina: false,
    onOutsideLaMolinaChange: vi.fn(),
    onEdit: vi.fn(),
    onRemove: vi.fn(),
    onClear: vi.fn(),
    onGenerate: vi.fn(),
    ...over,
  };
  render(
    <ChakraProvider value={system}>
      <QuoteCart {...props} />
    </ChakraProvider>,
  );
  return props;
};

describe("QuoteCart", () => {
  it("muestra los totales dentro de La Molina", () => {
    setup();
    expect(screen.getByText("S/ 1 656,96")).toBeInTheDocument();
    expect(screen.getByText("S/ 298,25")).toBeInTheDocument();
    expect(screen.getAllByText("S/ 1 955,21").length).toBeGreaterThan(0);
    expect(screen.getByText(/Precio de lista: S\/ 2 052,97/)).toBeInTheDocument();
  });

  it("suma el flete fuera de La Molina", () => {
    setup({ outsideLaMolina: true });
    expect(screen.getByText("S/ 1 776,96")).toBeInTheDocument();
    expect(screen.getByText("S/ 319,85")).toBeInTheDocument();
    expect(screen.getAllByText("S/ 2 096,81").length).toBeGreaterThan(0);
    expect(screen.getAllByText("S/ 120,00").length).toBeGreaterThan(0);
  });

  it("estado vacío: genera deshabilitado y sin Limpiar", () => {
    setup({ items: [] });
    const gen = screen.getByRole("button", { name: "Generar presupuesto" });
    expect(gen).toBeDisabled();
    expect(gen).toHaveAttribute("aria-describedby");
    expect(screen.getByText("Agregue al menos una ventana para generar su presupuesto.")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Limpiar presupuesto" })).toBeNull();
  });

  it("Editar y Quitar llaman a sus callbacks con el id", () => {
    const p = setup();
    fireEvent.click(screen.getByRole("button", { name: "Editar ventana 2" }));
    fireEvent.click(screen.getByRole("button", { name: "Quitar ventana 3" }));
    expect(p.onEdit).toHaveBeenCalledWith("b");
    expect(p.onRemove).toHaveBeenCalledWith("c");
  });

  it("cambia la zona de instalación", () => {
    const p = setup();
    fireEvent.click(screen.getByRole("radio", { name: "No" }));
    expect(p.onOutsideLaMolinaChange).toHaveBeenCalledWith(true);
  });
});
