"use client";

/**
 * @file AuraDesktopNav.tsx
 * @description Official high-end desktop navigation with Super Glass effects and fluid pill indicator.
 * Optimized for GYA Glass & Aluminum's minimalist aesthetic.
 */
import React from "react";
import { HStack, Box, Text } from "@chakra-ui/react";
import RouterLink from "next/link";
import { usePathname } from "next/navigation";
import { m } from "framer-motion";
import NAV_ITEMS from "@/data/nav-items";
import { useColorModeValue } from "@/components/ui/color-mode-hooks";

const MotionBox = m.create(Box);

/**
 * @component NavText
 * @description Encapsula el estilo tipográfico premium para los links.
 */
const NavText = ({ children, isActive, activeColor, inactiveColor }: { 
  children: React.ReactNode, 
  isActive: boolean, 
  activeColor: string, 
  inactiveColor: string 
}) => {
  const activeShadow = useColorModeValue("0 0 1px rgba(255,255,255,0.4)", "0 0 1px rgba(0,0,0,0.8)");
  
  return (
    <Text
      fontSize="xs"
      fontWeight={isActive ? "900" : "600"}
      letterSpacing="0.25em"
      textTransform="uppercase"
      color={isActive ? activeColor : inactiveColor}
      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
      zIndex={2}
      position="relative"
      textShadow={isActive ? activeShadow : "none"}
      style={{ WebkitFontSmoothing: "antialiased" }}
    >
      {children}
    </Text>
  );
};

const AuraDesktopNav = () => {
  const [mounted, setMounted] = React.useState(false);
  const pathname = usePathname();

  // Sincronización con el cliente para evitar Hydration Mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);
  
  // Design Tokens adaptativos con identidad de marca (GYA Red Edition - Optimized)
  const activeBg = useColorModeValue(
    "linear-gradient(135deg, #a80100 0%, #800000 100%)", 
    "linear-gradient(135deg, #cc0202 0%, #a80100 100%)"
  );
  const activeColor = "white";
  const inactiveColor = useColorModeValue("gray.800", "whiteAlpha.900");
  
  const navBg = useColorModeValue("rgba(255, 255, 255, 0.45)", "rgba(10, 10, 12, 0.45)");
  const navBorderColor = useColorModeValue("rgba(0,0,0,0.12)", "rgba(255,255,255,0.08)");
  const navShadow = useColorModeValue("glass", "0 25px 60px rgba(0,0,0,0.6)");
  const indicatorShadow = useColorModeValue(
    "0 10px 25px rgba(128, 0, 0, 0.35)", 
    "0 0 35px rgba(204, 2, 2, 0.35)"
  );

  // No renderizar estilos dependientes del tema en el servidor
  if (!mounted) return null;

  return (
    <m.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      style={{
        backgroundColor: navBg,
        backdropFilter: "blur(40px) saturate(210%)",
        WebkitBackdropFilter: "blur(40px) saturate(210%)",
        borderRadius: "100px",
        border: "1px solid",
        borderColor: navBorderColor,
        padding: "var(--chakra-spacing-phi_xs)",
        display: "flex",
        alignItems: "center",
        gap: "4px",
        boxShadow: navShadow
      }}
    >
      {/* Navigation Items (Liquid Design) */}
      <HStack gap={1} position="relative">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Box key={item.label} position="relative">
              <Box
                as={RouterLink}
                {...({ href: item.href || "#" } as Record<string, unknown>)}
                aria-current={isActive ? "page" : undefined}
                style={{
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "140px",
                  height: "46px",
                  borderRadius: "9999px",
                  backgroundColor: !isActive ? "transparent" : "transparent",
                  position: "relative",
                  zIndex: 2,
                  transition: "background-color 0.2s"
                }}
              >
                <NavText 
                  isActive={isActive} 
                  activeColor={activeColor} 
                  inactiveColor={inactiveColor}
                >
                  {item.label}
                </NavText>
              </Box>
              
              {isActive && (
                <MotionBox
                  layoutId="aura-active-link-pill"
                  position="absolute"
                  inset={0}
                  background={activeBg}
                  borderRadius="full"
                  zIndex={1}
                  boxShadow={indicatorShadow}
                  border="1px solid"
                  borderColor="whiteAlpha.200"
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30
                  }}
                />
              )}
            </Box>
          );
        })}
      </HStack>
    </m.nav>
  );
};

export default AuraDesktopNav;
