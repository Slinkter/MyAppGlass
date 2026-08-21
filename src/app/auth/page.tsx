import type { Metadata } from "next";
import { LoginScreen } from "@/screens/Auth/LoginScreen";

export const metadata: Metadata = {
  title: "Iniciar Sesión & Registro de Clientes | Glass & Aluminum Company S.A.C.",
  description:
    "Accede al portal transaccional de Glass & Aluminum Company S.A.C. para gestionar pedidos, cotizaciones y perfiles de cliente.",
};

export default function AuthPage() {
  return <LoginScreen />;
}
