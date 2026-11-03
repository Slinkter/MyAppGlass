import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Detalle de Servicio",
  robots: {
    index: false,
    follow: true,
  },
};

export default function ServicioVerLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
