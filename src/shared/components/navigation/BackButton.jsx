/**
 * @file BackButton.jsx
 * @description A simple, reusable button for navigating back to the previous page.
 * @module shared/components/navigation
 */
import React from "react";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

/**
 * @component BackButton
 * @description Renders a button that navigates to a specified path or one level back.
 * @param {object} props
 * @param {string} [props.to="/"] - The path to navigate to. Defaults to the root.
 */
const BackButton = ({ to = -1 }) => {
  const navigate = useNavigate();
  
  return (
    <Button
      variant="link"
      size="sm"
      color="text.muted"
      onClick={() => navigate(to)}
      leftIcon={<ArrowLeft size={16} />}
      fontWeight="600"
      _hover={{ color: "text.accent" }}
    >
      Regresar
    </Button>
  );
};

export default BackButton;
