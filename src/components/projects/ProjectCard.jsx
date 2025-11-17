import { ArrowForwardIcon } from "@chakra-ui/icons";
import { MapPinIcon, CalendarDaysIcon } from "@heroicons/react/24/solid";
import {
    Box, // Changed from Card
    Button,
    Flex,
    Heading,
    Stack,
    Text,
    useColorModeValue,
    useDisclosure,
    Icon,
} from "@chakra-ui/react";
import FadingImage from "../common/FadingImage";
import ProjectDetailModal from "./ProjectDetailModal";
import React from "react";

/**
 * @component ProjectCard
 * @description Renders a card for a project, displaying its image, residential name,
 * address, and year. Clicking a button on the card opens a detailed modal
 * with more information and a map.
 *
 * @param {{
 *   image: string,
 *   residencial: string,
 *   address: string,
 *   year: string,
 *   g_maps: string,
 *   name: string,
 * }} props - Props for the component.
 * @returns {JSX.Element} The rendered project card.
 */
const ProjectCard = React.memo((props) => {
    const { image, residencial, address, year, g_maps, name } = props;
    const { isOpen, onOpen: onOpenModal, onClose } = useDisclosure();

    const bgColor = useColorModeValue(
        "rgba(255, 255, 255, 0.1)",
        "rgba(0, 0, 0, 0.1)"
    ); // More subtle background
    const textColor = useColorModeValue("gray.800", "gray.100");
    const iconColor = useColorModeValue("gray.500", "gray.400");
    const headingColor = useColorModeValue("primary.700", "primary.300");
    const buttonBg = useColorModeValue(
        "rgba(255, 255, 255, 0.4)",
        "rgba(0, 0, 0, 0.4)"
    );
    const buttonHoverBg = useColorModeValue(
        "rgba(255, 255, 255, 0.6)",
        "rgba(0, 0, 0, 0.6)"
    );

    return (
        <>
            <Box
                w="full"
                maxW={{ base: "full", md: "md" }}
                h={{ base: "auto", md: "auto" }}
                mb={4}
                p={{ base: 2, md: 2 }}
                overflow="hidden"
                // GlassItemCard effects (GlassSection rules)
                bg={bgColor}
                backdropFilter="blur(10px)" // Suave blur
                border="none" // SIN borde
                boxShadow="md" // SIN shadow
                borderRadius="2xl"
                color={textColor}
                transition="all 0.3s ease"
                _hover={{
                    transform: "scale(1.02)",
                    boxShadow: "0 8px 40px rgba(0,0,0,0.2)",
                }}
            >
                <Box textAlign="center" p={4}>
                    {" "}
                    {/* Replaced CardBody with Box and added padding */}
                    <FadingImage
                        w="full"
                        h={{ base: "320px", md: "325px" }}
                        src={image}
                        alt={`Obra ${residencial}`}
                        rounded="lg"
                        objectFit="cover"
                        boxShadow="base"
                    />
                    <Stack mt={4} spacing={2}>
                        <Flex
                            direction="column"
                            textAlign="left"
                            justifyContent="center"
                            gap={2}
                        >
                            <Heading
                                size="md"
                                textTransform="uppercase"
                                color={headingColor}
                            >
                                {residencial}
                            </Heading>
                        </Flex>
                        <Flex alignItems="center">
                            <Icon
                                as={MapPinIcon}
                                w={5}
                                h={5}
                                mr={2}
                                color={iconColor}
                            />
                            <Text fontSize="sm">{address}</Text>
                        </Flex>
                        <Flex alignItems="center">
                            <Icon
                                as={CalendarDaysIcon}
                                w={5}
                                h={5}
                                mr={2}
                                color={iconColor}
                            />
                            <Text fontSize="sm">{year}</Text>
                        </Flex>

                        <Button
                            onClick={onOpenModal}
                            rightIcon={<ArrowForwardIcon />}
                            variant="solid"
                            mt={1}
                            bg={buttonBg}
                            color={textColor}
                            _hover={{ bg: buttonHoverBg }}
                        >
                            Ver en Google Maps
                        </Button>
                    </Stack>
                </Box>
            </Box>

            <ProjectDetailModal
                isOpen={isOpen}
                onClose={onClose}
                residencial={residencial}
                name={name}
                address={address}
                year={year}
                g_maps={g_maps}
            />
        </>
    );
});

ProjectCard.displayName = "ProjectCard";
export default ProjectCard;
