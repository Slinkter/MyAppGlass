import type { Metadata } from "next";
import ImagenGeneratorScreen from "@/screens/ImagenGenerator/ImagenGeneratorScreen";

export const metadata: Metadata = {
  title: "Generador Visual (SVG vs Render IA) | Glass & Aluminum",
  robots: { index: false, follow: false },
};

export default function ImagenGeneratorPage() {
  return <ImagenGeneratorScreen />;
}
