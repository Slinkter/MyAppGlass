/**
 * @file BankAccountsTestPage.jsx
 * @description Showcase for Bank Accounts page variants.
 */
import React from "react";
import { Box, Heading, Container, VStack, Text, Button, Icon } from "@chakra-ui/react";
import { useColorMode } from "@/components/ui/color-mode";
import { Sun, Moon, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { AccountsSecureGlass } from "./variants/bank-accounts/AccountsSecureGlass";
import { AccountsIndustrial } from "./variants/bank-accounts/AccountsIndustrial";
import { AccountsMinimalist } from "./variants/bank-accounts/AccountsMinimalist";

const BankAccountsTestPage = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box bg="bg.page" minH="100vh" pb={20}>
      <Button position="fixed" top={4} right={4} zIndex={1000} variant="aura" onClick={toggleColorMode} leftIcon={<Icon as={colorMode === "light" ? Moon : Sun} />}>
        MODO {colorMode === "light" ? "OSCURO" : "CLARO"}
      </Button>
      
      <Container maxW="7xl" pt={10}>
        <Link to="/test">
          <Button variant="ghost" leftIcon={<ArrowLeft size={16} />} mb={8}>Volver al Showcase</Button>
        </Link>
        <VStack spacing={2} align="center" mb={16}>
          <Heading size="2xl" letterSpacing="tight">TEST DE BANCA PREMIUM</Heading>
          <Text color="text.muted">Comparativa de interfaces de alta seguridad y precisión para GYA</Text>
        </VStack>

        <Heading size="md" mb={6} color="primary.500">1. OPCIÓN: SECURE GLASS</Heading>
        <AccountsSecureGlass />
        
        <Box my={20} borderTop="1px" borderColor="border.glass" />

        <Heading size="md" mb={6} color="primary.500">2. OPCIÓN: INDUSTRIAL BLUEPRINT</Heading>
        <AccountsIndustrial />

        <Box my={20} borderTop="1px" borderColor="border.glass" />

        <Heading size="md" mb={6} color="primary.500">3. OPCIÓN: MINIMALIST TRUST</Heading>
        <AccountsMinimalist />
      </Container>
    </Box>
  );
};

export default BankAccountsTestPage;
