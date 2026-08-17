"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Box, HStack, VStack, Text, Input, IconButton } from "@chakra-ui/react";
import { RotateCcw, ShieldCheck, AlertCircle } from "lucide-react";
import { generateMathChallenge, MathChallenge } from "@/shared/utils/mathCaptcha";

interface MathCaptchaFieldProps {
  value: string;
  onChange: (value: string, token: string) => void;
  error?: string;
  id?: string;
}

export const MathCaptchaField: React.FC<MathCaptchaFieldProps> = ({
  value,
  onChange,
  error,
  id = "math-captcha-input",
}) => {
  const [challenge, setChallenge] = useState<MathChallenge | null>(null);
  const [isRotating, setIsRotating] = useState(false);

  const refreshChallenge = useCallback(() => {
    setIsRotating(true);
    const newChallenge = generateMathChallenge();
    setChallenge(newChallenge);
    onChange("", newChallenge.token);
    setTimeout(() => setIsRotating(false), 300);
  }, [onChange]);

  // Generar reto inicial al montar el componente
  useEffect(() => {
    const initial = generateMathChallenge();
    setChallenge(initial);
    onChange("", initial.token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!challenge) return;
    onChange(e.target.value, challenge.token);
  };

  return (
    <Box
      w="full"
      p="3.5"
      bg={error ? { base: "red.50/40", _dark: "red.950/20" } : { base: "gray.50", _dark: "whiteAlpha.50" }}
      borderRadius="xl"
      borderWidth="1.5px"
      borderColor={error ? "red.500" : { base: "gray.200", _dark: "whiteAlpha.200" }}
      transition="all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
    >
      <VStack align="stretch" gap="2.5">
        <HStack justify="space-between" align="center">
          <HStack gap="1.5" color={error ? "red.500" : "primary.500"}>
            <ShieldCheck size={16} />
            <Text fontSize="xs" fontWeight="700" letterSpacing="wide" textTransform="uppercase">
              Verificación de Seguridad
            </Text>
          </HStack>

          <IconButton
            size="xs"
            variant="ghost"
            aria-label="Generar nueva operación matemática"
            title="Cambiar operación"
            onClick={refreshChallenge}
            transform={isRotating ? "rotate(180deg)" : "rotate(0deg)"}
            transition="transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
          >
            <RotateCcw size={14} />
          </IconButton>
        </HStack>

        <HStack gap="3" align="center">
          <Box
            px="3.5"
            py="2"
            bg={{ base: "white", _dark: "whiteAlpha.100" }}
            borderRadius="lg"
            borderWidth="1px"
            borderColor={error ? "red.300" : { base: "gray.300", _dark: "whiteAlpha.300" }}
            fontWeight="800"
            fontSize="sm"
            color="text.heading"
            userSelect="none"
            whiteSpace="nowrap"
          >
            {challenge ? challenge.question : "¿Cuánto es ...?"}
          </Box>

          <Input
            id={id}
            name="mathCaptchaAnswer"
            type="text"
            inputMode="numeric"
            placeholder="Tu respuesta"
            value={value}
            onChange={handleInputChange}
            size="md"
            borderRadius="lg"
            bg={{ base: "white", _dark: "blackAlpha.600" }}
            borderWidth="1px"
            borderColor={error ? "red.500" : { base: "gray.300", _dark: "whiteAlpha.300" }}
            _focus={{
              borderColor: error ? "red.500" : "primary.500",
              boxShadow: error
                ? "0 0 0 1px var(--chakra-colors-red-500)"
                : "0 0 0 1px var(--chakra-colors-primary-500)",
            }}
            fontWeight="700"
            fontSize="sm"
            textAlign="center"
            maxLength={4}
            autoComplete="off"
            flex="1"
          />
        </HStack>

        {error && (
          <HStack gap="1.5" color="red.500" fontSize="xs" fontWeight="600" pt="0.5">
            <AlertCircle size={14} />
            <Text>{error}</Text>
          </HStack>
        )}
      </VStack>
    </Box>
  );
};
