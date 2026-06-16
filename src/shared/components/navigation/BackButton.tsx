/**
 * @file BackButton.tsx
 * @description A simple, reusable button for navigating back to the previous page.
 * @module shared/components/navigation
 */
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  to?: string;
}

/**
 * @component BackButton
 * @description Renders a button that navigates to a specified path or one level back.
 */
const BackButton: React.FC<BackButtonProps> = ({ to }) => {
  const router = useRouter();
  
  const handleClick = () => {
    if (to) {
      router.push(to);
    } else {
      router.back();
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
