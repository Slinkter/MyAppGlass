/**
 * @file BackButton.tsx
 * @description A simple, reusable button for navigating back to the previous page.
 * @module shared/components/navigation
 */
import React from "react";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  to?: string | number;
}

/**
 * @component BackButton
 * @description Renders a button that navigates to a specified path or one level back.
 */
const BackButton: React.FC<BackButtonProps> = ({ to = -1 }) => {
  const router = useRouter();
  
  const handleClick = () => {
    if (typeof to === "number") {
      router.back();
    } else {
      router.push(to);
    }
  };

  return (
    <Button
      variant="link"
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
