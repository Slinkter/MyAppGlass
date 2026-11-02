"use client";

import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { ListFilter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NativeSelectField, NativeSelectRoot } from "@/components/ui/native-select";
import { FilterPill } from "@/shared/components/ui/FilterPill";
import { TOUCH_MIN } from "@/shared/constants/layout";

export type SortMode = "recent" | "near";

interface FilterBarProps {
  years: number[];
  districts: string[];
  year: number | null;
  district: string | null;
  sort: SortMode;
  shown: number;
  total: number;
  hasFilters: boolean;
  onYear: (year: number | null) => void;
  onDistrict: (district: string | null) => void;
  onSort: (sort: SortMode) => void;
  onClear: () => void;
}

const selectField = {
  minH: TOUCH_MIN,
  fontSize: "sm",
  color: "text.heading",
  _focusVisible: { outline: "2px solid", outlineColor: "primary.500", outlineOffset: "2px" },
} as const;

/** Barra de filtros: chips de año (scroll horizontal en móvil), distrito, orden y contador vivo. */
export const FilterBar: React.FC<FilterBarProps> = ({
  years, districts, year, district, sort, shown, total, hasFilters, onYear, onDistrict, onSort, onClear,
}) => (
  <Box role="search" aria-label="Filtros de obras" p={{ base: "3", md: "4" }} borderBottom="1px solid" borderColor="border.default">
    <Flex
      role="group"
      aria-label="Filtrar por año"
      gap="2"
      align="center"
      overflowX={{ base: "auto", md: "visible" }}
      flexWrap={{ base: "nowrap", md: "wrap" }}
      pb="1"
      mt="-2"
    >
      <Box flexShrink={0}><FilterPill label="Todos" isActive={year === null} onClick={() => onYear(null)} /></Box>
      {years.map((y) => (
        <Box key={y} flexShrink={0}>
          <FilterPill label={String(y)} isActive={year === y} onClick={() => onYear(y)} />
        </Box>
      ))}
    </Flex>

    <Flex mt="3" gap="3" direction={{ base: "column", sm: "row" }} align={{ base: "stretch", sm: "center" }} wrap="wrap">
      <NativeSelectRoot flex="1" minW={{ base: 0, sm: "180px" }} size="md">
        <NativeSelectField
          aria-label="Filtrar por distrito"
          value={district ?? ""}
          onChange={(e) => onDistrict(e.target.value || null)}
          {...selectField}
        >
          <option value="">Todos los distritos</option>
          {districts.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </NativeSelectField>
      </NativeSelectRoot>
      <NativeSelectRoot flex="1" minW={{ base: 0, sm: "180px" }} size="md">
        <NativeSelectField
          aria-label="Ordenar obras"
          value={sort}
          onChange={(e) => onSort(e.target.value as SortMode)}
          {...selectField}
        >
          <option value="recent">Más recientes</option>
          <option value="near">Más cercanas a la sede</option>
        </NativeSelectField>
      </NativeSelectRoot>
    </Flex>

    <Flex mt="3" justify="space-between" align="center" gap="3" minW={0}>
      <Flex gap="2" align="center" minW={0} color="text.muted">
        <ListFilter size={16} style={{ flexShrink: 0 }} aria-hidden="true" />
        <Text fontSize="sm" aria-live="polite" role="status">
          Mostrando {shown} de {total} obras
        </Text>
      </Flex>
      {hasFilters && (
        <Button variant="ghost" size="sm" minH={TOUCH_MIN} onClick={onClear} aria-label="Limpiar filtros">
          <X size={16} style={{ flexShrink: 0 }} aria-hidden="true" />
          Limpiar filtros
        </Button>
      )}
    </Flex>
  </Box>
);
