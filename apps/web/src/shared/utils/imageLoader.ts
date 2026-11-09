/**
 * Custom Next.js Image loader for MyAppGlass.
 * Handles responsive variants for Firebase Storage covers and local client images.
 */
export default function gyaImageLoader({
  src,
  width,
}: {
  src: string;
  width: number;
  quality?: number;
}): string {
  if (!src || src.startsWith('data:') || src.endsWith('.svg')) {
    return src;
  }

  // Case 1: Firebase Storage covers
  if (src.includes('firebasestorage.googleapis.com') && src.includes('cover.webp')) {
    if (width <= 640) {
      return src.replace(/cover\.webp/, 'cover-480w.webp');
    }
    if (width <= 1080) {
      return src.replace(/cover\.webp/, 'cover-960w.webp');
    }
    return src;
  }

  // Case 2: Local client images matching /^\/images\/clients-[a-z]+\.webp$/
  const clientImageRegex = /^\/images\/clients-[a-z]+\.webp$/;
  if (clientImageRegex.test(src)) {
    if (width <= 640) {
      return src.replace(/\.webp$/, '-480w.webp');
    }
    if (width <= 1080) {
      return src.replace(/\.webp$/, '-960w.webp');
    }
    return src;
  }

  return src;
}
