/**
 * @file BackButton.tsx
 * @description A simple, reusable button for navigating back to the previous page.
 * @module shared/components/navigation
 */
import React from "react";
import { Button } from "@chakra-ui/react";
import { useRouter as useNavigate } from "next/navigation";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  to?: To | number;
}

/**
 * @component BackButton
 * @description Renders a button that navigates to a specified path or one level back.
 */
const BackButton: React.FC<BackButtonProps> = ({ to = -1 }) => {
  const navigate = useNavigate();
  
  return (
    <Button
      variant="link"
      size="sm"
      color="text.muted"
      // @ts-expect-error - Chakra UI v3 internal type mismatch: navigate accepts string or number, but the union type To | number requires casting
      onClick={() => navigate(to as unknown as To)}
      fontWeight="600"
      _hover={{ color: "text.accent" }}
    >
      <ArrowLeft size={16} /> Regresar
    </Button>
  );
};

export default BackButton;
