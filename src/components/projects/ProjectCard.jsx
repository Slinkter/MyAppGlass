import { ArrowForwardIcon } from "@chakra-ui/icons";
import { MapPinIcon, CalendarDaysIcon } from "@heroicons/react/24/solid";
import {
    Card,
    CardBody,
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
import ProjectDetailModal from "./ProjectDetailModal"; // Import the new modal component
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
 * @param {string} props.image - URL of the project image.
 * @param {string} props.residencial - Name of the residential project.
 * @param {string} props.address - Address/district of the project.
 * @param {string} props.year - Year the project was completed.
 * @param {string} props.g_maps - Google Maps query string for the project location.
 * @param {string} props.name - Name of the construction company.
 * @returns {JSX.Element} The rendered project card.
 */
const ProjectCard = React.memo((props) => {
    const { image, residencial, address, year, g_maps, name } = props;
    const { isOpen, onOpen: onOpenModal, onClose } = useDisclosure();

    const bg = useColorModeValue("gray.200", "gray.700");

    const handleOpenModal = () => {
        // No need to manage isMapLoaded here, it's handled inside ProjectDetailModal
        onOpenModal();
    };

    return (
        <>
            <Card
                w="375px"
                maxW={{ base: "full", md: "375px" }}
                mb={4}
                boxShadow={"md"}
                rounded="xl"
                bg={bg}
                overflow="hidden"
                _hover={{
                    boxShadow: "lg",
                    borderColor: "primary.300",
                    transform: {
                        base: "",
                        md: "scale(1.02)",
                    },
                }}
            >
                <CardBody textAlign="center">
                    <FadingImage
                        w="full"
                        h={{ base: "320px", md: "325px" }}
                        src={image}
                        alt={`Obra ${residencial}`}
                        borderRadius="lg"
                        objectFit="cover"
                        boxShadow={"base"}
                    />

                    <Stack mt="4" spacing="2">
                        <Flex
                            direction={"column"}
                            textAlign={"left"}
                            justifyContent={"center"}
                            gap={2}
                        >
                            <Heading
                                size="md"
                                textTransform={"uppercase"}
                                color="primary.500"
                            >
                                {residencial}
                            </Heading>
                        </Flex>
                        <Flex alignItems={"center"}>
                            <Icon
                                as={MapPinIcon}
                                w={5}
                                h={5}
                                mr={2}
                                color="gray.500"
                            />
                            <Text fontSize="sm">{address}</Text>
                        </Flex>
                        <Flex alignItems={"center"}>
                            <Icon
                                as={CalendarDaysIcon}
                                w={5}
                                h={5}
                                mr={2}
                                color="gray.500"
                            />
                            <Text fontSize="sm">{year}</Text>
                        </Flex>

                        <Button
                            onClick={handleOpenModal}
                            rightIcon={<ArrowForwardIcon />}
                            colorScheme="primary"
                            variant="solid"
                            mt={1}
                        >
                            Ver en Google Maps
                        </Button>
                    </Stack>
                </CardBody>
            </Card>

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
