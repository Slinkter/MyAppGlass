import {
  Box,
  Button,
  Center,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

const ClientsCard = ({ IMAGE }) => {
  return (
    <Box
      role={"group"}
      p={6}
      w={"full"}
      boxShadow={"2xl"}
      border={"2px solid "}
      borderColor={"gray.700"}
      bg={useColorModeValue("white", "gray.800")}
      rounded={"lg"}
      pos={"relative"}
      zIndex={1}
      maxW={{ base: "full", md: "375px" }}
      mb={6}
    >
      <Box
        maxW={{ base: "full", md: "375px" }}
        w={"full"}
        p={5}
        rounded={"lg"}
        mt={-12}
        pos={"relative"}
        height={280}
        _after={{
          transition: "all .3s ease",
          content: '""',
          w: "full",
          h: "full",
          pos: "absolute",
          top: 5,
          left: 0,
          backgroundImage: `url(${IMAGE})`,
          filter: "blur(15px)",
          zIndex: -1,
        }}
        _groupHover={{
          _after: {
            filter: "blur(20px)",
          },
        }}
      >
        <Image
          rounded={"lg"}
          height={280}
          width={282}
          objectFit={"cover"}
          src={IMAGE}
          alt="#"
        />
      </Box>
      <Stack pt={10} align={"center"}>
        <Stack pt={10} align={"center"}>
          <Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={500}>
            Cliente
          </Heading>
          <Stack direction={"row"} align={"center"}>
            <Text
              color={"gray.500"}
              fontSize={"sm"}
              textTransform={"uppercase"}
            >
              title
            </Text>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default ClientsCard;
