"use client";

import React, { useCallback, useMemo } from "react";
import { Image, ImageProps } from "@chakra-ui/react";

const BREAKPOINTS = [480, 768, 1200, 1920];

export interface ResponsiveImageProps extends ImageProps {
  src: string;
  alt: string;
  sizes?: string;
  isLCP?: boolean;
}

const ResponsiveImage = React.memo(
  ({
    src,
    alt,
    sizes,
    isLCP = false,
    onLoad,
    ...restProps
  }: ResponsiveImageProps) => {
    const srcset = useMemo(() => {
      if (!src) return undefined;
      return BREAKPOINTS.map((w) => `${src} ${w}w`).join(", ");
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
        src={src}
        alt={alt}
        srcSet={srcset}
        sizes={sizes}
        loading={loading}
        // @ts-ignore
        fetchpriority={fetchPriority}
        decoding="async"
        onLoad={handleLoad}
        {...restProps}
      />
    );
  }
);

ResponsiveImage.displayName = "ResponsiveImage";

export default ResponsiveImage;
