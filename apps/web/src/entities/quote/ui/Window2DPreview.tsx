"use client";

import React from "react";
import { Box, HStack, Text, chakra } from "@chakra-ui/react";
import type { WindowGlassColor, WindowProfileColor } from "../model";

export interface Window2DPreviewProps {
  sashesCount: number; // 1 (fijo), 2, 3 o 4 hojas
  bodiesCount?: number; // 1 cuerpo o 3 cuerpos
  glassColor?: WindowGlassColor;
  profileColor?: WindowProfileColor;
  widthM?: number;
  heightM?: number;
  compact?: boolean;
}

const PROFILE_COLORS: Record<WindowProfileColor, string> = {
  negro: "#171717",
  mate: "#9E9E9E",
  blanco: "#EAEAEA",
  madera: "#6E4726",
  champagne: "#B59E7A",
};

const GLASS_COLORS: Record<WindowGlassColor, { fill: string; stroke: string }> = {
  incoloro: { fill: "#EBF5FA", stroke: "#BCE0F0" },
  bronce: { fill: "#F2E8DC", stroke: "#D9C3AB" },
  gris: { fill: "#E2E5E8", stroke: "#BAC1C7" },
};

export const Window2DPreview: React.FC<Window2DPreviewProps> = ({
  sashesCount = 2,
  bodiesCount = 1,
  glassColor = "incoloro",
  profileColor = "negro",
  widthM,
  heightM,
  compact = false,
}) => {
  const pColor = PROFILE_COLORS[profileColor] || PROFILE_COLORS.negro;
  const gColor = GLASS_COLORS[glassColor] || GLASS_COLORS.incoloro;

  const svgWidth = 260;
  const svgHeight = bodiesCount > 1 ? 160 : 130;
  const frameBorder = 7;
  const innerWidth = svgWidth - frameBorder * 2;
  const innerHeight = svgHeight - frameBorder * 2;

  const validSashes = Math.max(1, Math.min(4, sashesCount));
  const sashWidth = innerWidth / validSashes;

  const svgContent = (
    <chakra.svg
      viewBox={`0 0 ${svgWidth} ${svgHeight}`}
      w={compact ? "110px" : "full"}
      h={compact ? (bodiesCount > 1 ? "68px" : "55px") : "auto"}
      maxH={compact ? undefined : "150px"}
      borderRadius="md"
      bg="white"
      border="1px solid"
      borderColor="gray.200"
      display="block"
      style={{ flexShrink: 0 }}
      aria-label={`Esquema técnico 2D ventana de ${validSashes} hojas`}
    >
      {/* Marco Perimetral Exterior */}
      <rect
        x="0"
        y="0"
        width={svgWidth}
        height={svgHeight}
        fill="none"
        stroke={pColor}
        strokeWidth={frameBorder * 2}
      />

      {/* Cuerpos divididos si hay división por altura */}
      {bodiesCount > 1 ? (
        <>
          {/* Fijo superior */}
          <rect
            x={frameBorder}
            y={frameBorder}
            width={innerWidth}
            height={innerHeight * 0.22}
            fill={gColor.fill}
            stroke={gColor.stroke}
            strokeWidth="1.5"
          />
          {/* Travesaño superior */}
          <line
            x1={frameBorder}
            y1={frameBorder + innerHeight * 0.22}
            x2={svgWidth - frameBorder}
            y2={frameBorder + innerHeight * 0.22}
            stroke={pColor}
            strokeWidth="5"
          />

          {/* Hojas centrales corredizas */}
          {Array.from({ length: validSashes }).map((_, i) => (
            <g key={`mid-${i}`}>
              <rect
                x={frameBorder + i * sashWidth + 1}
                y={frameBorder + innerHeight * 0.22 + 2.5}
                width={sashWidth - 2}
                height={innerHeight * 0.5 - 5}
                fill={gColor.fill}
                stroke={pColor}
                strokeWidth="3.5"
              />
              {/* Guía corrediza / flecha */}
              {i % 2 === 1 && (
                <path
                  d={`M ${frameBorder + i * sashWidth + sashWidth * 0.3} ${frameBorder + innerHeight * 0.47} L ${frameBorder + i * sashWidth + sashWidth * 0.7} ${frameBorder + innerHeight * 0.47}`}
                  stroke={pColor}
                  strokeWidth="2"
                  strokeDasharray="3 2"
                />
              )}
            </g>
          ))}

          {/* Travesaño inferior */}
          <line
            x1={frameBorder}
            y1={frameBorder + innerHeight * 0.72}
            x2={svgWidth - frameBorder}
            y2={frameBorder + innerHeight * 0.72}
            stroke={pColor}
            strokeWidth="5"
          />

          {/* Fijo inferior de seguridad */}
          <rect
            x={frameBorder}
            y={frameBorder + innerHeight * 0.72}
            width={innerWidth}
            height={innerHeight * 0.28}
            fill={gColor.fill}
            stroke={gColor.stroke}
            strokeWidth="1.5"
          />
        </>
      ) : (
        /* Ventana de 1 cuerpo con N hojas */
        Array.from({ length: validSashes }).map((_, i) => (
          <g key={`sash-${i}`}>
            <rect
              x={frameBorder + i * sashWidth + 1}
              y={frameBorder + 1}
              width={sashWidth - 2}
              height={innerHeight - 2}
              fill={gColor.fill}
              stroke={pColor}
              strokeWidth="3.5"
            />
            {/* Manija / Jalador en hojas móviles */}
            {validSashes > 1 && i % 2 === 1 && (
              <rect
                x={frameBorder + (i + 1) * sashWidth - 9}
                y={frameBorder + innerHeight * 0.45}
                width="3"
                height="16"
                rx="1.5"
                fill={pColor}
              />
            )}
            {/* Vidrio reflejo sutil */}
            <line
              x1={frameBorder + i * sashWidth + sashWidth * 0.2}
              y1={frameBorder + innerHeight * 0.2}
              x2={frameBorder + i * sashWidth + sashWidth * 0.45}
              y2={frameBorder + innerHeight * 0.7}
              stroke={gColor.stroke}
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.6"
            />
          </g>
        ))
      )}
    </chakra.svg>
  );

  if (compact) {
    return (
      <Box display="inline-flex" flexDirection="column" alignItems="center" gap="1">
        {svgContent}
        <Text fontSize="2xs" color="gray.500" fontWeight="medium" textAlign="center" whiteSpace="nowrap">
          {validSashes === 1 ? "1 paño fijo" : `${validSashes} hojas`}
        </Text>
      </Box>
    );
  }

  return (
    <Box
      p="3"
      borderRadius="xl"
      bg="bg.subtle"
      border="1px solid"
      borderColor="border.subtle"
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap="2"
      w="full"
      maxW="300px"
      mx="auto"
    >
      <HStack justify="space-between" w="full" px="1">
        <Text fontSize="xs" fontWeight="semibold" color="text.heading">
          Esquema técnico 2D
        </Text>
        <Text fontSize="xs" color="text.muted">
          {validSashes === 1 ? "1 Paño fijo" : `${validSashes} Hojas corredizas`}
        </Text>
      </HStack>

      {svgContent}

      {widthM && heightM && (
        <Text fontSize="2xs" color="text.muted" textAlign="center">
          Proporción aprox: {widthM.toFixed(2)} m (ancho) × {heightM.toFixed(2)} m (alto)
        </Text>
      )}
    </Box>
  );
};
