import type { Metadata } from "next";
import { CheckoutScreen } from "@/screens/Tienda/CheckoutScreen";
import { buildPageMetadata } from "@/shared/utils/seo-utils";
import ComponentErrorBoundary from "@/shared/components/ComponentErrorBoundary";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "Checkout de la Tienda",
    description: "Confirma tu pedido de vidrio y aluminio y envíalo por WhatsApp.",
    path: "/tienda/checkout",
  }),
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <ComponentErrorBoundary>
      <CheckoutScreen />
    </ComponentErrorBoundary>
  );
}
