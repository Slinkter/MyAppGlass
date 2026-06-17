import { Metadata } from "next";
import { BlogView } from "@/screens/blog";

export const metadata: Metadata = {
  title: "Blog de Vidriería y Aluminio | Glass & Aluminum Company S.A.C.",
  description: "Guías y consejos sobre vidrio templado, ventanas antirruido, perfiles de aluminio y tendencias en arquitectura moderna. Expertos en cerramientos en Lima.",
  alternates: {
    canonical: "https://www.gyacompany.com/blog",
  },
  openGraph: {
    title: "Blog de Vidriería y Aluminio | Glass & Aluminum Company S.A.C.",
    description: "Guías y consejos sobre vidrio templado, ventanas antirruido, perfiles de aluminio y tendencias en arquitectura moderna.",
    type: "website",
  }
};

import ComponentErrorBoundary from "@/shared/components/ComponentErrorBoundary";

export default function BlogPage() {
  return (
    <ComponentErrorBoundary>
      <BlogView />
    </ComponentErrorBoundary>
  );
}
