"use client";

import React from "react";
import { Flex, Box, Image, Text, Stack, Card } from "@chakra-ui/react";
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
  logoBg = "gray.50",
}) => {
  return (
    <Card.Root
      flexDirection={{ base: "column", md: "row" }}
      overflow="hidden"
      p={0}
      borderRadius="2xl"
      borderColor="border.default"
      bg="surface.card"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
    >
      <Flex
        align="center"
        justify="center"
        bg={logoBg}
        _dark={{ bg: "whiteAlpha.900" }}
        p={6}
        minW={{ md: "220px" }}
        maxW={{ md: "240px" }}
        borderRightWidth={{ md: "1px" }}
        borderBottomWidth={{ base: "1px", md: "0" }}
        borderColor="border.default"
      >
        <Image
          objectFit="contain"
          w="full"
          h="auto"
          maxH="60px"
          src={logo}
          alt={`Logo ${bankName}`}
          loading="lazy"
          decoding="async"
        />
      </Flex>

      <Card.Body p={{ base: 5, md: 6 }} flex="1">
        <Stack gap={4}>
          <Box>
            <Text
              fontSize="sm"
              fontWeight="700"
              color="text.accent"
              textTransform="uppercase"
              letterSpacing="wide"
              mb={1}
            >
              {bankName}
            </Text>
            <Text
              fontSize="md"
              fontWeight="600"
              color="text.heading"
              lineHeight="1.3"
            >
              {accountType}
            </Text>
          </Box>

          <Stack gap={3}>
            {accounts.map((acc, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && (
                  <Box
                    borderBottomWidth="1px"
                    borderColor="border.default"
                  />
                )}
                <Flex
                  justify="space-between"
                  align="flex-start"
                  gap={3}
                >
                  <Box flex="1">
                    <Text
                      fontSize="xs"
                      color="text.muted"
                      fontWeight="600"
                      textTransform="uppercase"
                      letterSpacing="wide"
                    >
                      {acc.label}
                    </Text>
                    <Text
                      fontSize="md"
                      fontWeight="600"
                      color="text.heading"
                      mt={0.5}
                    >
                      {acc.value}
                    </Text>
                    {acc.note && (
                      <Text
                        fontSize="xs"
                        color="orange.500"
                        fontStyle="italic"
                        mt={1}
                      >
                        {acc.note}
                      </Text>
                    )}
                  </Box>
                  <CopyButton
                    value={acc.value}
                    label={acc.label}
                  />
                </Flex>
              </React.Fragment>
            ))}
          </Stack>
        </Stack>
      </Card.Body>
    </Card.Root>
  );
};
