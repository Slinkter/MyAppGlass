"use client";

/**
 * @file DemoLinks.tsx
 * @description Envuelve demos del catálogo que contienen enlaces reales (migas, barras de navegación).
 * Al hacer clic no se navega ni se salta a un ancla: la página del catálogo se queda donde está.
 * El clic se intercepta en la fase de captura, antes de que `next/link` decida navegar.
 */

import React from "react";
import { Box, type BoxProps } from "@chakra-ui/react";

export const DemoLinks: React.FC<BoxProps> = ({ children, ...rest }) => (
  <Box
    {...rest}
    onClickCapture={(event) => {
      if ((event.target as HTMLElement).closest("a")) {
        event.preventDefault();
      }
    }}
  >
    {children}
  </Box>
);
