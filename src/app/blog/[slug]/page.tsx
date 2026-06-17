import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, getPosts } from "@/features/blog/services/blogService";
import BlogPostView from "@/screens/blog/ui/BlogPostView";
import { getCompanyJsonLd } from "@/shared/utils/seo-utils";
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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  
  if (!post) return { title: "Post no encontrado" };

  return {
    title: `${post.title} | Blog GYA Glass`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
      type: "article",
      publishedTime: post.date,
      authors: ["GYA Glass & Aluminum"],
      tags: post.tags,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // JSON-LD para Google (Article)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "image": `https://www.gyacompany.com${post.image}`,
    "datePublished": post.date,
    "author": {
      "@type": "Organization",
      "name": "GYA Glass & Aluminum"
    },
    "description": post.excerpt,
    "publisher": getCompanyJsonLd()
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ComponentErrorBoundary>
        <BlogPostView post={post} />
      </ComponentErrorBoundary>
    </>
  );
}
