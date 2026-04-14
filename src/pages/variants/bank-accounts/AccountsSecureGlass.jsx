import { useColorModeValue } from "@/components/ui/color-mode";
/**
 * @file AccountsSecureGlass.jsx
 * @description Option 1: Aura "Secure Glass" - Transparency and digital trust.
 */
import { Box, VStack, HStack, Text, Heading, Image, SimpleGrid, Flex } from "@chakra-ui/react";
import { Copy, ShieldCheck } from "lucide-react";
import { bankAccountsData } from "../../../data/bank-accounts";

const SecureCard = ({ logo, bankName, accountType, accounts }) => (
  <Box 
    variant="glass" 
    p={8} 
    position="relative" 
    overflow="hidden"
    boxShadow="xl"
  >
    <HStack justify="space-between" mb={8}>
      <HStack gap={4}>
        <Image src={logo} h="40px" filter={useColorModeValue("none", "brightness(0) invert(1)")} />
        <VStack align="flex-start" gap={0}>
          <Text fontSize="xs" fontWeight="bold" color="text.accent" textTransform="uppercase">{bankName}</Text>
          <Heading size="sm">{accountType}</Heading>
        </VStack>
      </HStack>
      <Box as={ShieldCheck} color="green.400" boxSize={6} />
    </HStack>

    <VStack align="stretch" gap={4}>
      {accounts.map((acc, i) => (
        <Flex key={i} justify="space-between" align="center" p={4} bg="bg.subtle" borderRadius="xl" border="1px solid" borderColor="border.glass">
          <Box>
            <Text fontSize="xs" color="text.muted" fontWeight="bold">{acc.label}</Text>
            <Text fontFamily="mono" fontSize="md" fontWeight="bold" letterSpacing="wider">{acc.value}</Text>
          </Box>
          <Box as={Copy} cursor="pointer" _hover={{ color: "primary.500" }} />
        </Flex>
      ))}
    </VStack>
  </Box>
);

export const AccountsSecureGlass = () => (
  <Box py={10}>
    <SimpleGrid columns={{ base: 1, lg: 2 }} gap={8}>
      {bankAccountsData.map((bank, i) => <SecureCard key={i} {...bank} />)}
    </SimpleGrid>
  </Box>
);
