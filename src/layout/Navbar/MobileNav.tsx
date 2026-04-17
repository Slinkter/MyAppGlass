/**
 * @file MobileNav.tsx
 * @description UX/UI Architect Edition: Ethereal & Minimalist Navigation.
 * Refined trigger: Removed all backgrounds and borders for an ultra-clean floating look.
 */
import React, { useState, useEffect, useCallback, useTransition } from "react";
import { Box, IconButton, VStack, Image, Text, Separator, HStack, SimpleGrid } from "@chakra-ui/react";
import { Menu, X, ShieldCheck, Landmark, Home, LucideIcon } from "lucide-react";
import { usePathname as useLocation } from "next/navigation";
import NavLink from "next/link";;
import { m, AnimatePresence } from "framer-motion";
import NAV_ITEMS from "@/data/nav-items";
import LibroReclamacionesIcon from "@/assets/libro.svg";
import { ColorModeButton } from "@/components/ui/color-mode";
import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerRoot,
  DrawerTrigger,
} from "@/components/ui/drawer";

interface NavItemLargeProps {
  label: string;
  href: string;
  onClick: () => void;
}

/**
 * @component NavItemLarge
 */
const NavItemLarge = ({ label, href, onClick }: NavItemLargeProps) => (
  <NavLink 
    href={href} 
    onClick={onClick}
    style={{ textDecoration: "none", width: "100%" }}
  >
    {({ isActive }) => (
      <VStack gap={1} align="center" py={4}>
        <Text
          fontFamily="heading"
          fontSize="4xl"
          fontWeight={isActive ? "900" : "300"}
          color={isActive ? "text.accent" : "text.body"}
          textTransform="uppercase"
          letterSpacing="0.2em"
          transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
          _hover={{ letterSpacing: "0.25em", color: "text.accent" }}
        >
          {label}
        </Text>
        <m.div 
          initial={false}
          animate={{ width: isActive ? "40px" : "0" }} 
          style={{ height: "2px", backgroundColor: "var(--chakra-colors-text-accent)" }} 
        />
      </VStack>
    )}
  </NavLink>
);

interface UtilityLinkProps {
  label: string;
  href: string;
  icon: LucideIcon | string;
  onClick: () => void;
  isImage?: boolean;
}

/**
 * @component UtilityLink
 */
const UtilityLink = ({ label, href, icon: Icon, onClick, isImage }: UtilityLinkProps) => (
  <NavLink href={href} onClick={onClick} style={{ textDecoration: "none" }}>
    <HStack gap={2} color="text.muted" _hover={{ color: "text.accent" }} transition="color 0.2s">
      {isImage ? (
        <Image src={Icon as string} alt={label} boxSize={4} _dark={{ filter: "brightness(0) invert(1)" }} opacity={0.6} />
      ) : (
        <Box as={Icon as LucideIcon} size={16} />
      )}
      <Text fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="widest">
        {label}
      </Text>
    </HStack>
  </NavLink>
);

const MobileNav = React.memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleLinkClick = useCallback(() => {
    startTransition(() => setIsOpen(false));
  }, []);

  return (
    <DrawerRoot 
      open={isOpen} 
      onOpenChange={(e) => setIsOpen(e.open)} 
      size="full"
      placement="top"
    >
      {/* ULTRA-CLEAN FLOATING TRIGGER (NO BACKGROUND) */}
      <Box position="fixed" top="phi_md" right="phi_md" zIndex={1100} display={{ base: "block", md: "none" }}>
        <DrawerTrigger asChild>
          <IconButton
            variant="plain" // Totally transparent, no borders or background
            aria-label="Menú"
            color={isOpen ? "text.accent" : "text.heading"}
            _dark={{ color: isOpen ? "text.accent" : "white" }}
            size="xl"
            _hover={{ transform: "scale(1.1)" }}
            _active={{ transform: "scale(0.9)" }}
            transition="all 0.3s ease"
          >
            <m.div
              initial={false}
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              {isOpen ? <X size={28} strokeWidth={1.5} /> : <Menu size={28} strokeWidth={1.5} />}
            </m.div>
          </IconButton>
        </DrawerTrigger>
      </Box>

      <DrawerBackdrop backdropFilter="blur(12px)" />
      
      <DrawerContent bg="bg.page" p={0}>
        <DrawerBody display="flex" flexDirection="column" h="full" px="phi_lg" py="phi_xl">
          
          <VStack flex="1" justify="center" gap="phi_lg" opacity={isPending ? 0.6 : 1} transition="opacity 0.3s">
            <AnimatePresence>
              {NAV_ITEMS.map((item, index) => (
                <m.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  style={{ width: "100%" }}
                >
                  <NavItemLarge 
                    label={item.label} 
                    href={item.href} 
                    onClick={handleLinkClick} 
                  />
                </m.div>
              ))}
            </AnimatePresence>
          </VStack>

          <VStack gap="phi_md" w="full" mt="auto" pt="phi_lg" align="center">
            <Separator borderColor="border.glass" opacity={0.5} />
            
            <SimpleGrid columns={2} gapY="phi_md" gapX={8} w="full" px="phi_md">
              <UtilityLink label="Políticas" href="/politicas-empresa" icon={ShieldCheck} onClick={handleLinkClick} />
              <UtilityLink label="Cuentas" href="/cuentas-bancarias" icon={Landmark} onClick={handleLinkClick} />
              <UtilityLink 
                label="Libro" 
                href="/libro-de-reclamacion" 
                icon={LibroReclamacionesIcon} 
                onClick={handleLinkClick} 
                isImage 
              />
              <UtilityLink label="Inicio" href="/" icon={Home} onClick={handleLinkClick} />
            </SimpleGrid>

            {/* REDISEÑO: AURA ORBIT THEME TOGGLE (PERFECT CIRCLE) */}
            <Box pt="phi_lg" pb="phi_md">
              <ColorModeButton 
                variant="plain"
                p={0}
                w="64px"
                h="64px"
                borderRadius="full"
                bg="bg.glass"
                backdropFilter="blur(16px)"
                border="1px solid"
                borderColor="border.glass"
                boxShadow="glass"
                color="text.accent"
                display="flex"
                alignItems="center"
                justifyContent="center"
                _hover={{ 
                  transform: "scale(1.1) rotate(15deg)",
                  boxShadow: "0 0 20px {colors.primary.400}",
                  borderColor: "text.accent"
                }}
                _active={{ transform: "scale(0.95)" }}
                transition="all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
                css={{
                  "& svg": { width: "28px", height: "28px" }
                }}
              />
            </Box>
          </VStack>

        </DrawerBody>
        <DrawerCloseTrigger top="phi_md" right="phi_md" color="text.accent" visibility="hidden" />
      </DrawerContent>
    </DrawerRoot>
  );
});

MobileNav.displayName = "MobileNav";
export default MobileNav;
