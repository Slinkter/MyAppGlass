/**
 * @file ServicesImmersiveFilter.tsx
 * @description Aura "Immersive Filter" - Refactored with SegmentedControl from Chakra v3.
 */
import React, { useState, useMemo } from "react";
import { Box, HStack } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import ItemGridLayout from "@shared/components/Layout/ItemGridLayout";
import ServiceCard from "../components/ServiceCard";
import { getServices } from "../services/serviceService";
import { SegmentedControl } from "@/components/ui/segmented-control";

const MotionItem = motion.create(ItemGridLayout.Item);
const CATEGORIES: string[] = ["Todos", "Vidrio", "Aluminio", "Cerramientos"];

/**
 * @description Immersive filter layout for services
 */
export const ServicesImmersiveFilter: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("Todos");
  const services = useMemo(() => getServices(), []);

  const filtered = useMemo(() => {
    if (activeCategory === "Todos") return services;
    return services.filter(s => s.category === activeCategory);
  }, [activeCategory, services]);

  return (
    <Box py={10}>
      <HStack justify="center" mb={12} gap={4} position="sticky" top="100px" zIndex={10}>
        <Box 
          variant="glass" 
          p={1} 
          bg="rgba(255,255,255,0.6)" 
          _dark={{ bg: "rgba(0,0,0,0.6)" }} 
          backdropFilter="blur(15px)" 
          borderRadius="full" 
          shadow="xl"
        >
          <SegmentedControl
            value={activeCategory}
            onValueChange={(e: { value: string }) => setActiveCategory(e.value)}
            items={CATEGORIES}
            variant="subtle"
            size="sm"
            colorPalette="primary"
          />
        </Box>
      </HStack>

      <ItemGridLayout columns={{ base: 1, sm: 2, md: 3 }} gap="phi_lg">
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
