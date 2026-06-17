"use client";

import React from "react";
import { Box, HStack, Text } from "@chakra-ui/react";
import { LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import NavLink from "next/link";

export interface UtilityLinkProps {
    label: string;
    href: string;
    icon: LucideIcon | string;
    onClick: () => void;
    isImage?: boolean;
}

export const UtilityLink: React.FC<UtilityLinkProps> = ({
    label,
    href,
    icon: Icon,
    onClick,
    isImage,
}) => {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <NavLink
            href={href}
            onClick={onClick}
            style={{ textDecoration: "none" }}
        >
            <HStack
                gap={3}
                color={isActive ? "text.accent" : "text.muted"}
                _hover={{ color: "text.accent", x: 4 }}
                transition="color 0.2s ease"
            >
                {isImage ? (
                    <img
                        src={Icon as string}
                        alt={label}
                        width={20}
                        height={20}
                        style={{ opacity: isActive ? 1 : 0.7 }}
                    />
                ) : (
                    <Box
                        as={Icon as LucideIcon}
                        boxSize={5}
                        opacity={isActive ? 1 : 0.7}
                    />
                )}
                <Text
                    fontSize="sm"
                    fontWeight={isActive ? "700" : "500"}
                    textTransform="uppercase"
                    letterSpacing="0.1em"
                >
                    {label}
                </Text>
            </HStack>
        </NavLink>
    );
};
