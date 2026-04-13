/**
 * @file MobileNav.jsx
 * @description Premium mobile navigation with a classic hamburger menu and full-screen glass overlay.
 */
import React, { useState, useEffect } from "react";
import { Box, Flex, IconButton, VStack, Image, Text, Button, Divider, HStack } from "@chakra-ui/react";
import { Menu, X, MessageSquareText, ShieldCheck, Landmark } from "lucide-react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import NAV_ITEMS from "@/data/nav-items";
import logoGYA from "@/assets/branding/LogoCompanytrans.png";
import LibroReclamacionesIcon from "@/assets/libro.svg";

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);
const MotionLink = motion(Box);

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  // Cierra el menú automáticamente cuando cambia la ruta
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Previene el scroll del body cuando el menú está abierto
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

  const handleWhatsAppClick = () => {
    const phoneNumber = "51974278303";
    const message = encodeURIComponent("Hola, quisiera solicitar información sobre sus servicios.");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
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
          <MotionBox
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
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0)", transition: { duration: 0.4 } }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            px={6}
          >
            <MotionVStack
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
                  const isActive = location.pathname === navItem.href;
                  return (
                    <MotionLink variants={itemVariants} key={navItem.label}>
                      <RouterLink to={navItem.href ?? "#"} style={{ textDecoration: "none" }}>
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
                      </RouterLink>
                    </MotionLink>
                  );
                })}
              </VStack>

              <MotionBox variants={itemVariants} w="full">
                <Divider borderColor="whiteAlpha.200" w="full" my={2} />
              </MotionBox>

              {/* SECONDARY LINKS */}
              <VStack spacing={5} w="full" align="center">
                <MotionLink variants={itemVariants}>
                  <RouterLink to="/politicas-empresa" style={{ textDecoration: "none" }}>
                    <HStack spacing={3} color="whiteAlpha.700">
                      <ShieldCheck size={18} />
                      <Text fontSize="sm" fontWeight="600" textTransform="uppercase" letterSpacing="widest">Políticas</Text>
                    </HStack>
                  </RouterLink>
                </MotionLink>
                
                <MotionLink variants={itemVariants}>
                  <RouterLink to="/cuentas-bancarias" style={{ textDecoration: "none" }}>
                    <HStack spacing={3} color="whiteAlpha.700">
                      <Landmark size={18} />
                      <Text fontSize="sm" fontWeight="600" textTransform="uppercase" letterSpacing="widest">Cuentas Bancarias</Text>
                    </HStack>
                  </RouterLink>
                </MotionLink>

                <MotionLink variants={itemVariants}>
                  <RouterLink to="/libro-de-reclamacion" style={{ textDecoration: "none" }}>
                    <HStack spacing={3} color="whiteAlpha.700">
                      <Image src={LibroReclamacionesIcon} alt="Libro" boxSize={5} filter="brightness(0) invert(1)" opacity={0.7} />
                      <Text fontSize="sm" fontWeight="600" textTransform="uppercase" letterSpacing="widest">Reclamaciones</Text>
                    </HStack>
                  </RouterLink>
                </MotionLink>
              </VStack>

              {/* CTA WHATSAPP */}
              <MotionBox variants={itemVariants} w="full" pt={6}>
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
              </MotionBox>

            </MotionVStack>
          </MotionBox>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileNav;
