/**
 * @file BottomNav.jsx
 * @description Minimalist bottom navigation bar with icon + label.
 */

import React from "react";
import {
  Box,
  Flex,
  Text,
  useColorModeValue,
  Icon,
  Link,
} from "@chakra-ui/react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import {
  HomeIcon,
  WrenchScrewdriverIcon,
  BuildingOffice2Icon,
} from "@heroicons/react/24/outline";
import { FaWhatsapp } from "react-icons/fa";
import { LazyMotion, m, domAnimation } from "framer-motion";
import { companyData } from "@/config/company-data";

const BottomNav = () => {
  const location = useLocation();

  const containerBg = useColorModeValue(
    "rgba(255, 255, 255, 0.95)",
    "rgba(20, 20, 20, 0.95)"
  );
  const containerBorder = useColorModeValue("gray.200", "gray.700");
  const activeColor = useColorModeValue("primary.600", "primary.300");
  const inactiveColor = useColorModeValue("gray.500", "gray.500");
  const activeBgColor = useColorModeValue("primary.50", "gray.700");
  const labelColor = useColorModeValue("gray.600", "gray.400");
  const activeLabelColor = useColorModeValue("primary.600", "primary.300");

  const navItems = [
    { label: "Inicio", icon: HomeIcon, path: "/" },
    { label: "Servicios", icon: WrenchScrewdriverIcon, path: "/servicios" },
    { label: "Proyectos", icon: BuildingOffice2Icon, path: "/proyectos" },
    {
      label: "WhatsApp",
      icon: FaWhatsapp,
      path: `https://wa.me/${companyData.whatsappNumber}`,
      isExternal: true,
    },
  ];

  return (
    <LazyMotion features={domAnimation}>
      <Box
        position="fixed"
        bottom={4}
        left={4}
        right={4}
        display={{ base: "block", md: "none" }}
        zIndex="sticky"
      >
        <Flex
          as={m.nav}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          bg={containerBg}
          borderRadius="xl"
          border="1px solid"
          borderColor={containerBorder}
          shadow="md"
          justify="space-around"
          align="center"
          py={2}
          px={1}
        >
          {navItems.map((item) => {
            const isActive = !item.isExternal && location.pathname === item.path;

            return (
              <Link
                key={item.label}
                as={item.isExternal ? "a" : RouterLink}
                to={!item.isExternal ? item.path : undefined}
                href={item.isExternal ? item.path : undefined}
                isExternal={item.isExternal}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                flex={1}
                py={2}
                px={2}
                borderRadius="lg"
                bg={isActive ? activeBgColor : "transparent"}
                transition="background 0.2s ease"
                style={{
                  textDecoration: "none",
                  WebkitTapHighlightColor: "transparent",
                }}
                _hover={{ bg: isActive ? activeBgColor : "transparent" }}
                onClick={() => {
                  if (isActive && !item.isExternal) {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
              >
                <Icon
                  as={item.icon}
                  w={5}
                  h={5}
                  color={isActive ? activeColor : inactiveColor}
                  strokeWidth={isActive ? 2.5 : 2}
                  mb={1}
                />
                <Text
                  fontSize="xs"
                  fontWeight={isActive ? "600" : "500"}
                  color={isActive ? activeLabelColor : labelColor}
                  textTransform="uppercase"
                  letterSpacing="wider"
                  lineHeight={1}
                >
                  {item.label}
                </Text>
              </Link>
            );
          })}
        </Flex>
      </Box>
    </LazyMotion>
  );
};

export default BottomNav;
