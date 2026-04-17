/**
 * @file ResponsiveImage.tsx
 * @description Responsive image component with automatic srcset generation for mobile optimization.
 * @module shared/components
 * @remarks
 * Automatically generates srcset for 480w, 768w, 1200w, 1920w breakpoints.
 * Use isLCP prop for above-the-fold images to enable eager loading and high fetch priority.
 */

import React, { useCallback, useMemo } from "react";
import { Image, ImageProps } from "@chakra-ui/react";

const BREAKPOINTS = [480, 768, 1200, 1920];

interface ResponsiveImageProps extends Omit<ImageProps, 'onLoad'> {
  src?: string;
  alt?: string;
  isLCP?: boolean;
  onLoad?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

/**
 * @component ResponsiveImage
 * @description Componente de imagen responsive con srcset automatico
 */
const ResponsiveImage: React.FC<ResponsiveImageProps> = React.memo(
  ({
    src,
    alt,
    sizes,
    isLCP = false,
    onLoad,
    ...restProps
  }) => {
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
        // @ts-expect-error - fetchpriority is a valid HTML attribute for images but might not be in the current React types
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
