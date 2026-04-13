"use client";

import React from "react";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export interface BackButtonProps {
  to?: string | number;
}

const BackButton = ({ to = -1 }: BackButtonProps) => {
  const router = useRouter();
  
  const handleClick = () => {
    if (to === -1) {
      router.back();
    } else {
      router.push(to as string);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      color="text.muted"
      onClick={handleClick}
      fontWeight="600"
      _hover={{ color: "text.accent" }}
    >
      <ArrowLeft size={16} /> Regresar
    </Button>
  );
};

export default BackButton;
