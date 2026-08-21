"use client";

import React from "react";
import { HStack } from "@chakra-ui/react";
import RouterLink from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import NAV_ITEMS from "@/shared/config/nav-items";

/**
 * @component AuraDesktopNav
 * @description Barra de navegación de escritorio estilo píldora/chip ultra-fluida,
 * basada en el patrón de SystemSelector con soporte completo para SSR y routing de Next.js.
 */
const AuraDesktopNav: React.FC = () => {
  const pathname = usePathname();
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Auto-scroll centrado suave si la pantalla es más angosta
  React.useEffect(() => {
    if (!containerRef.current) return;
    const activeBtn = containerRef.current.querySelector<HTMLElement>('[data-active="true"]');
    activeBtn?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [pathname]);

  return (
    <HStack
      ref={containerRef}
      as="nav"
      aria-label="Navegación principal"
      bg="bg.subtle"
      p="2"
      borderRadius="full"
      display="inline-flex"
      borderWidth="1px"
      borderColor="border.default"
      boxShadow="0 8px 32px 0 rgba(0, 0, 0, 0.08)"
      maxW="full"
      overflowX="auto"
      gap="1.5"
      css={{
        "&::-webkit-scrollbar": { display: "none" },
        scrollbarWidth: "none",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
        return (
          <Button
            key={item.label}
            asChild
            data-active={isActive ? "true" : "false"}
            size={{ base: "sm", md: "md" }}
            variant={isActive ? "aura" : "ghost"}
            borderRadius="full"
            px={{ base: "4", xl: "6" }}
            flexShrink={0}
            fontWeight={isActive ? "bold" : "medium"}
            letterSpacing="0.05em"
            transition="all 0.2s ease"
            _hover={{
              transform: isActive ? "none" : "translateY(-1px)",
            }}
          >
            <RouterLink href={item.href || "#"} aria-current={isActive ? "page" : undefined}>
              {item.label}
            </RouterLink>
          </Button>
        );
      })}
    </HStack>
  );
};

export default AuraDesktopNav;
