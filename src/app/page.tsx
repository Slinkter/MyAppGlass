import { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "GYA Glass & Aluminum | Vidriería y Aluminio Premium en La Molina",
  description: "Especialistas en la instalación de cristales templados, mamparas, ventanas, barandas y techos. Calidad y diseño para tu hogar o empresa.",
  openGraph: {
      title: "GYA Glass & Aluminum | Vidriería y Aluminio Premium",
      description: "Instalación y fabricación de productos de vidriería y aluminio de alta calidad.",
      images: ['/og-image.jpg'],
  }
};

/**
 * @page Home
 * @description Entry point for the Home page. Handled by a Client Component for interactivity.
 */
export default function Home() {
  return <HomeClient />;
}
