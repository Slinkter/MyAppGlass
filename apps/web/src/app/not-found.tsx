import type { Metadata } from "next";
import ErrorView from "@/shared/components/ErrorView";

export const metadata: Metadata = {
  title: "Página no encontrada",
};

export default function NotFound() {
  return <ErrorView />;
}
