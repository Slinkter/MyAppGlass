import type { Metadata } from "next";
import { ErrorView } from "@/screens/Error";

export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return <ErrorView />;
}
