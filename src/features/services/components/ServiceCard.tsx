"use client";
import React from "react";
import {
  Box,
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
import { m } from "framer-motion";

const MotionLinkBox = m.create(LinkBox);

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
    <MotionLinkBox
      as="article"
      role="group"
      cursor="pointer"
      position="relative"
      h={{ base: "320px", md: "500px" }}
      borderRadius="xl"
      overflow="hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      _hover={{
        boxShadow: { md: "2xl" },
        transform: { base: "none", md: "translateY(-4px)" },
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      aria-label={`Ver detalles del servicio de ${name}`}
      whileTap={{ scale: 0.98 }}
    >
      <Skeleton loading={!isLoaded} h="full" w="full">
        <Box position="relative" h="full" w="full" overflow="hidden">
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
            p="phi_md"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="flex-end"
          >
            <Text
              color={isHovered ? "primary.300" : "white"}
              fontSize={{ base: "md", md: "xl" }}
              fontWeight="600"
              textTransform="uppercase"
              letterSpacing="wider"
              textAlign="center"
              position="relative"
              zIndex={1}
              transition="color 0.3s ease"
              _after={{
                content: '""',
                position: "absolute",
                bottom: "-8px",
                left: "50%",
                transform: "translateX(-50%)",
                width: isLoaded ? "40px" : "0",
                height: "2px",
                bg: isHovered ? "primary.300" : "white",
                transition: "width 0.4s ease, background 0.3s ease",
              }}
            >
              {isMobile ? (
                 name 
              ) : (
                <LinkOverlay as={RouterLink} {...({ href: plink } as Record<string, unknown>)}>
                  {name}
                </LinkOverlay>
              )}
            </Text>

            <VStack
              mt="phi_md"
              gap="phi_sm"
              opacity={isHovered ? 1 : (isMobile ? 1 : 0)}
              transform={isHovered ? "translateY(0)" : (isMobile ? "translateY(0)" : "translateY(10px)")}
              transition="all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
              w="full"
            >
              <Button
                as={RouterLink}
                href={plink}
                variant="outline"
                size="sm"
                color="white"
                borderColor="whiteAlpha.400"
                _hover={{ 
                  bg: "white", 
                  color: "primary.900",
                  borderColor: "white"
                }}
                textTransform="uppercase"
                fontSize="xs"
                letterSpacing="widest"
                px="phi_lg"
                borderRadius="full"
              >
                Ver Catálogo
              </Button>
            </VStack>
          </Box>
        </Box>
      </Skeleton>
      
      {isMobile && <LinkOverlay as={RouterLink} href={plink} aria-label={`Ver servicio ${name}`} />}
    </MotionLinkBox>
  );
});

ServiceCard.displayName = "ServiceCard";
export default ServiceCard;
