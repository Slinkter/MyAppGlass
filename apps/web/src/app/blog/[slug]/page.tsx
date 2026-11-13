import { SITE_URL } from "@/shared/config/company-data";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { findPostBySlug } from "@/features/blog/services/blogService";
import { getBuildBlogPosts } from "@/shared/api/firebase/publicRest";
import type { BlogPost } from "@/shared/api/firebase/types";
import BLOG_POSTS from "@/features/blog/data/blog-posts";
import BlogPostView from "@/screens/Blog/ui/BlogPostView";
import {
  buildPageMetadata,
  getBlogPostJsonLd,
  getSectionBreadcrumbJsonLd,
  serializeJsonLd,
} from "@/shared/utils/seo-utils";
import ComponentErrorBoundary from "@/shared/components/ComponentErrorBoundary";
import { PageTransition } from "@/shared/components/motion/PageTransition";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getBuildOrSeedPosts(): Promise<BlogPost[]> {
  const remotePosts = await getBuildBlogPosts();
  if (remotePosts.length > 0) return remotePosts;
  return BLOG_POSTS.map((post) => ({ ...post, published: true }));
}

export async function generateStaticParams() {
  const posts = await getBuildOrSeedPosts();
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
  const posts = await getBuildOrSeedPosts();
  const post = findPostBySlug(posts, slug);
  return { slug, post };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, post } = await resolvePostData(params);

  if (!post) {
    return {
      title: "Artículo no encontrado",
      robots: { index: false, follow: true },
    };
  }

  return buildPageMetadata({
    title: post.title,
    description: post.description || post.excerpt,
    path: `/blog/${slug}`,
    image: post.image,
    type: "article",
    publishedTime: post.date,
    tags: post.tags,
  });
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
    <PageTransition>
      <ComponentErrorBoundary>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }}
        />
        <BlogPostView post={post} />
      </ComponentErrorBoundary>
    </PageTransition>
  );
}
