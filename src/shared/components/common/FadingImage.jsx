import React from "react";
import { Box } from "@chakra-ui/react";
import PropTypes from "prop-types";
import ImageWithFallback from "@shared/components/Image/ImageWithFallback";

/**
 * @component FadingImage
 * @description Componente compuesto que combina ImageWithFallback e ImageOverlay
 * Muestra una imagen con efecto de carga y overlay interactivo opcional
 * @param {Object} props - Props del componente
 * @param {string} props.src - URL de la imagen
 * @param {string} props.placeholderImageUrl - URL de fallback
 * @param {Function} props.onImageError - Callback de error
 * @param {string} props.w - Ancho
 * @param {string} props.h - Altura
 * @param {Function} props.onLoad - Callback de carga
 * @param {string} props.srcSet - srcSet responsivo
 * @param {string} props.sizes - sizes responsivo
 */
const FadingImage = React.memo((props) => {
  const {
    src,
    placeholderImageUrl,
    onImageError,
    w,
    h,
    onLoad,
    srcSet,
    sizes,
    forceShow,
    showOverlay: _showOverlay,
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
        srcSet={srcSet}
        sizes={sizes}
        forceShow={forceShow}
        {...restProps}
      />
    </Box>
  );
});

FadingImage.displayName = "FadingImage";

FadingImage.propTypes = {
  src: PropTypes.string.isRequired,
  placeholderImageUrl: PropTypes.string,
  onImageError: PropTypes.func,
  w: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]),
  h: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]),
  onLoad: PropTypes.func,
  srcSet: PropTypes.string,
  sizes: PropTypes.string,
  forceShow: PropTypes.bool,
};

export default FadingImage;
