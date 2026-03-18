/**
 * @file BottomNav.jsx
 * @description Smart bottom navigation with animated bubble on scroll.
 * Uses semantic color tokens for surfaces and icon colors.
 * @module layout/navbar
 */

import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Flex,
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
import { motion, AnimatePresence } from "framer-motion"; // Import motion directly
import { companyData } from "@/config/company-data";

const MotionBox = motion(Box);

const BottomNav = () => {
  const location = useLocation();
  const [hasScrolled, setHasScrolled] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 50) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      <MotionBox
        position="fixed"
        bottom={0}
        pb="calc(1rem + env(safe-area-inset-bottom))"
        left={0}
        right={0}
        display={{ base: "flex", md: "none" }}
        justifyContent="center"
        px={6}
        zIndex="sticky"
        initial={{ y: 100, opacity: 0 }}
        animate={{
          y: hasScrolled ? 0 : 100,
          opacity: hasScrolled ? 1 : 0,
        }}
        transition={{
          duration: 0.4,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      >
        <Flex
          bg="surface.bottomNav"
          px={2}
          py={2}
          borderRadius="full"
          boxShadow="0 8px 32px rgba(0,0,0,0.15)"
          w="full"
          maxW="340px"
          border="1px solid"
          borderColor="border.default"
          align="center"
          justify="space-around"
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
                style={{
                  textDecoration: "none",
                  WebkitTapHighlightColor: "transparent",
                  outline: "none",
                }}
                _focus={{ outline: "none" }}
                _focusVisible={{ outline: "none" }}
                flex={1}
                display="flex"
                justifyContent="center"
                alignItems="center"
                onClick={() => {
                  if (isActive && !item.isExternal) {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
                minH="48px"
              >
                <Box position="relative" px={5} py={2}>
                  {isActive && hasScrolled && (
                    <motion.div
                      layoutId="active-bubble"
                      style={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: "9999px",
                        backgroundColor: "var(--chakra-colors-primary-500)",
                        zIndex: 0,
                      }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}

                  <Icon
                    as={item.icon}
                    w={6}
                    h={6}
                    position="relative"
                    zIndex={1}
                    color={isActive ? "white" : "text.subtle"}
                    strokeWidth={isActive ? 2.5 : 2}
                    transition="color 0.3s ease"
                  />
                </Box>
              </Link>
            );
          })}
        </Flex>
      </MotionBox>
    </AnimatePresence>
  );
};

export default BottomNav;
