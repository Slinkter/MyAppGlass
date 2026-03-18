/**
 * @file ResponsiveImage.jsx
 * @description Responsive image component with automatic srcset generation for mobile optimization.
 * @module shared/components
 * @remarks
 * Automatically generates srcset for 480w, 768w, 1200w, 1920w breakpoints.
 * Use isLCP prop for above-the-fold images to enable eager loading and high fetch priority.
 */

import React, { useCallback, useMemo } from "react";
import { Image } from "@chakra-ui/react";

const BREAKPOINTS = [480, 768, 1200, 1920];

/**
 * @component ResponsiveImage
 * @description Componente de imagen responsive con srcset automatico
 * @param {Object} props - Props del componente
 * @param {string} props.src - URL base de la imagen
 * @param {string} props.alt - Texto alternativo de la imagen
 * @param {string} [props.sizes] - Sizes attribute para responsive
 * @param {boolean} [props.isLCP=false] - True si es imagen LCP (carga eager, alta prioridad)
 * @param {Function} [props.onLoad] - Callback al cargar la imagen
 * @param {Object} props.restProps - Otros props para Chakra Image
 */
const ResponsiveImage = React.memo(
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
      (e) => {
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
