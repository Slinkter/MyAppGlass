"use client";

import React from "react";
import { HStack } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
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
      <Button
        key={group.key}
        type="button"
        variant="outline"
        size="sm"
        flexShrink={0}
        whiteSpace="nowrap"
        minH={TOUCH_MIN}
        minW={TOUCH_MIN}
        onClick={() => onJump(group.key)}
      >
        {group.label}
      </Button>
    ))}
  </HStack>
);
