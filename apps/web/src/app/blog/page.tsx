import { SITE_URL } from "@/shared/config/company-data";
import { Metadata } from "next";
import { BlogView } from "@/screens/Blog";
import ComponentErrorBoundary from "@/shared/components/ComponentErrorBoundary";
import { buildPageMetadata, getBreadcrumbJsonLd, serializeJsonLd } from "@/shared/utils/seo-utils";
import { PageTransition } from "@/shared/components/motion/PageTransition";
import { getBuildBlogPosts } from "@/shared/api/firebase/publicRest";
import type { BlogPost } from "@/shared/api/firebase/types";
import BLOG_POSTS from "@/features/blog/data/blog-posts";

export const metadata: Metadata = buildPageMetadata({
  title: "Blog Técnico de Vidriería, Aluminio y Aislamiento Acústico",
  description:
    "Artículos técnicos y guías sobre ventanas de aluminio, atenuación acústica, vidrio templado, laminado y carpintería de aluminio en Lima por especialistas de GYA Company.",
  path: "/blog",
});

export default async function BlogPage() {
  const remotePosts = await getBuildBlogPosts();
  const posts: BlogPost[] =
    remotePosts.length > 0
      ? remotePosts
      : BLOG_POSTS.map((post) => ({ ...post, published: true }));

  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: "Inicio", url: SITE_URL },
    { name: "Blog Técnico", url: `${SITE_URL}/blog` },
  ]);

  return (
    <PageTransition>
      <ComponentErrorBoundary>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }}
        />
        <BlogView posts={posts} />
      </ComponentErrorBoundary>
    </PageTransition>
  );
}
