"use client";
/**
 * @file AccountsMinimalist.tsx
 * @description Option 3: Aura "Minimalist Trust" - Focus on clarity and data elegance.
 */
import React from "react";
import { 
  Box, VStack, HStack, Text, Heading, Flex, Separator
 } from "@chakra-ui/react";
import { Copy, Landmark } from "lucide-react";
import { bankAccountsData } from "../../../data/bank-accounts";

export interface MinimalistItemProps {
  label: string;
  value: string;
}

const MinimalistItem: React.FC<MinimalistItemProps> = ({ label, value }) => (
  <Flex justify="space-between" align="center" py={4} _hover={{ bg: "bg.subtle" }} px={2} borderRadius="md" transition="background 0.2s">
    <Box>
      <Text fontSize="xs" color="text.muted" fontWeight="bold" textTransform="uppercase" letterSpacing="widest">{label}</Text>
      <Text fontFamily="mono" fontSize="lg" color="text.body" fontWeight="medium">{value}</Text>
    </Box>
    <Box as={Copy} cursor="pointer" opacity={0.3} _hover={{ opacity: 1, color: "primary.500" }} transition="all 0.2s" />
  </Flex>
);

export const AccountsMinimalist: React.FC = () => (
  <Box py={10}>
    <VStack align="stretch" gap={12}>
      {bankAccountsData.map((bank, i) => (
        <Box key={i}>
          <HStack gap={4} mb={6}>
            <Box as={Landmark} color="primary.500" />
            <Heading size="md" letterSpacing="tight">{bank.bankName} — {bank.accountType}</Heading>
          </HStack>
          <VStack align="stretch" gap={0}>
            {bank.accounts.map((acc, idx) => <MinimalistItem key={idx} {...acc} />)}
          </VStack>
          <Separator mt={8} borderColor="border.glass" />
        </Box>
      ))}
    </VStack>
  </Box>
);

export default AccountsMinimalist;
