import {
    Box,
    Card,
    CardBody,
    CardHeader,
    Container,
    Heading,
    Stack,
    StackDivider,
    Text,
} from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router-dom";
import LandPage from "../components/HomePage/LandPage";
import Clients from "../components/HomePage/Clients";
import Feature from "../components/HomePage/Feature";
import Tienda from "../components/HomePage/Tienda";

const ServiceView = () => {
    return (
        <div>
            <Card>
                <CardHeader>
                    <Heading size="md">Client Report</Heading>
                </CardHeader>

                <CardBody>
                    <Stack divider={<StackDivider />} spacing="4">
                        <Box>
                            <Heading size="xs" textTransform="uppercase">
                                Summary
                            </Heading>
                            <Text pt="2" fontSize="sm">
                                View a summary of all your clients over the last
                                month.
                            </Text>
                        </Box>
                        <Box>
                            <Heading size="xs" textTransform="uppercase">
                                Overview
                            </Heading>
                            <Text pt="2" fontSize="sm">
                                Check out the overview of your clients.
                            </Text>
                        </Box>
                        <Box>
                            <Heading size="xs" textTransform="uppercase">
                                Analysis
                            </Heading>
                            <Text pt="2" fontSize="sm">
                                See a detailed analysis of all your business
                                clients.
                            </Text>
                        </Box>
                    </Stack>
                </CardBody>
            </Card>
            <Card>
                <CardHeader>
                    <Heading size="md">Client Report</Heading>
                </CardHeader>

                <CardBody>
                    <Stack divider={<StackDivider />} spacing="4">
                        <Box>
                            <Heading size="xs" textTransform="uppercase">
                                Summary
                            </Heading>
                            <Text pt="2" fontSize="sm">
                                View a summary of all your clients over the last
                                month.
                            </Text>
                        </Box>
                        <Box>
                            <Heading size="xs" textTransform="uppercase">
                                Overview
                            </Heading>
                            <Text pt="2" fontSize="sm">
                                Check out the overview of your clients.
                            </Text>
                        </Box>
                        <Box>
                            <Heading size="xs" textTransform="uppercase">
                                Analysis
                            </Heading>
                            <Text pt="2" fontSize="sm">
                                See a detailed analysis of all your business
                                clients.
                            </Text>
                        </Box>
                    </Stack>
                </CardBody>
            </Card>
            <Card>
                <CardHeader>
                    <Heading size="md">Client Report</Heading>
                </CardHeader>

                <CardBody>
                    <Stack divider={<StackDivider />} spacing="4">
                        <Box>
                            <Heading size="xs" textTransform="uppercase">
                                Summary
                            </Heading>
                            <Text pt="2" fontSize="sm">
                                View a summary of all your clients over the last
                                month.
                            </Text>
                        </Box>
                        <Box>
                            <Heading size="xs" textTransform="uppercase">
                                Overview
                            </Heading>
                            <Text pt="2" fontSize="sm">
                                Check out the overview of your clients.
                            </Text>
                        </Box>
                        <Box>
                            <Heading size="xs" textTransform="uppercase">
                                Analysis
                            </Heading>
                            <Text pt="2" fontSize="sm">
                                See a detailed analysis of all your business
                                clients.
                            </Text>
                        </Box>
                    </Stack>
                </CardBody>
            </Card>
            <Card>
                <CardHeader>
                    <Heading size="md">Client Report</Heading>
                </CardHeader>

                <CardBody>
                    <Stack divider={<StackDivider />} spacing="4">
                        <Box>
                            <Heading size="xs" textTransform="uppercase">
                                Summary
                            </Heading>
                            <Text pt="2" fontSize="sm">
                                View a summary of all your clients over the last
                                month.
                            </Text>
                        </Box>
                        <Box>
                            <Heading size="xs" textTransform="uppercase">
                                Overview
                            </Heading>
                            <Text pt="2" fontSize="sm">
                                Check out the overview of your clients.
                            </Text>
                        </Box>
                        <Box>
                            <Heading size="xs" textTransform="uppercase">
                                Analysis
                            </Heading>
                            <Text pt="2" fontSize="sm">
                                See a detailed analysis of all your business
                                clients.
                            </Text>
                        </Box>
                    </Stack>
                </CardBody>
            </Card>
            <Card>
                <CardHeader>
                    <Heading size="md">Client Report</Heading>
                </CardHeader>

                <CardBody>
                    <Stack divider={<StackDivider />} spacing="4">
                        <Box>
                            <Heading size="xs" textTransform="uppercase">
                                Summary
                            </Heading>
                            <Text pt="2" fontSize="sm">
                                View a summary of all your clients over the last
                                month.
                            </Text>
                        </Box>
                        <Box>
                            <Heading size="xs" textTransform="uppercase">
                                Overview
                            </Heading>
                            <Text pt="2" fontSize="sm">
                                Check out the overview of your clients.
                            </Text>
                        </Box>
                        <Box>
                            <Heading size="xs" textTransform="uppercase">
                                Analysis
                            </Heading>
                            <Text pt="2" fontSize="sm">
                                See a detailed analysis of all your business
                                clients.
                            </Text>
                        </Box>
                    </Stack>
                </CardBody>
            </Card>
        </div>
    );
};

export default ServiceView;
