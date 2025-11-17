import { useReclamoForm } from "../../hooks/use-reclamo-form";
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Select,
    Stack,
    Textarea,
    Heading,
    Text,
    SimpleGrid,
    InputGroup,
    InputLeftAddon,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useColorModeValue,
} from "@chakra-ui/react";
import { companyData } from "../../config/company-data";

// Componente principal del formulario
const ReclamoForm = () => {
    const {
        formData,
        errors,
        handleInputsChange,
        handleBtnSubmit,
        modalProps,
    } = useReclamoForm();

    const bgColor = useColorModeValue(
        "rgba(255, 255, 255, 0.25)",
        "rgba(0, 0, 0, 0.25)"
    );
    const borderColor = useColorModeValue(
        "rgba(255, 255, 255, 0.35)",
        "rgba(255, 255, 255, 0.15)"
    );
    const textColor = useColorModeValue("gray.800", "gray.100");
    const headingColor = useColorModeValue("gray.900", "white");

    const inputBg = useColorModeValue(
        "rgba(255, 255, 255, 0.4)",
        "rgba(0, 0, 0, 0.4)"
    );
    const inputBorder = useColorModeValue(
        "rgba(255, 255, 255, 0.5)",
        "rgba(0, 0, 0, 0.5)"
    );
    const placeholderColor = useColorModeValue("gray.500", "gray.400");

    const inputStyles = {
        bg: inputBg,
        borderColor: inputBorder,
        _placeholder: { color: placeholderColor },
        _hover: { borderColor: useColorModeValue("gray.400", "gray.500") },
        _focus: {
            borderColor: useColorModeValue("purple.500", "purple.300"),
            boxShadow: `0 0 0 1px ${useColorModeValue(
                "primary.500",
                "primary.300"
            )}`,
        },
    };

    const selectStyles = {
        ...inputStyles,
        option: {
            background: useColorModeValue("#FFFFFF", "#2D3748"), // white, gray.700
        },
    };

    return (
        <Box>
            <br />
            <Box
                p={{ base: 4, md: 8 }}
                maxW="3xl"
                mx="auto"
                mb={8} // Add bottom margin
                // Glassmorphism effects
                bg={bgColor}
                backdropFilter="blur(20px)"
                border="1px solid"
                borderColor={borderColor}
                boxShadow="0 4px 30px rgba(0,0,0,0.1)"
                borderRadius="2xl"
                color={textColor}
            >
                <Heading
                    as="h2"
                    size="lg"
                    mb={4}
                    textAlign="center"
                    color={headingColor}
                >
                    Libro de Reclamaciones Virtual
                </Heading>

                <Box
                    bg={inputBg}
                    rounded="md"
                    p={4}
                    mb={6}
                    borderWidth={1}
                    borderColor={borderColor}
                >
                    <Text fontWeight="bold">Razón Social:</Text>
                    <Text mb={2}>{companyData.razonSocial}</Text>
                    <Text fontWeight="bold">RUC:</Text>
                    <Text mb={2}>{companyData.ruc}</Text>
                    <Text fontWeight="bold">Dirección:</Text>
                    <Text>{companyData.direccion}</Text>
                </Box>

                <form onSubmit={handleBtnSubmit}>
                    <Stack spacing={5}>
                        <Heading
                            as="h3"
                            size="md"
                            borderBottomWidth={2}
                            pb={2}
                            color={headingColor}
                        >
                            1. Identificación del consumidor
                        </Heading>
                        <FormControl
                            isRequired
                            isInvalid={!!errors.nombreCompleto}
                        >
                            <FormLabel>Nombre Completo</FormLabel>
                            <Input
                                name="nombreCompleto"
                                value={formData.nombreCompleto}
                                onChange={handleInputsChange}
                                {...inputStyles}
                            />
                            <FormErrorMessage>
                                {errors.nombreCompleto}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl isRequired isInvalid={!!errors.domicilio}>
                            <FormLabel>Domicilio</FormLabel>
                            <Input
                                name="domicilio"
                                value={formData.domicilio}
                                onChange={handleInputsChange}
                                {...inputStyles}
                            />
                            <FormErrorMessage>
                                {errors.domicilio}
                            </FormErrorMessage>
                        </FormControl>
                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                            <FormControl isRequired isInvalid={!!errors.email}>
                                <FormLabel>Email</FormLabel>
                                <Input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputsChange}
                                    {...inputStyles}
                                />
                                <FormErrorMessage>
                                    {errors.email}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl
                                isRequired
                                isInvalid={!!errors.telefono}
                            >
                                <FormLabel>Teléfono</FormLabel>
                                <Input
                                    type="tel"
                                    name="telefono"
                                    value={formData.telefono}
                                    onChange={handleInputsChange}
                                    {...inputStyles}
                                />
                                <FormErrorMessage>
                                    {errors.telefono}
                                </FormErrorMessage>
                            </FormControl>
                        </SimpleGrid>
                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                            <FormControl
                                isRequired
                                isInvalid={!!errors.tipoDocumento}
                            >
                                <FormLabel>Tipo de Documento</FormLabel>
                                <Select
                                    name="tipoDocumento"
                                    value={formData.tipoDocumento}
                                    onChange={handleInputsChange}
                                    placeholder="Seleccionar"
                                    sx={selectStyles}
                                >
                                    <option value="DNI">DNI</option>
                                    <option value="CE">CE</option>
                                    <option value="PASAPORTE">PASAPORTE</option>
                                </Select>
                                <FormErrorMessage>
                                    {errors.tipoDocumento}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl
                                isRequired
                                isInvalid={!!errors.numeroDocumento}
                            >
                                <FormLabel>Nº de Documento</FormLabel>
                                <Input
                                    name="numeroDocumento"
                                    value={formData.numeroDocumento}
                                    onChange={handleInputsChange}
                                    {...inputStyles}
                                />
                                <FormErrorMessage>
                                    {errors.numeroDocumento}
                                </FormErrorMessage>
                            </FormControl>
                        </SimpleGrid>
                        <FormControl>
                            <FormLabel>
                                Padre, madre o tutor (si es menor de edad)
                            </FormLabel>
                            <Input
                                name="nombrePadreMadre"
                                value={formData.nombrePadreMadre}
                                onChange={handleInputsChange}
                                {...inputStyles}
                            />
                        </FormControl>

                        <Heading
                            as="h3"
                            size="md"
                            borderBottomWidth={2}
                            pb={2}
                            pt={4}
                            color={headingColor}
                        >
                            2. Identificación del bien contratado
                        </Heading>
                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                            <FormControl
                                isRequired
                                isInvalid={!!errors.tipoBien}
                            >
                                <FormLabel>Tipo de Bien</FormLabel>
                                <Select
                                    name="tipoBien"
                                    value={formData.tipoBien}
                                    onChange={handleInputsChange}
                                    placeholder="Seleccionar"
                                    sx={selectStyles}
                                >
                                    <option value="producto">Producto</option>
                                    <option value="servicio">Servicio</option>
                                </Select>
                                <FormErrorMessage>
                                    {errors.tipoBien}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Monto Reclamado (S/.)</FormLabel>
                                <InputGroup>
                                    <InputLeftAddon {...inputStyles}>
                                        S/.
                                    </InputLeftAddon>
                                    <Input
                                        type="number"
                                        name="montoReclamado"
                                        value={formData.montoReclamado}
                                        onChange={handleInputsChange}
                                        {...inputStyles}
                                    />
                                </InputGroup>
                            </FormControl>
                        </SimpleGrid>
                        <FormControl
                            isRequired
                            isInvalid={!!errors.descripcionBien}
                        >
                            <FormLabel>
                                Descripción del Producto o Servicio
                            </FormLabel>
                            <Textarea
                                name="descripcionBien"
                                value={formData.descripcionBien}
                                onChange={handleInputsChange}
                                {...inputStyles}
                            />
                            <FormErrorMessage>
                                {errors.descripcionBien}
                            </FormErrorMessage>
                        </FormControl>

                        <Heading
                            as="h3"
                            size="md"
                            borderBottomWidth={2}
                            pb={2}
                            pt={4}
                            color={headingColor}
                        >
                            3. Detalle de su solicitud
                        </Heading>
                        <FormControl
                            isRequired
                            isInvalid={!!errors.tipoSolicitud}
                        >
                            <FormLabel>Tipo de Solicitud</FormLabel>
                            <Select
                                name="tipoSolicitud"
                                value={formData.tipoSolicitud}
                                onChange={handleInputsChange}
                                placeholder="Seleccionar"
                                sx={selectStyles}
                            >
                                <option value="Reclamo">
                                    Reclamo: Disconformidad con el producto o
                                    servicio.
                                </option>
                                <option value="Queja">
                                    Queja: Malestar respecto a la atención.
                                </option>
                            </Select>
                            <FormErrorMessage>
                                {errors.tipoSolicitud}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl isRequired isInvalid={!!errors.detalle}>
                            <FormLabel>Detalle de la Solicitud</FormLabel>
                            <Textarea
                                name="detalle"
                                value={formData.detalle}
                                onChange={handleInputsChange}
                                placeholder="Describa aquí qué sucedió..."
                                {...inputStyles}
                            />
                            <FormErrorMessage>
                                {errors.detalle}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl isRequired isInvalid={!!errors.pedido}>
                            <FormLabel>Pedido del Consumidor</FormLabel>
                            <Textarea
                                name="pedido"
                                value={formData.pedido}
                                onChange={handleInputsChange}
                                placeholder="Ej: Devolución del dinero, cambio del producto, etc."
                                {...inputStyles}
                            />
                            <FormErrorMessage>{errors.pedido}</FormErrorMessage>
                        </FormControl>

                        <Heading
                            as="h3"
                            size="md"
                            borderBottomWidth={2}
                            pb={2}
                            pt={4}
                            color={headingColor}
                        >
                            4. Declaración y Envío
                        </Heading>
                        <Text
                            fontSize="sm"
                            color={useColorModeValue("gray.600", "gray.300")}
                        >
                            * La respuesta a la presente será remitida al correo
                            electrónico consignado en un plazo no mayor a 15
                            días hábiles, según el D.S. N° 006-2014-PCM.
                        </Text>
                        <FormControl
                            isRequired
                            isInvalid={!!errors.aceptaTerminos}
                        >
                            <Checkbox
                                name="aceptaTerminos"
                                isChecked={formData.aceptaTerminos}
                                onChange={handleInputsChange}
                            >
                                Declaro que la información proporcionada es
                                veraz y acepto la Política de Privacidad y
                                Protección de Datos.
                            </Checkbox>
                            <FormErrorMessage>
                                {errors.aceptaTerminos}
                            </FormErrorMessage>
                        </FormControl>

                        <Button
                            type="submit"
                            colorScheme="primary"
                            size="lg"
                            width="full"
                        >
                            Enviar Reclamo/Queja
                        </Button>
                    </Stack>
                </form>

                <Modal
                    isOpen={modalProps.isOpen}
                    onClose={modalProps.onClose}
                    isCentered
                >
                    <ModalOverlay backdropFilter="blur(20px)" />
                    <ModalContent
                        bg={bgColor}
                        backdropFilter="blur(20px)"
                        border="1px solid"
                        borderColor={borderColor}
                        boxShadow="0 4px 30px rgba(0,0,0,0.1)"
                        borderRadius="2xl"
                        color={textColor}
                    >
                        <ModalHeader>¡Reclamo enviado con éxito!</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Text>
                                Su número de seguimiento es:{" "}
                                <Text as="span" fontWeight="bold">
                                    {modalProps.newReclamoId}
                                </Text>
                                .
                            </Text>
                            <Text mt={2}>
                                Se ha enviado una copia de la confirmación a su
                                correo electrónico.
                            </Text>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                colorScheme="primary"
                                onClick={modalProps.onClose}
                            >
                                Aceptar
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Box>
        </Box>
    );
};

export default ReclamoForm;
