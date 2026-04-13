'use client';

/**
 * @file MobileNav.jsx
 * @description High-performance mobile navigation with a classic hamburger menu and full-screen glass overlay.
 */
import React, { useState, useEffect, useCallback } from "react";
import { Box, IconButton, VStack, Image, Text, Button, HStack } from "@chakra-ui/react";
import { Menu, X, MessageSquareText, ShieldCheck, Landmark } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { m, AnimatePresence } from "framer-motion";
import NAV_ITEMS from "@/data/nav-items";
import LibroReclamacionesIcon from "@/assets/libro.svg";
import logoGYA from "@/assets/branding/LogoCompanytrans.png";

/**
 * @component MobileNav
 * @description Refactored for peak performance using state isolation and optimized animations.
 */
const MobileNav = React.memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), []);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleWhatsAppClick = useCallback(() => {
    const phoneNumber = "51974278303";
    const message = encodeURIComponent("Hola, quisiera solicitar información sobre sus servicios.");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 400, damping: 30 } },
  };

  return (
    <>
      {/* FLOATING HAMBURGER MENU */}
      <Box
        position="fixed"
        top={4}
        right={4}
        zIndex={1100}
        display={{ base: "block", md: "none" }}
      >
        <IconButton
          as={m.button}
          whileTap={{ scale: 0.9 }}
          icon={isOpen ? <X size={24} /> : <Menu size={24} />}
          variant="solid"
          bg={isOpen ? "transparent" : "blackAlpha.500"}
          _dark={{ bg: isOpen ? "transparent" : "whiteAlpha.200" }}
          backdropFilter={isOpen ? "none" : "blur(10px)"}
          onClick={toggleMenu}
          aria-label="Toggle Navigation"
          color="white"
          borderRadius="full"
          size="lg"
          _hover={{ bg: isOpen ? "transparent" : "blackAlpha.700" }}
          _active={{ bg: isOpen ? "transparent" : "blackAlpha.800" }}
          shadow={isOpen ? "none" : "xl"}
        />
      </Box>

      {/* FULL SCREEN MENU OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <Box
            as={m.div}
            position="fixed"
            top={0}
            left={0}
            right={0}
            bottom={0}
            h="100dvh"
            w="100vw"
            zIndex={1050}
            bg="primary.900"
            _dark={{ bg: "black" }}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            px={6}
          >
            <VStack
              as={m.div}
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              spacing={8}
              w="full"
            >
              {/* PRIMARY LINKS */}
              <VStack spacing={6}>
                {NAV_ITEMS.map((navItem) => {
                  const isActive = pathname === navItem.href;
                  return (
                    <Box as={m.div} variants={itemVariants} key={navItem.label}>
                      <Link href={navItem.href ?? "#"} style={{ textDecoration: "none" }}>
                        <Text
                          fontFamily="heading"
                          fontSize="3xl"
                          fontWeight={isActive ? "900" : "500"}
                          color={isActive ? "primary.300" : "whiteAlpha.800"}
                          textTransform="uppercase"
                          letterSpacing="widest"
                          position="relative"
                          _after={{
                            content: '""',
                            position: "absolute",
                            bottom: "-4px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            width: isActive ? "40px" : "0",
                            height: "2px",
                            bg: "primary.300",
                            transition: "width 0.3s ease",
                          }}
                        >
                          {navItem.label}
                        </Text>
                      </Link>
                    </Box>
                  );
                })}
              </VStack>

              <Box as={m.div} variants={itemVariants} w="full">
                <Box borderTop="1px" borderColor="whiteAlpha.200" w="full" my={2} />
              </Box>

              {/* SECONDARY LINKS */}
              <VStack spacing={5} w="full" align="center">
                <Box as={m.div} variants={itemVariants}>
                  <Link href="/politicas-empresa" style={{ textDecoration: "none" }}>
                    <HStack spacing={3} color="whiteAlpha.700">
                      <ShieldCheck size={18} />
                      <Text fontSize="sm" fontWeight="600" textTransform="uppercase" letterSpacing="widest">Políticas</Text>
                    </HStack>
                  </Link>
                </Box>
                
                <Box as={m.div} variants={itemVariants}>
                  <Link href="/cuentas-bancarias" style={{ textDecoration: "none" }}>
                    <HStack spacing={3} color="whiteAlpha.700">
                      <Landmark size={18} />
                      <Text fontSize="sm" fontWeight="600" textTransform="uppercase" letterSpacing="widest">Cuentas Bancarias</Text>
                    </HStack>
                  </Link>
                </Box>

                <Box as={m.div} variants={itemVariants}>
                  <Link href="/libro-de-reclamacion" style={{ textDecoration: "none" }}>
                    <HStack spacing={3} color="whiteAlpha.700">
                      <Image src={LibroReclamacionesIcon} alt="Libro" boxSize={5} filter="brightness(0) invert(1)" opacity={0.7} />
                      <Text fontSize="sm" fontWeight="600" textTransform="uppercase" letterSpacing="widest">Reclamaciones</Text>
                    </HStack>
                  </Link>
                </Box>
              </VStack>

              {/* CTA WHATSAPP */}
              <Box as={m.div} variants={itemVariants} w="full" pt={6}>
                <Button
                  onClick={handleWhatsAppClick}
                  w="full"
                  variant="outline"
                  size="lg"
                  color="white"
                  borderColor="whiteAlpha.400"
                  _hover={{ bg: "white", color: "primary.900" }}
                  leftIcon={<MessageSquareText size={20} />}
                  textTransform="uppercase"
                  letterSpacing="widest"
                  fontSize="xs"
                  borderRadius="full"
                >
                  Contactar Asesor
                </Button>
              </Box>

            </VStack>

            <Box
              as={m.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              position="absolute"
              bottom={10}
            >
              <Image src={logoGYA} alt="GYA" h="30px" filter="brightness(0) invert(1)" opacity={0.5} />
            </Box>
          </Box>
        )}
      </AnimatePresence>
    </>
  );
});

MobileNav.displayName = "MobileNav";

export default MobileNav;
