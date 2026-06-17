"use client";
import React from "react";
import {
  Box,
  Heading,
  Text,
} from "@chakra-ui/react";
import { MessageSquareText } from "lucide-react";



const BentoCTA = React.memo(({ systemName }: { systemName: string }) => {
  return (
    <Box
      bg="primary.900"
      _dark={{ bg: "black" }}
      color="white"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      borderRadius="3xl"
      px={{ base: "6", lg: "8" }}
      py="8"
    >
      <Box as={MessageSquareText} boxSize={8} mb="4" color="primary.300" _dark={{ color: "primary.500" }} />
      <Heading size="md" mb="2" letterSpacing="tight">¿Iniciamos tu obra?</Heading>
      <Text opacity={0.85} mb="0" fontSize="sm" maxW="sm" mx="auto">Asesoría técnica exclusiva para tu proyecto de {systemName}.</Text>
    </Box>
  );
});
BentoCTA.displayName = "BentoCTA";

export default BentoCTA;
