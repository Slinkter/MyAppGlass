/**
 * @file BackButton.tsx
 * @description A simple, reusable button for navigating back to the previous page.
 * @module shared/components/navigation
 */
import React from "react";
import RouterLink from "next/link";
import { Button } from "@/shared/ui/button";
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

  if (to) {
    return (
      <Button
        asChild
        variant="ghost"
        size="sm"
        color="text.muted"
        fontWeight="600"
        _hover={{ color: "text.accent" }}
      >
        <RouterLink href={to} transitionTypes={["nav-back"]}>
          <ArrowLeft size={16} style={{ flexShrink: 0 }} /> Regresar
        </RouterLink>
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      color="text.muted"
      onClick={() => router.back()}
      fontWeight="600"
      _hover={{ color: "text.accent" }}
    >
      <ArrowLeft size={16} style={{ flexShrink: 0 }} /> Regresar
    </Button>
  );
};

export default BackButton;
