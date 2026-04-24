import { Metadata } from "next";
import { HomeView } from "@/views/home";

export const metadata: Metadata = {
    title: "GYA Glass & Aluminum | Innovación en Cerramientos de Vidrio",
    description: "Líderes en diseño e instalación de soluciones premium en vidrio y aluminio. Ventanas, mamparas y estructuras a medida en La Molina, Lima.",
    alternates: {
        canonical: "https://www.gyacompany.com",
    },
};

export default function Page() {
    return <HomeView />;
}
