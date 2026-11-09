import { Box } from "@chakra-ui/react";

const SkipLink = () => (
  <Box
    asChild
    position="absolute"
    top="-96"
    left="-96"
    w="1px"
    h="1px"
    overflow="hidden"
    _focusVisible={{
      position: "fixed",
      top: "2",
      left: "2",
      w: "auto",
      h: "auto",
      minH: "11",
      display: "inline-flex",
      alignItems: "center",
      px: "4",
      py: "2",
      borderWidth: "2px",
      borderStyle: "solid",
      borderColor: "ring.primary",
      borderRadius: "md",
      bg: "surface.card",
      color: "text.heading",
      fontWeight: "600",
      zIndex: "max",
      outline: "2px solid",
      outlineColor: "ring.primary",
      outlineOffset: "2px",
    }}
  >
    <a href="#main-content" className="skip-link" data-nosnippet>
      Saltar al contenido principal
    </a>
  </Box>
);

export default SkipLink;
