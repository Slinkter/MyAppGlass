import type { Metadata } from "next";
import { LoginScreen } from "@/screens/Auth/LoginScreen";
import { AccountRouteGuard } from "@/features/auth/components/AccountRouteGuard";

export const metadata: Metadata = {
  title: "Mi Cuenta",
  robots: { index: false, follow: false },
};

export default function MiCuentaPage() {
  return (
    <AccountRouteGuard>
      <LoginScreen />
    </AccountRouteGuard>
  );
}
