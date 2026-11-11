import type { Metadata } from "next";
import { ShopScreen } from "@/screens/Tienda/ShopScreen";
import { buildPageMetadata } from "@/shared/utils/seo-utils";
import ComponentErrorBoundary from "@/shared/components/ComponentErrorBoundary";
import { PageTransition } from "@/shared/components/motion/PageTransition";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "Tienda de Vidrio y Aluminio en Lima",
    description:
      "Compra vidrio templado, perfiles de aluminio y accesorios para ventanas y mamparas. Pedido por WhatsApp en La Molina y Lima.",
    path: "/tienda",
    keywords: ["tienda vidrio y aluminio lima", "comprar vidrio templado", "perfiles de aluminio serie 25"],
  }),
  robots: { index: false, follow: false },
};

export default function TiendaPage() {
  return (
    <PageTransition>
      <ComponentErrorBoundary>
        <ShopScreen />
      </ComponentErrorBoundary>
    </PageTransition>
  );
}
