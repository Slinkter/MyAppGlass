/**
 * @file BottomNav.jsx
 * @description Smart bottom navigation that hides on scroll down, shows on scroll up.
 */

import React, { useState, useEffect, useRef } from "react";
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
import { AnimatePresence, motion } from "framer-motion";
import { companyData } from "@/config/company-data";

const MotionBox = motion(Box);

const BottomNav = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const containerBg = useColorModeValue(
    "rgba(255, 255, 255, 0.95)",
    "rgba(20, 20, 20, 0.95)"
  );
  const containerBorder = useColorModeValue("gray.200", "gray.700");
  const activeColor = useColorModeValue("primary.600", "primary.300");
  const inactiveColor = useColorModeValue("gray.400", "gray.500");
  const activeBgColor = useColorModeValue("primary.50", "gray.700");
  const labelColor = useColorModeValue("gray.500", "gray.400");
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
    <AnimatePresence>
      {isVisible && (
        <MotionBox
          position="fixed"
          bottom={0}
          left={0}
          right={0}
          display={{ base: "block", md: "none" }}
          zIndex="sticky"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ 
            duration: 0.3, 
            ease: [0.25, 0.46, 0.45, 0.94] 
          }}
        >
          <Flex
            bg={containerBg}
            backdropFilter="blur(12px)"
            borderTop="1px solid"
            borderColor={containerBorder}
            justify="space-around"
            align="center"
            py={3}
            px={2}
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
                  style={{
                    textDecoration: "none",
                    WebkitTapHighlightColor: "transparent",
                  }}
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
        </MotionBox>
      )}
    </AnimatePresence>
  );
};

export default BottomNav;
