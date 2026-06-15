"use client";

/**
 * @file AuraDesktopNav.tsx
 * @description Official high-end desktop navigation with fluid pill indicator.
 * Optimized for GYA Glass & Aluminum's minimalist aesthetic.
 */
import React from "react";
import { HStack, Box, Text, IconButton, Separator } from "@chakra-ui/react";
import RouterLink from "next/link";
import { usePathname } from "next/navigation";
import { Sun, Moon } from "lucide-react";
import NAV_ITEMS from "@/shared/config/nav-items";
import { useColorModeValue, useColorMode } from "@/components/ui/color-mode-hooks";

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
      transition="color 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
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
  const { colorMode, toggleColorMode } = useColorMode();
  const separatorColor = useColorModeValue("blackAlpha.300", "whiteAlpha.300");
  const toggleHoverBg = useColorModeValue("blackAlpha.100", "whiteAlpha.200");

  // Sincronización con el cliente para evitar Hydration Mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);
  
  // Design Tokens adaptativos con identidad de marca (GYA Red Edition - Logo #FF5A5F)
  const activeBg = useColorModeValue(
    "linear-gradient(135deg, #FF5A5F 0%, #E0484D 100%)", 
    "linear-gradient(135deg, #FF5A5F 0%, #D9444A 100%)"
  );
  const activeColor = "white";
  const inactiveColor = useColorModeValue("gray.800", "whiteAlpha.900");
  
  const navBg = useColorModeValue("rgba(255, 255, 255, 0.45)", "rgba(10, 10, 12, 0.45)");
  const navBorderColor = useColorModeValue("rgba(0,0,0,0.12)", "rgba(255,255,255,0.08)");
  const navShadow = useColorModeValue("0 8px 32px 0 rgba(0, 0, 0, 0.08)", "0 25px 60px rgba(0,0,0,0.6)");
  const indicatorShadow = useColorModeValue(
    "0 10px 25px rgba(255, 90, 95, 0.35)", 
    "0 0 35px rgba(255, 90, 95, 0.35)"
  );

  // No renderizar estilos dependientes del tema en el servidor
  if (!mounted) return null;

  return (
    <Box
      as="nav"
      css={{
        backgroundColor: navBg,
        backdropFilter: "blur(40px) saturate(210%)",
        WebkitBackdropFilter: "blur(40px) saturate(210%)",
        borderRadius: "100px",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: navBorderColor,
        padding: "var(--chakra-spacing-2)",
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
                  paddingLeft: "20px",
                  paddingRight: "20px",
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
                <Box
                  position="absolute"
                  inset={0}
                  background={activeBg}
                  borderRadius="full"
                  zIndex={1}
                  boxShadow={indicatorShadow}
                  border="1px solid"
                  borderColor="whiteAlpha.200"
                  transition="background 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
                />
              )}
            </Box>
          );
        })}
      </HStack>

      <Separator
        orientation="vertical"
        height="28px"
        borderColor={separatorColor}
      />

      <IconButton
        variant="ghost"
        aria-label="Toggle color mode"
        onClick={toggleColorMode}
        size="sm"
        borderRadius="full"
        color={colorMode === "dark" ? "yellow.300" : "purple.600"}
        bg={colorMode === "dark" ? "whiteAlpha.200" : "blackAlpha.100"}
        _hover={{ bg: toggleHoverBg }}
        mr="3"
      >
        {colorMode === "dark" ? <Sun size={18} /> : <Moon size={18} />}
      </IconButton>
    </Box>
  );
};

export default AuraDesktopNav;
