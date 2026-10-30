"use client";

import React from "react";
import { Flex, Box, Image, Text, Stack, HStack } from "@chakra-ui/react";
import { BankAccount } from "@/shared/data/bank-accounts";
import { CopyButton } from "@/shared/components/ui/copy-button";

interface BankAccountCardProps extends Omit<BankAccount, 'logoBg'> {
  logoBg?: string;
}

/**
 * Specialized card for displaying bank account information.
 * Decoupled from the main view to follow SRP.
 */
export const BankAccountCard: React.FC<BankAccountCardProps> = ({
  logo,
  bankName,
  accountType,
  accounts,
}) => {
  return (
    <Box
      w="full"
      bg="bg.subtle"
      borderRadius="3xl"
      borderWidth="1px"
      borderColor="border.default"
      overflow="hidden"
      p={{ base: "5", md: "6" }}
      transition="all 0.3s ease"
      _hover={{
        borderColor: "primary.500",
        boxShadow: "sm",
      }}
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        align={{ base: "flex-start", md: "center" }}
        justify="space-between"
        gap="5"
        mb="5"
        pb="4"
        borderBottomWidth="1px"
        borderColor="border.default"
      >
        <HStack gap="4">
          <Box
            w="48px"
            h="48px"
            bg="white"
            borderRadius="xl"
            display="flex"
            alignItems="center"
            justifyContent="center"
            p="2"
            boxShadow="xs"
            borderWidth="1px"
            borderColor="border.default"
          >
            <Image
              src={logo}
              alt={`Logo ${bankName}`}
              w="100%"
              h="100%"
              objectFit="contain"
            />
          </Box>
          <Box>
            <Text fontSize="md" fontWeight="800" color="text.heading" lineHeight="tight">
              {bankName}
            </Text>
            <Text fontSize="xs" fontWeight="500" color="text.muted">
              {accountType}
            </Text>
          </Box>
        </HStack>
      </Flex>

      <Stack gap="3">
        {accounts.map((acc) => (
          <Flex
            key={acc.value}
            direction={{ base: "column", sm: "row" }}
            align={{ base: "flex-start", sm: "center" }}
            justify="space-between"
            gap="3"
            p="3.5"
            bg="surface.card"
            borderRadius="2xl"
            borderWidth="1px"
            borderColor="border.default"
          >
            <Box flex="1">
              <Text fontSize="10px" fontWeight="800" color="primary.500" textTransform="uppercase" letterSpacing="0.15em">
                {acc.label}
              </Text>
              <Text fontSize="sm" fontWeight="700" color="text.heading" mt="0.5">
                {acc.value}
              </Text>
              {acc.note && (
                <Text fontSize="xs" color="text.accent" fontStyle="italic" mt="0.5">
                  {acc.note}
                </Text>
              )}
            </Box>

            <CopyButton value={acc.value} label={acc.label} />
          </Flex>
        ))}
      </Stack>
    </Box>
  );
};
