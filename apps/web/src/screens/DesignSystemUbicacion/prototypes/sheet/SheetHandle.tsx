"use client";

import React, { useRef } from "react";
import { Box, HStack, Text, chakra } from "@chakra-ui/react";
import { ChevronUp } from "lucide-react";
import { TOUCH_MIN } from "@/shared/constants/layout";
import { SHEET_LABEL, SHEET_POSITIONS, type SheetPosition } from "./sheetPositions";

interface SheetHandleProps {
  position: SheetPosition;
  controlsId: string;
  summary: string;
  onChange: (next: SheetPosition) => void;
  /** Arrastre: recibe el desplazamiento vertical acumulado (px, positivo = hacia abajo). */
  onDrag: (deltaY: number) => void;
  onDragEnd: (deltaY: number) => void;
}

const DRAG_THRESHOLD = 6;

/**
 * Asa de la hoja (`sheets.md › Resizable sheets`: el grabber se toca para ciclar detents y funciona con lector de pantalla).
 * Botón de ≥44px; Enter/Espacio alterna, flechas arriba/abajo cambian de posición, arrastre con pointer events.
 */
export const SheetHandle: React.FC<SheetHandleProps> = ({
  position,
  controlsId,
  summary,
  onChange,
  onDrag,
  onDragEnd,
}) => {
  const start = useRef<{ y: number; moved: boolean } | null>(null);
  const suppressClick = useRef(false);
  const index = SHEET_POSITIONS.indexOf(position);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp" && index < SHEET_POSITIONS.length - 1) {
      e.preventDefault();
      onChange(SHEET_POSITIONS[index + 1]);
    } else if (e.key === "ArrowDown" && index > 0) {
      e.preventDefault();
      onChange(SHEET_POSITIONS[index - 1]);
    }
  };

  // Enter/Espacio (y toque) alternan: mínima → media → completa → mínima.
  const handleClick = () => {
    if (suppressClick.current) {
      suppressClick.current = false;
      return;
    }
    onChange(SHEET_POSITIONS[(index + 1) % SHEET_POSITIONS.length]);
  };

  return (
    <chakra.button
      type="button"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onPointerDown={(e: React.PointerEvent<HTMLButtonElement>) => {
        start.current = { y: e.clientY, moved: false };
        e.currentTarget.setPointerCapture(e.pointerId);
      }}
      onPointerMove={(e: React.PointerEvent<HTMLButtonElement>) => {
        const s = start.current;
        if (!s) return;
        const dy = e.clientY - s.y;
        if (!s.moved && Math.abs(dy) < DRAG_THRESHOLD) return;
        s.moved = true;
        onDrag(dy);
      }}
      onPointerUp={(e: React.PointerEvent<HTMLButtonElement>) => {
        const s = start.current;
        start.current = null;
        if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
        if (s?.moved) {
          suppressClick.current = true;
          onDragEnd(e.clientY - s.y);
        }
      }}
      onPointerCancel={() => {
        if (start.current?.moved) onDragEnd(0);
        start.current = null;
      }}
      aria-controls={controlsId}
      aria-label={`Cambiar tamaño de la hoja. Posición ${SHEET_LABEL[position]}. Usa flechas arriba y abajo.`}
      display={{ base: "flex", md: "none" }}
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap="1"
      w="full"
      minH={TOUCH_MIN}
      pt="2"
      pb="1"
      flexShrink={0}
      cursor="grab"
      touchAction="none"
      userSelect="none"
      borderTopRadius="2xl"
      _active={{ cursor: "grabbing" }}
      _focusVisible={{ outline: "2px solid", outlineColor: "primary.500", outlineOffset: "-2px" }}
    >
      <Box w="10" h="1" borderRadius="full" bg="border.default" aria-hidden="true" />
      <HStack gap="1.5" color="text.muted">
        <ChevronUp
          size={14}
          aria-hidden="true"
          style={{
            flexShrink: 0,
            transform: position === "full" ? "rotate(180deg)" : undefined,
          }}
        />
        <Text fontSize="xs" fontWeight="600">
          {summary}
        </Text>
      </HStack>
    </chakra.button>
  );
};
