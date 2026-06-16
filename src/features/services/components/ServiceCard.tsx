import React from "react";
import {
  Box,
  Card,
  LinkBox,
  LinkOverlay,
  Text,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import ResponsiveImage from "@shared/components/Image/ResponsiveImage";
import RouterLink from "next/link";


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

const bgOverlay =
  "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)";

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

  const isMobile = useBreakpointValue({ base: true, md: false });

  const handleImageLoad = React.useCallback(() => {
    setIsLoaded(true);
    if (onLoadComplete) {
      onLoadComplete();
    }
  }, [onLoadComplete]);

  return (
    <Card.Root
      as={LinkBox}
      role="group"
      cursor="pointer"
      position="relative"
      minH={{ base: "auto", md: "320px" }}
      borderRadius="xl"
      overflow="hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      transform="translateZ(0)"
      transition="box-shadow 0.3s ease-out, transform 0.3s ease-out"
      _hover={{
        boxShadow: { md: "2xl" },
        transform: { base: "translateZ(0)", md: "translateY(-4px) translateZ(0)" },
      }}
      _active={{
        transform: { base: "translateZ(0)", md: "translateY(-4px) translateZ(0)" },
        boxShadow: { md: "2xl" },
      }}
      aria-label={`Ver detalles del servicio de ${name}`}
      borderWidth="0"
      bg="transparent"
      css={{
        '@media (prefers-reduced-motion: reduce)': {
          '*': { transition: 'none !important', animation: 'none !important', transform: 'none !important' }
        }
      }}
    >
      <Card.Body p="0" position="relative" w="full" h="full" minH={{ base: "auto", md: "320px" }} overflow="hidden" borderRadius="xl">
        <Skeleton loading={!isLoaded} h="full" w="full">
          <Box position="absolute" inset={0} overflow="hidden">
            <ResponsiveImage
              src={image}
              alt={`Servicio de ${name} - GYA Glass & Aluminum`}
              objectFit="cover"
              w="100%"
              h="100%"
              loading={loading}
              decoding="async"
              onLoad={handleImageLoad}
              isLCP={isLCP}
              transform={isHovered ? "scale(1.1) translate(-8px, -8px)" : "scale(1.02)"}
              transition="transform 0.7s ease-out"
            />

            <Box position="absolute" inset="0" bgGradient={bgOverlay} />

            <Box
              position="absolute"
              bottom={0}
              left={0}
              right={0}
              p="6"
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="flex-end"
            >
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
                {isMobile ? (
                  name 
                ) : (
                  <LinkOverlay asChild>
                    <RouterLink href={plink}>
                      {name}
                    </RouterLink>
                  </LinkOverlay>
                )}
              </Text>

              <VStack
                mt="6"
                gap="4"
                opacity={isHovered ? 1 : (isMobile ? 1 : 0)}
                transform={isHovered ? "translateY(0)" : (isMobile ? "translateY(0)" : "translateY(10px)")}
                transition="opacity 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
                w="full"
              >
                <Button
                  asChild
                  variant="outline"
                  size="sm"
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
                  <RouterLink href={plink}>
                    Ver Catálogo
                  </RouterLink>
                </Button>
              </VStack>
            </Box>
          </Box>
        </Skeleton>
        
        {isMobile && (
          <LinkOverlay asChild>
            <RouterLink href={plink} aria-label={`Ver servicio ${name}`} />
          </LinkOverlay>
        )}
      </Card.Body>
    </Card.Root>
  );
});

ServiceCard.displayName = "ServiceCard";
export default ServiceCard;
