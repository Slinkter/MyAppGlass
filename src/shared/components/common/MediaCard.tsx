"use client";

import React, { useState, useCallback } from "react";
import {
  Box,
  LinkBox,
  LinkOverlay,
  Text,
  VStack,
  Heading,
  HStack,
} from "@chakra-ui/react";
import { Skeleton } from "@/components/ui/skeleton";
import ResponsiveImage from "@/shared/components/Image/ResponsiveImage";
import { m } from "framer-motion";

const MotionLinkBox = m.create(LinkBox);

export interface MediaCardProps {
  image: string;
  title: string;
  subtitle?: string;
  description?: string;
  link?: string;
  linkLabel?: string;
  onPress?: () => void;
  isLCP?: boolean;
  loading?: "lazy" | "eager";
  fetchPriority?: "auto" | "high" | "low";
  height?: Record<string, string> | string;
  variant?: "default" | "service" | "project" | "client";
}

const VARIANTS = {
  default: {
    bgOverlay: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)",
    titleColor: "white",
    hoverTitleColor: "text.accent",
  },
  service: {
    bgOverlay: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)",
    titleColor: "white",
    hoverTitleColor: "primary.300",
  },
  project: {
    bgOverlay: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)",
    titleColor: "white",
    hoverTitleColor: "text.accent",
  },
  client: {
    bgOverlay: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)",
    titleColor: "white",
    hoverTitleColor: "text.accent",
  },
};

const MediaCard: React.FC<MediaCardProps> = React.memo(({
  image,
  title,
  subtitle,
  description,
  link,
  linkLabel = "Ver más",
  onPress,
  isLCP = false,
  loading = "lazy",
  fetchPriority,
  height = { base: "320px", md: "500px" },
  variant = "default",
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleLoad = useCallback(() => setIsLoaded(true), []);

  const style = VARIANTS[variant];
  const titleColor = isHovered ? style.hoverTitleColor : style.titleColor;

  return (
    <MotionLinkBox
      as="article"
      role="group"
      cursor="pointer"
      position="relative"
      h={height}
      w="full"
      borderRadius="xl"
      overflow="hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      _hover={{
        boxShadow: { md: "glass" },
        transform: { base: "none", md: "translateY(-4px)" },
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileTap={{ scale: 0.98 }}
    >
      <Skeleton loading={!isLoaded} h="full" w="full">
        <Box position="relative" h="full" w="full" overflow="hidden">
          <ResponsiveImage
            src={image}
            alt={title}
            objectFit="cover"
            w="100%"
            h="100%"
            loading={isLCP ? "eager" : loading}
            decoding={isLCP ? "sync" : "async"}
            fetchPriority={fetchPriority}
            onLoad={handleLoad}
            transform={isHovered ? "scale(1.05)" : "scale(1.02)"}
            transition="transform 0.6s ease"
          />

          <Box position="absolute" inset="0" bgGradient={style.bgOverlay} />

          <Box
            position="absolute"
            bottom={0}
            left={0}
            right={0}
            p={6}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="flex-end"
          >
            <Heading
              as="h3"
              color={titleColor}
              fontSize={{ base: "md", md: "xl" }}
              fontWeight="600"
              textTransform="uppercase"
              letterSpacing="wider"
              textAlign="center"
              position="relative"
              transition="color 0.3s ease"
              lineClamp={1}
              _after={{
                content: '""',
                position: "absolute",
                bottom: "-8px",
                left: "50%",
                transform: "translateX(-50%)",
                width: isLoaded ? "40px" : "0",
                height: "2px",
                bg: titleColor,
                transition: "width 0.4s ease, background 0.3s ease",
              }}
            >
              {link && onPress ? (
                <LinkOverlay
                  as="button"
                  onClick={(e) => {
                    e.preventDefault();
                    onPress();
                  }}
                  aria-label={`Ver ${title}`}
                >
                  {title}
                </LinkOverlay>
              ) : link ? (
                <LinkOverlay as="a" href={link}>
                  {title}
                </LinkOverlay>
              ) : (
                title
              )}
            </Heading>

            {subtitle && (
              <HStack gap={3} mt={4}>
                <Text fontSize="xs" color="whiteAlpha.900" fontWeight="500">
                  {subtitle}
                </Text>
              </HStack>
            )}

            <VStack
              gap={4}
              w="full"
              mt={4}
              opacity={{ base: 1, md: isHovered ? 1 : 0 }}
              transform={{
                base: "translateY(0)",
                md: isHovered ? "translateY(0)" : "translateY(10px)",
              }}
              transition="all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
            >
              {description && (
                <Text fontSize="sm" color="whiteAlpha.800" lineClamp={2}>
                  {description}
                </Text>
              )}
              {link && onPress && (
                <Box
                  as="button"
                  onClick={onPress}
                  px={8}
                  py={2}
                  borderRadius="full"
                  bg="whiteAlpha.200"
                  color="white"
                  fontSize="xs"
                  fontWeight="bold"
                  textTransform="uppercase"
                  letterSpacing="0.1em"
                  _hover={{ bg: "whiteAlpha.400" }}
                  transition="all 0.3s ease"
                >
                  {linkLabel}
                </Box>
              )}
            </VStack>
          </Box>
        </Box>
      </Skeleton>
    </MotionLinkBox>
  );
});

MediaCard.displayName = "MediaCard";
export default MediaCard;