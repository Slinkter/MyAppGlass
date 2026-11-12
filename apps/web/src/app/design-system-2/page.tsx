import type { Metadata } from "next";
import DesignSystem2View from "@/screens/DesignSystem2/DesignSystem2View";

export const metadata: Metadata = {
  title: "Design System 2 — Propuesta Editorial | Glass & Aluminum",
  robots: { index: false, follow: false },
};

export default function DesignSystem2Page() {
  return <DesignSystem2View />;
}
