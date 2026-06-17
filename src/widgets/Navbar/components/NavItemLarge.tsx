"use client";

import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import NavLink from "next/link";

export interface NavItemLargeProps {
    label: string;
    href: string;
    onClick: () => void;
}

export const NavItemLarge: React.FC<NavItemLargeProps> = ({ label, href, onClick }) => {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <NavLink
            href={href}
            onClick={onClick}
            style={{ textDecoration: "none", width: "100%", display: "block" }}
        >
            <Box position="relative" py={3} overflow="hidden" role="group">
                <Text
                    fontFamily="heading"
                    fontSize={{ base: "3xl", md: "4xl" }}
                    fontWeight={isActive ? "800" : "400"}
                    color={isActive ? "text.accent" : "text.heading"}
                    textTransform="uppercase"
                    letterSpacing="0.1em"
                    transition="color 0.25s cubic-bezier(0.4, 0, 0.2, 1)"
                    _groupHover={{ x: 10, color: "text.accent" }}
                >
                    {label}
                </Text>
                <Box
                    h="2px"
                    bg="text.accent"
                    mt="2"
                    transition="width 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                    w={isActive ? "60px" : "0"}
                />
            </Box>
        </NavLink>
    );
};
