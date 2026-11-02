"use client";

import React from "react";
import { HStack, chakra } from "@chakra-ui/react";
import { TOUCH_MIN } from "@/shared/constants/layout";
import type { YearGroup } from "./TimelineYearGroup";

interface TimelineYearChipsProps {
  groups: YearGroup[];
  onJump: (key: string) => void;
}

/** Chips de salto rápido por año, con scroll horizontal. */
export const TimelineYearChips: React.FC<TimelineYearChipsProps> = ({ groups, onJump }) => (
  <HStack as="nav" aria-label="Saltar a un año" gap="2" overflowX="auto" pb="1" overscrollBehaviorX="contain">
    {groups.map((group) => (
      <chakra.button
        key={group.key}
        type="button"
        flexShrink={0}
        whiteSpace="nowrap"
        minH={TOUCH_MIN}
        minW={TOUCH_MIN}
        px="4"
        fontSize="sm"
        fontWeight="700"
        color="text.heading"
        bg="bg.surface"
        borderWidth="1px"
        borderColor="border.default"
        borderRadius="full"
        cursor="pointer"
        transition="border-color 0.2s ease, background-color 0.2s ease"
        _motionReduce={{ transition: "none" }}
        _hover={{ borderColor: "primary.500", bg: "bg.subtle" }}
        _focusVisible={{ outline: "2px solid", outlineColor: "primary.500", outlineOffset: "2px" }}
        onClick={() => onJump(group.key)}
      >
        {group.label}
      </chakra.button>
    ))}
  </HStack>
);
