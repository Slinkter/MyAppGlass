import type { Product } from "@/shared/schemas/ecommerce-schemas";

export const IGV_RATE = 0.18;

export interface CartLine {
  productId: string;
  sku: string;
  name: string;
  unit: string;
  unitPrice: number;
  quantity: number;
  /** Stock conocido al agregar; se revalida contra el catálogo vivo. */
  maxStock: number;
  imageUrl?: string;
}

export interface CartTotals {
  subtotal: number;
  igv: number;
  total: number;
  units: number;
}

const round2 = (n: number) => Math.round(n * 100) / 100;

/** Ajusta una cantidad al rango [0, stock] y a entero. */
export function clampQuantity(quantity: number, maxStock: number): number {
  if (!Number.isFinite(quantity)) return 0;
  return Math.max(0, Math.min(Math.floor(quantity), Math.max(0, Math.floor(maxStock))));
}

export function addToCart(lines: CartLine[], product: Product, quantity = 1): CartLine[] {
  const productId = product.id ?? product.sku;
  const existing = lines.find((l) => l.productId === productId);
  const qty = clampQuantity((existing?.quantity ?? 0) + quantity, product.stock);
  if (qty <= 0) return lines;
  if (existing) {
    return lines.map((l) =>
      l.productId === productId ? { ...l, quantity: qty, maxStock: product.stock, unitPrice: product.unitPrice } : l,
    );
  }
  return [
    ...lines,
    {
      productId,
      sku: product.sku,
      name: product.name,
      unit: product.unit,
      unitPrice: product.unitPrice,
      quantity: qty,
      maxStock: product.stock,
      imageUrl: product.imageUrl,
    },
  ];
}

export function updateQuantity(lines: CartLine[], productId: string, quantity: number): CartLine[] {
  return lines
    .map((l) => (l.productId === productId ? { ...l, quantity: clampQuantity(quantity, l.maxStock) } : l))
    .filter((l) => l.quantity > 0);
}

export function removeFromCart(lines: CartLine[], productId: string): CartLine[] {
  return lines.filter((l) => l.productId !== productId);
}

/** Revalida el carrito contra el stock/precio vigentes del catálogo (3.2). */
export function reconcileWithCatalog(lines: CartLine[], catalog: Product[]): CartLine[] {
  const byId = new Map(catalog.map((p) => [p.id ?? p.sku, p]));
  return lines
    .map((l) => {
      const p = byId.get(l.productId);
      if (!p || p.isActive === false) return { ...l, quantity: 0 };
      return { ...l, maxStock: p.stock, unitPrice: p.unitPrice, quantity: clampQuantity(l.quantity, p.stock) };
    })
    .filter((l) => l.quantity > 0);
}

/** Los precios de catálogo se tratan como precio sin IGV (igual que pedidos de admin). */
export function computeTotals(lines: CartLine[]): CartTotals {
  const subtotal = round2(lines.reduce((acc, l) => acc + l.unitPrice * l.quantity, 0));
  const igv = round2(subtotal * IGV_RATE);
  return {
    subtotal,
    igv,
    total: round2(subtotal + igv),
    units: lines.reduce((acc, l) => acc + l.quantity, 0),
  };
}

/** Cross-selling (3.6): complementarios según lo que hay en el carrito. */
const COMPLEMENT_RULES: { when: RegExp; suggest: RegExp[] }[] = [
  { when: /serie\s*25|nova/i, suggest: [/rodamiento|rodaje/i, /pico de loro|cerradura/i] },
  { when: /templado|vidrio/i, suggest: [/pico de loro|cerradura/i] },
];

export function getCrossSells(lines: CartLine[], catalog: Product[], max = 3): Product[] {
  const inCart = new Set(lines.map((l) => l.productId));
  const out: Product[] = [];
  for (const rule of COMPLEMENT_RULES) {
    if (!lines.some((l) => rule.when.test(l.name))) continue;
    for (const re of rule.suggest) {
      const hit = catalog.find(
        (p) => p.isActive !== false && p.stock > 0 && re.test(p.name) && !inCart.has(p.id ?? p.sku) && !out.includes(p),
      );
      if (hit) out.push(hit);
    }
  }
  return out.slice(0, max);
}

export function buildWhatsAppOrderMessage(
  lines: CartLine[],
  totals: CartTotals,
  customer: { name: string; phone: string; address: string; notes?: string },
): string {
  const rows = lines.map((l) => `- ${l.quantity} x ${l.name} (${l.sku}) = S/ ${(l.unitPrice * l.quantity).toFixed(2)}`);
  return [
    "Hola, quisiera realizar este pedido:",
    ...rows,
    `Subtotal: S/ ${totals.subtotal.toFixed(2)} | IGV: S/ ${totals.igv.toFixed(2)} | Total: S/ ${totals.total.toFixed(2)}`,
    `Cliente: ${customer.name} - Tel: ${customer.phone}`,
    `Entrega/visita: ${customer.address}`,
    customer.notes ? `Notas: ${customer.notes}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}
