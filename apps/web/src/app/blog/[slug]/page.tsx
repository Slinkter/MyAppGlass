import { SITE_URL } from "@/shared/config/company-data";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, getPosts } from "@/features/blog/services/blogService";
import BlogPostView from "@/screens/Blog/ui/BlogPostView";
import { getBlogPostJsonLd, getSectionBreadcrumbJsonLd } from "@/shared/utils/seo-utils";
import ComponentErrorBoundary from "@/shared/components/ComponentErrorBoundary";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

/**
 * Shared data resolver for both generateMetadata and BlogPostPage.
 * Avoids duplicate slug resolution and post lookups per request.
 */
async function resolvePostData(params: Promise<{ slug: string }>) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  return { slug, post };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, post } = await resolvePostData(params);
  
  if (!post) return { title: "Artículo no encontrado | Blog GYA" };

  const canonicalUrl = `${SITE_URL}/blog/${slug}`;

  return {
    title: `${post.title} | Blog GYA Glass & Aluminum`,
    description: post.description || post.excerpt,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${post.title} | GYA Company`,
      description: post.excerpt,
      images: [post.image],
      url: canonicalUrl,
      type: "article",
      publishedTime: post.date,
      authors: ["Glass & Aluminum Company S.A.C."],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug, post } = await resolvePostData(params);

  if (!post) {
    notFound();
  }

  const postUrl = `${SITE_URL}/blog/${slug}`;

  const jsonLd = getBlogPostJsonLd(post, postUrl);
  const breadcrumbJsonLd = getSectionBreadcrumbJsonLd(
    { name: "Blog de Expertos", path: "/blog" },
    { name: post.title, url: postUrl }
  );

  return (
    <ComponentErrorBoundary>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <BlogPostView post={post} />
    </ComponentErrorBoundary>
  );
}
