"use client";

import React, { useCallback, useMemo } from "react";
import { Image, ImageProps } from "@chakra-ui/react";

interface StaticImageData {
  src: string;
  height: number;
  width: number;
  blurDataURL?: string;
}

export interface ResponsiveImageProps extends Omit<ImageProps, "src"> {
  src: string | StaticImageData | { default: StaticImageData };
  alt: string;
  sizes?: string;
  isLCP?: boolean;
}

const ResponsiveImage = React.memo(
  ({
    src,
    alt,
    isLCP = false,
    onLoad,
    ...restProps
  }: ResponsiveImageProps) => {
    
    const finalSrc = useMemo(() => {
      if (!src) return "";
      
      // Handle Next.js static imports (including ESM/CJS interop)
      if (typeof src === "string") return src;
      
      const s = src as any;
      if (s.src) return s.src;
      if (s.default && s.default.src) return s.default.src;
      
      // Fallback: If it's an object but not a standard Next image, 
      // check if it's the Vite-style string-in-default
      if (s.default && typeof s.default === "string") return s.default;

      return String(src);
    }, [src]);

    const loading = isLCP ? "eager" : "lazy";
    const fetchPriority = isLCP ? "high" : "auto";

    const handleLoad = useCallback(
      (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        if (onLoad) onLoad(e);
      },
      [onLoad]
    );

    return (
      <Image
        src={finalSrc}
        alt={alt}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding="async"
        onLoad={handleLoad}
        {...restProps}
      />
    );
  }
);

ResponsiveImage.displayName = "ResponsiveImage";

export default ResponsiveImage;
