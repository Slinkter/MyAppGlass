import type { Metadata } from "next";
import { ShopScreen } from "@/screens/Tienda/ShopScreen";
import { buildPageMetadata } from "@/shared/utils/seo-utils";
import ComponentErrorBoundary from "@/shared/components/ComponentErrorBoundary";

export const metadata: Metadata = buildPageMetadata({
  title: "Tienda de Vidrio y Aluminio en Lima",
  description:
    "Compra vidrio templado, perfiles de aluminio y accesorios para ventanas y mamparas. Pedido por WhatsApp en La Molina y Lima.",
  path: "/tienda",
  keywords: ["tienda vidrio y aluminio lima", "comprar vidrio templado", "perfiles de aluminio serie 25"],
});

export default function TiendaPage() {
  return (
    <ComponentErrorBoundary>
      <ShopScreen />
    </ComponentErrorBoundary>
  );
}
