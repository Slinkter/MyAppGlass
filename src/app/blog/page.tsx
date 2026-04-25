import { Metadata } from "next";
import { BlogView } from "@/views/blog";

export const metadata: Metadata = {
  title: "Blog de Expertos en Vidriería y Aluminio | GYA Glass & Aluminum",
  description: "Aprende todo sobre vidrio templado, perfiles de aluminio y tendencias en arquitectura moderna con nuestros expertos.",
  alternates: {
    canonical: "https://www.gyacompany.com/blog",
  },
  openGraph: {
    title: "Blog de Expertos en Vidriería y Aluminio",
    description: "Aprende todo sobre vidrio templado, perfiles de aluminio y tendencias en arquitectura moderna.",
    type: "website",
  }
};

export default function BlogPage() {
  return <BlogView />;
}
