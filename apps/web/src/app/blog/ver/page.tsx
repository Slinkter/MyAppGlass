import { Suspense } from "react";
import type { Metadata } from "next";
import { BlogPostClientView, BlogPostSkeleton } from "@/screens/Blog";
import ComponentErrorBoundary from "@/shared/components/ComponentErrorBoundary";
import { PageTransition } from "@/shared/components/motion/PageTransition";

export const metadata: Metadata = {
  title: "Artículo | Blog Técnico GYA",
  robots: { index: false, follow: true },
};

/**
 * Detalle cliente para artículos publicados después del build estático:
 * con `output: 'export'` solo se prerenderizan los slugs presentes en build,
 * así que los nuevos se resuelven en runtime vía `/blog/ver?slug=<slug>`.
 */
export default function BlogVerPage() {
  return (
    <PageTransition>
      <ComponentErrorBoundary>
        <Suspense fallback={<BlogPostSkeleton />}>
          <BlogPostClientView />
        </Suspense>
      </ComponentErrorBoundary>
    </PageTransition>
  );
}
