import React from "react";
import { Box } from "@chakra-ui/react";
import PropTypes from "prop-types";
import ImageWithFallback from "@shared/components/Image/ImageWithFallback";
import ImageOverlay from "@shared/components/Image/ImageOverlay";

/**
 * @component FadingImage
 * @description Componente compuesto que combina ImageWithFallback e ImageOverlay
 * Muestra una imagen con efecto de carga y overlay interactivo opcional
 * @param {Object} props - Props del componente
 * @param {string} props.name - Título para el overlay
 * @param {string} props.plink - Path del link en overlay
 * @param {string} props.src - URL de la imagen
 * @param {string} props.placeholderImageUrl - URL de fallback
 * @param {Function} props.onImageError - Callback de error
 * @param {string} props.w - Ancho
 * @param {string} props.h - Altura
 * @param {boolean} props.showOverlay - Mostrar overlay
 * @param {Function} props.onLoad - Callback de carga
 * @param {string} props.srcset - srcset responsivo
 * @param {string} props.sizes - sizes responsivo
 */
const FadingImage = React.memo((props) => {
  const {
    name,
    plink,
    src,
    placeholderImageUrl,
    onImageError,
    w,
    h,
    showOverlay = true,
    onLoad,
    srcset,
    sizes,
    ...restProps
  } = props;

  return (
    <Box
      w={w}
      h={h}
      position="relative"
      overflow="hidden"
      rounded="md"
      role="group"
    >
      <ImageWithFallback
        src={src}
        fallbackSrc={placeholderImageUrl}
        onLoad={onLoad}
        onError={onImageError}
        w="100%"
        h="100%"
        srcset={srcset}
        sizes={sizes}
        {...restProps}
      />

      {showOverlay && <ImageOverlay name={name} plink={plink} />}
    </Box>
  );
});

FadingImage.displayName = "FadingImage";

FadingImage.propTypes = {
  name: PropTypes.string.isRequired,
  plink: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  placeholderImageUrl: PropTypes.string,
  onImageError: PropTypes.func,
  w: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  h: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  showOverlay: PropTypes.bool,
  onLoad: PropTypes.func,
  srcset: PropTypes.string,
  sizes: PropTypes.string,
};

export default FadingImage;
