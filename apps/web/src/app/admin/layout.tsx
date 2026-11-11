import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AdminRouteGuard } from "@/features/auth/components/AdminRouteGuard";

export const metadata: Metadata = {
  title: "Panel de Administración",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function AdminRootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <AdminRouteGuard>{children}</AdminRouteGuard>;
}
