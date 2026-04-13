"use client";

import React from "react";
import {
  Box,
  Text,
} from "@chakra-ui/react";
import ResponsiveImage from "@shared/components/Image/ResponsiveImage";

export interface ClientCardProps {
  image: string;
  nameClient: string;
  descClient: string;
}

const ClientCard = React.memo(({ image, nameClient, descClient }: ClientCardProps) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const bgOverlay =
    "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)";

    return (
      <Box
        as="article"
        role="group"
        position="relative"
        h={{ base: "320px", md: "500px" }}
        borderRadius="xl"
        overflow="hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        _hover={{
          boxShadow: { md: "2xl" },
        }}
        transition="box-shadow 0.4s ease"
      >
        <Box
          style={{ height: "100%" }}
          position="relative"
          h="full"
          w="full"
          overflow="hidden"
        >
          <ResponsiveImage
            src={image}
            alt={nameClient}
            objectFit="cover"
            w="100%"
            h="100%"
            loading="eager"
            decoding="async"
            transform="scale(1.02)"
            transition="transform 0.6s ease"
            _groupHover={{ transform: "scale(1.06)" }}
          />

            <Box position="absolute" inset="0" bgGradient={bgOverlay} />

            <Box
              position="absolute"
              bottom={0}
              left={0}
              right={0}
              p={6}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="flex-end"
            >
               <Text
                 color={isHovered ? "primary.300" : "white"}
                 fontSize={{ base: "md", md: "xl" }}
                 fontWeight="600"
                 textTransform="uppercase"
                 letterSpacing="wider"
                 textAlign="center"
                 position="relative"
                 transition="color 0.3s ease"
                 _after={{
                   content: '""',
                   position: "absolute",
                   bottom: "-8px",
                   left: "50%",
                   transform: "translateX(-50%)",
                   width: "40px",
                   height: "2px",
                   bg: isHovered ? "primary.300" : "white",
                   transition: "width 0.4s ease, background 0.3s ease",
                 }}
                 >
                   {nameClient}
                 </Text>

              <Text
                color="whiteAlpha.900"
                fontSize="xs"
                fontWeight="medium"
                textAlign="center"
                mt={4}
                opacity={isHovered ? 1 : 0}
                transition="opacity 0.3s ease"
              >
                {descClient}
              </Text>
            </Box>
        </Box>
    </Box>
  );
});

ClientCard.displayName = "ClientCard";

export default ClientCard;
