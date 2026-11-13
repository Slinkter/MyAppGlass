"use client";

/**
 * @file SupplierProductImage.tsx
 * @description Miniatura cuadrada de un producto de proveedor, resuelta desde Storage. Muestra un ícono si no hay foto o no carga.
 * @module entities/supplier/ui
 */

import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import { getDownloadURL, ref } from "firebase/storage";
import { ImageOff } from "lucide-react";
import { storage } from "@/shared/lib/firebase";

interface SupplierProductImageProps {
  /** Ruta de la foto en Storage (`proveedores/...`); vacía si no hay foto. */
  path: string | null | undefined;
  alt: string;
  /** Lado del cuadro, en unidades de Chakra. */
  size?: string;
}

export function SupplierProductImage({ path, alt, size = "12" }: SupplierProductImageProps) {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setUrl(null);

    if (!path) return;

    getDownloadURL(ref(storage, path))
      .then((resolved) => {
        if (!cancelled) setUrl(resolved);
      })
      .catch(() => {
        if (!cancelled) setUrl(null);
      });

    return () => {
      cancelled = true;
    };
  }, [path]);

  return (
    <Box
      boxSize={size}
      borderRadius="md"
      overflow="hidden"
      bg="bg.muted"
      color="text.muted"
      flexShrink={0}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      {url ? (
        <img src={url} alt={alt} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
      ) : (
        <ImageOff size={18} />
      )}
    </Box>
  );
}
