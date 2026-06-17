import React from "react";
import {
  Box,
  LinkOverlay,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import RouterLink from "next/link";
import MediaCard from "@shared/components/common/MediaCard";


export interface ServiceCardProps {
  image: string;
  name: string;
  description?: string;
  plink: string;
  index?: number;
  onLoadComplete?: () => void;
  loading?: "lazy" | "eager";
  isLCP?: boolean;
}

/**
 * @component ServiceCard
 * @description Service card that adapts its clickable area for mobile vs. desktop.
 */
const ServiceCard: React.FC<ServiceCardProps> = React.memo(({
  image,
  name,
  plink,
  onLoadComplete,
  loading = "lazy",
  isLCP = false
}) => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);

  const isMobile = useBreakpointValue({ base: true, md: false }) ?? true;

  const handleImageLoad = React.useCallback(() => {
    setIsLoaded(true);
    onLoadComplete?.();
  }, [onLoadComplete]);

  const title = (
    <Text
      color={isHovered ? "primary.300" : "white"}
      _groupHover={{ color: "primary.300" }}
      _active={{ color: "primary.300" }}
      fontSize={{ base: "md", md: "xl" }}
      fontWeight="600"
      textTransform="uppercase"
      letterSpacing="wider"
      textAlign="center"
      position="relative"
      zIndex={1}
      transition="color 0.3s ease"
      lineClamp={1}
      _after={{
        content: '""',
        position: "absolute",
        bottom: "-2",
        left: "50%",
        transform: "translateX(-50%)",
        width: isLoaded ? "8" : "0",
        height: "2px",
        bg: isHovered ? "primary.300" : "white",
        transition: "width 0.4s ease, background 0.3s ease",
      }}
    >
      {isMobile ? name : (
        <LinkOverlay asChild>
          <RouterLink href={plink}>{name}</RouterLink>
        </LinkOverlay>
      )}
    </Text>
  );

  const cta = (
    <Button
      {...(isMobile ? { pointerEvents: "none" as const } : { asChild: true })}
      variant="outline"
      size="sm"
      bg="whiteAlpha.200"
      css={{ backdropFilter: "blur(10px)" }}
      color="white"
      borderColor="whiteAlpha.400"
      _hover={{ 
        bg: "white", 
        color: "primary.900",
        borderColor: "white",
        transform: "scale(1.05) translateY(-2px)",
        boxShadow: "0 0 20px rgba(255,255,255,0.2)"
      }}
      textTransform="uppercase"
      fontSize="xs"
      fontWeight="bold"
      letterSpacing="0.2em"
      px="8"
      borderRadius="full"
      transition="background-color 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), color 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), border-color 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
    >
      {isMobile ? "Ver Catálogo" : <RouterLink href={plink}>Ver Catálogo</RouterLink>}
      <Box as={ArrowRight} w={4} h={4} />
    </Button>
  );

  return (
    <Box aria-label={`Ver detalles del servicio de ${name}`}>
      <MediaCard
        image={image}
        alt={`Servicio de ${name} - GYA Glass & Aluminum`}
        isLoaded={isLoaded}
        isHovered={isHovered}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onImageLoad={handleImageLoad}
        loading={loading}
        isLCP={isLCP}
        title={title}
        ctaSection={cta}
      >
        {isMobile && (
          <LinkOverlay asChild>
            <RouterLink href={plink} aria-label={`Ver servicio ${name}`} />
          </LinkOverlay>
        )}
      </MediaCard>
    </Box>
  );
});

ServiceCard.displayName = "ServiceCard";
export default ServiceCard;
