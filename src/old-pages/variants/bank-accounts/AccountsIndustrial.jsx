/**
 * @file AccountsIndustrial.jsx
 * @description Option 2: Aura "Industrial Blueprint" - Technical precision and order.
 */
import React from "react";
import {
  Box, VStack, HStack, Text, Heading, Image, SimpleGrid, Icon, Flex
} from "@chakra-ui/react";
import { Copy, Hash } from "lucide-react";
import { bankAccountsData } from "../../../data/bank-accounts";

const IndustrialCard = ({ logo, bankName, accountType, accounts }) => (
  <Box 
    bg="bg.section" 
    border="1px solid" 
    borderColor="primary.900" 
    _dark={{ borderColor: "primary.100" }}
    borderRadius="none" 
    p={0}
    position="relative"
  >
    <Flex direction={{ base: "column", md: "row" }}>
      <Box bg="primary.900" _dark={{ bg: "primary.100" }} p={6} display="flex" align="center" justify="center" minW="180px">
        <Image src={logo} h="30px" filter="brightness(0) invert(1)" _dark={{ filter: "none" }} alt="" />
      </Box>
      <Box p={6} flex={1}>
        <HStack mb={4}>
          <Icon as={Hash} size={14} />
          <Heading size="xs" textTransform="uppercase" letterSpacing="0.2em">{bankName} - {accountType}</Heading>
        </HStack>
        <VStack align="stretch" spacing={2}>
          {accounts.map((acc, i) => (
            <HStack key={i} justify="space-between" py={2} borderBottom="1px dashed" borderColor="border.glass">
              <Box>
                <Text fontSize="10px" fontWeight="black" color="text.subtle">{acc.label}</Text>
                <Text fontFamily="mono" fontSize="sm">{acc.value}</Text>
              </Box>
              <Icon as={Copy} boxSize={3} opacity={0.5} cursor="pointer" />
            </HStack>
          ))}
        </VStack>
      </Box>
    </Flex>
  </Box>
);

export const AccountsIndustrial = () => (
  <Box py={10}>
    <SimpleGrid columns={1} spacing={6}>
      {bankAccountsData.map((bank, i) => <IndustrialCard key={i} {...bank} />)}
    </SimpleGrid>
  </Box>
);

export default AccountsIndustrial;
