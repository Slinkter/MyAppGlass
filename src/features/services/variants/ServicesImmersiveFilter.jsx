/**
 * @file ServicesImmersiveFilter.jsx
 * @description Option 1: Aura "Immersive Filter" - Liquid transitions and floating glass pills.
 * Focuses on fluid movement and modern interactivity.
 */
import React, { useState, useMemo } from "react";
import { Box, HStack, Button } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import ItemGridLayout from "@shared/components/Layout/ItemGridLayout";
import ServiceCard from "../components/ServiceCard";
import { services } from "../data/services";

const MotionItem = motion(ItemGridLayout.Item);
const CATEGORIES = ["Todos", "Vidrio", "Aluminio", "Cerramientos"];

export const ServicesImmersiveFilter = () => {
  const [activeCategory, setActiveCategory] = useState("Todos");

  const filtered = useMemo(() => {
    if (activeCategory === "Todos") return services;
    return services.filter(s => s.category === activeCategory);
  }, [activeCategory]);

  return (
    <Box py={10}>
      <HStack justify="center" mb={12} spacing={4} position="sticky" top="100px" zIndex={10}>
        <Box variant="glass" p={2} bg="rgba(255,255,255,0.6)" _dark={{ bg: "rgba(0,0,0,0.6)" }} backdropFilter="blur(15px)" borderRadius="full" shadow="xl">
          <HStack spacing={1}>
            {CATEGORIES.map(cat => (
              <Button
                key={cat}
                variant="ghost"
                size="sm"
                borderRadius="full"
                px={6}
                bg={activeCategory === cat ? "primary.900" : "transparent"}
                color={activeCategory === cat ? "white" : "text.body"}
                _dark={{ 
                  bg: activeCategory === cat ? "primary.100" : "transparent",
                  color: activeCategory === cat ? "primary.900" : "white" 
                }}
                _hover={{ bg: activeCategory === cat ? "primary.800" : "blackAlpha.100" }}
                onClick={() => setActiveCategory(cat)}
                transition="all 0.3s ease"
              >
                {cat}
              </Button>
            ))}
          </HStack>
        </Box>
      </HStack>

      <ItemGridLayout columns={{ base: 1, sm: 2, md: 3 }} spacing="phi_lg">
        <AnimatePresence mode="popLayout">
          {filtered.map((service, index) => (
            <MotionItem
              key={service.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: "circOut" }}
            >
              <ServiceCard {...service} index={index} />
            </MotionItem>
          ))}
        </AnimatePresence>
      </ItemGridLayout>
    </Box>
  );
};
