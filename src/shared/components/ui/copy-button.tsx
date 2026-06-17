"use client";

import React, { useState } from "react";
import { IconButton } from "@chakra-ui/react";
import { Tooltip } from "@/components/ui/tooltip";
import { Copy, Check } from "lucide-react";
import { toaster } from "@/components/ui/toaster-instance";

interface CopyButtonProps {
  value: string;
  label: string;
}

/**
 * A reusable button that copies a value to the clipboard and shows a success toast.
 * Standardized for use across the application.
 */
export const CopyButton: React.FC<CopyButtonProps> = ({ value, label }) => {
  const [hasCopied, setHasCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setHasCopied(true);
      toaster.create({
        title: "Copiado",
        description: `${label} copiado al portapapeles.`,
        type: "success",
        duration: 2000,
      });
      setTimeout(() => setHasCopied(false), 2000);
    } catch (error) {
      toaster.create({
        title: "Error",
        description: "No se pudo copiar el texto.",
        type: "error",
      });
    }
  };

  return (
    <Tooltip content={`Copiar ${label}`}>
      <IconButton
        size="sm"
        aria-label={`Copiar ${label}`}
        onClick={handleCopy}
        variant="ghost"
        colorPalette={hasCopied ? "green" : "gray"}
        borderRadius="full"
      >
        {hasCopied ? <Check size={16} /> : <Copy size={16} />}
      </IconButton>
    </Tooltip>
  );
};
