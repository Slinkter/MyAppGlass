import React from "react";
import {
  Box,
  HStack,
  Input,
  Button,
} from "@chakra-ui/react";
import { Search } from "lucide-react";

interface SearchFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
}

const categories = ["todos", "vidrio", "aluminio", "accesorio", "consumible", "servicio"];

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <Box
      p="4"
      borderRadius="2xl"
      bg="surface.card"
      border="1px solid"
      borderColor="border.default"
      backdropFilter="blur(16px)"
      mb="6"
    >
      <HStack wrap="wrap" justify="space-between" gap="4">
        <HStack flex="1" minW="260px" gap="2">
          <Box color="text.muted" pl="2">
            <Search size={18} />
          </Box>
          <Input
            placeholder="Buscar por SKU, nombre del producto o especificación..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            variant="subtle"
            size="md"
            borderRadius="xl"
          />
        </HStack>

        <HStack gap="1.5" wrap="wrap">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <Button
                key={cat}
                size="xs"
                borderRadius="lg"
                variant={isSelected ? "solid" : "ghost"}
                colorPalette={isSelected ? "cyan" : "gray"}
                onClick={() => onCategoryChange(cat)}
                textTransform="capitalize"
                fontWeight={isSelected ? "bold" : "medium"}
              >
                {cat}
              </Button>
            );
          })}
        </HStack>
      </HStack>
    </Box>
  );
};
