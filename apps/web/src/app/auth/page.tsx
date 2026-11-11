import type { Metadata } from "next";
import { LoginScreen } from "@/screens/Auth/LoginScreen";
import { PageTransition } from "@/shared/components/motion/PageTransition";

export const metadata: Metadata = {
  title: "Acceso de Clientes",
  description:
    "Inicia sesión o regístrate en el portal de clientes de Glass & Aluminum Company S.A.C.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AuthPage() {
  return (
    <PageTransition>
      <LoginScreen />
    </PageTransition>
  );
}
