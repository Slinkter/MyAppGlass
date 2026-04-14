"use client";

import React, { useMemo, useState, useRef, useEffect } from "react";
import { Box, Button, HStack } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import ItemGridLayout from "@shared/components/Layout/ItemGridLayout";
import ServiceCard from "./ServiceCard";
import { services } from "../data/services";
import useIntersectionObserver from "@shared/hooks/observers/useIntersectionObserver";

const CATEGORIES = ["Todos", "Vidrio", "Aluminio", "Cerramientos"];

const ServiceList = React.memo(() => {
  const allServices = useMemo(() => services, []);
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [displayCount, setDisplayCount] = useState(6);
  const loaderRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const activeBg = useColorModeValue("primary.700", "primary.300");
  const activeColor = useColorModeValue("white", "primary.900");
  const inactiveBg = useColorModeValue("gray.100", "whiteAlpha.100");
  const inactiveColor = useColorModeValue("gray.700", "gray.300");
  const inactiveHoverBg = useColorModeValue("gray.200", "whiteAlpha.200");

  const filteredServices = useMemo(() => {
    if (activeCategory === "Todos") return allServices;
    return allServices.filter((s: any) => s.category === activeCategory);
  }, [allServices, activeCategory]);

  useEffect(() => {
    setDisplayCount(6);
  }, [activeCategory]);

  const rootMargin = typeof window !== "undefined" && window.innerWidth < 768 ? "200px" : "400px";

  useIntersectionObserver(
    loaderRef,
    () => {
      if (displayCount >= filteredServices.length) return;
      rafRef.current = requestAnimationFrame(() => {
        setDisplayCount((prev) => Math.min(prev + 6, filteredServices.length));
      });
    },
    { threshold: 0.01, rootMargin }
  );

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const preparedServices = useMemo(() => {
    return filteredServices.slice(0, displayCount).map((s: any) => ({ ...s, preloaded: true }));
  }, [filteredServices, displayCount]);

  return (
    <ItemGridLayout
      title="SERVICIOS"
      subtitle=""
      columns={{ base: 1, sm: 2, md: 3 }}
    >
      <Box gridColumn="1 / -1" w="full">
        <HStack gap={2} justify="center" flexWrap="wrap" pb={2}>
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <Button
                key={cat}
                size="sm"
                px={5}
                borderRadius="full"
                fontWeight="semibold"
                fontSize="xs"
                letterSpacing="wider"
                textTransform="uppercase"
                bg={isActive ? activeBg : inactiveBg}
                color={isActive ? activeColor : inactiveColor}
                _hover={{ bg: isActive ? activeBg : inactiveHoverBg }}
                transition="all 0.2s ease"
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </Button>
            );
          })}
        </HStack>
      </Box>

      {preparedServices.map((service: any, index: number) => (
        <ItemGridLayout.Item
          key={`${activeCategory}-${service.id}`}
          delay={(index % 6) * 0.08}
        >
          <ServiceCard
            image={service.image}
            name={service.name}
            description={service.description}
            plink={service.plink}
            isLCP={index < 3}
            loading={index < 3 ? "eager" : "lazy"}
          />
        </ItemGridLayout.Item>
      ))}

      {displayCount < filteredServices.length && (
        <Box ref={loaderRef} w="full" h="20px" py={10} />
      )}
    </ItemGridLayout>
  );
});

ServiceList.displayName = "ServiceList";
export default ServiceList;
