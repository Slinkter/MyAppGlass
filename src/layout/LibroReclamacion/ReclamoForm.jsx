import { useReclamoForm } from "../../hooks/useReclamoForm";
import {
    Box,
    Button,
    Checkbox,
    FormControl,
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
} from "@chakra-ui/react";

// Componente principal del formulario
const ReclamoForm = () => {
    const {
        formData,
        handleInputsChange,
        handleBtnSubmit,
        modalProps,
    } = useReclamoForm();

    return (
        <Box
            p={{ base: 4, md: 8 }}
            maxW="800px"
            mx="auto"
            borderWidth={1}
            borderRadius="lg"
            boxShadow="lg"
        >
            <Heading as="h2" size="lg" mb={4} textAlign="center">
                Libro de Reclamaciones Virtual
            </Heading>

            {/* Sección con datos del proveedor (obligatorio) */}
            <Box p={4} borderRadius="md" mb={6}>
                <Text fontWeight="bold">Razón Social:</Text>
                <Text mb={2}>GLASS & ALUMINUM COMPANY S.A.C.</Text>{" "}
                {/* <-- REEMPLAZA CON TUS DATOS */}
                <Text fontWeight="bold">RUC:</Text>
                <Text mb={2}>20606432870</Text>{" "}
                {/* <-- REEMPLAZA CON TUS DATOS */}
                <Text fontWeight="bold">Dirección:</Text>
                <Text>Av.Los Fresnos MZ H Lt.16 - La Molina</Text>{" "}
                {/* <-- REEMPLAZA CON TUS DATOS */}
            </Box>

            <form onSubmit={handleBtnSubmit}>
                <Stack spacing={5}>
                    {/* --- Sección 1: Identificación del Consumidor --- */}
                    <Heading as="h3" size="md" borderBottomWidth={2} pb={2}>
                        1. Identificación del consumidor
                    </Heading>
                    <FormControl isRequired>
                        <FormLabel>Nombre Completo</FormLabel>
                        <Input
                            name="nombreCompleto"
                            value={formData.nombreCompleto}
                            onChange={handleInputsChange}
                        />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Domicilio</FormLabel>
                        <Input
                            name="domicilio"
                            value={formData.domicilio}
                            onChange={handleInputsChange}
                        />
                    </FormControl>
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                        <FormControl isRequired>
                            <FormLabel>Email</FormLabel>
                            <Input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputsChange}
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Teléfono</FormLabel>
                            <Input
                                type="tel"
                                name="telefono"
                                value={formData.telefono}
                                onChange={handleInputsChange}
                            />
                        </FormControl>
                    </SimpleGrid>
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                        <FormControl isRequired>
                            <FormLabel>Tipo de Documento</FormLabel>
                            <Select
                                name="tipoDocumento"
                                value={formData.tipoDocumento}
                                onChange={handleInputsChange}
                                placeholder="Seleccionar"
                            >
                                <option value="DNI">DNI</option>
                                <option value="CE">CE</option>
                                <option value="PASAPORTE">PASAPORTE</option>
                            </Select>
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Nº de Documento</FormLabel>
                            <Input
                                name="numeroDocumento"
                                value={formData.numeroDocumento}
                                onChange={handleInputsChange}
                            />
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
                        />
                    </FormControl>

                    {/* --- Sección 2: Identificación del bien contratado --- */}
                    <Heading
                        as="h3"
                        size="md"
                        borderBottomWidth={2}
                        pb={2}
                        pt={4}
                    >
                        2. Identificación del bien contratado
                    </Heading>
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                        <FormControl isRequired>
                            <FormLabel>Tipo de Bien</FormLabel>
                            <Select
                                name="tipoBien"
                                value={formData.tipoBien}
                                onChange={handleInputsChange}
                                placeholder="Seleccionar"
                            >
                                <option value="producto">Producto</option>
                                <option value="servicio">Servicio</option>
                            </Select>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Monto Reclamado (S/.)</FormLabel>
                            <InputGroup>
                                <InputLeftAddon>S/.</InputLeftAddon>
                                <Input
                                    type="number"
                                    name="montoReclamado"
                                    value={formData.montoReclamado}
                                    onChange={handleInputsChange}
                                />
                            </InputGroup>
                        </FormControl>
                    </SimpleGrid>
                    <FormControl isRequired>
                        <FormLabel>
                            Descripción del Producto o Servicio
                        </FormLabel>
                        <Textarea
                            name="descripcionBien"
                            value={formData.descripcionBien}
                            onChange={handleInputsChange}
                        />
                    </FormControl>

                    {/* --- Sección 3: Detalle de la Reclamación --- */}
                    <Heading
                        as="h3"
                        size="md"
                        borderBottomWidth={2}
                        pb={2}
                        pt={4}
                    >
                        3. Detalle de su solicitud
                    </Heading>
                    <FormControl isRequired>
                        <FormLabel>Tipo de Solicitud</FormLabel>
                        <Select
                            name="tipoSolicitud"
                            value={formData.tipoSolicitud}
                            onChange={handleInputsChange}
                            placeholder="Seleccionar"
                        >
                            <option value="Reclamo">
                                Reclamo: Disconformidad con el producto o
                                servicio.
                            </option>
                            <option value="Queja">
                                Queja: Malestar respecto a la atención.
                            </option>
                        </Select>
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Detalle de la Solicitud</FormLabel>
                        <Textarea
                            name="detalle"
                            value={formData.detalle}
                            onChange={handleInputsChange}
                            placeholder="Describa aquí qué sucedió..."
                        />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Pedido del Consumidor</FormLabel>
                        <Textarea
                            name="pedido"
                            value={formData.pedido}
                            onChange={handleInputsChange}
                            placeholder="Ej: Devolución del dinero, cambio del producto, etc."
                        />
                    </FormControl>

                    {/* --- Sección 4: Aceptación y Envío --- */}
                    <Heading
                        as="h3"
                        size="md"
                        borderBottomWidth={2}
                        pb={2}
                        pt={4}
                    >
                        4. Declaración y Envío
                    </Heading>
                    <Text fontSize="sm" color="gray.600">
                        * La respuesta a la presente será remitida al correo
                        electrónico consignado en un plazo no mayor a 15 días
                        hábiles, según el D.S. N° 006-2014-PCM.
                    </Text>
                    <FormControl isRequired>
                        <Checkbox
                            name="aceptaTerminos"
                            isChecked={formData.aceptaTerminos}
                            onChange={handleInputsChange}
                        >
                            Declaro que la información proporcionada es veraz y
                            acepto la Política de Privacidad y Protección de
                            Datos.
                        </Checkbox>
                    </FormControl>

                    <Button
                        type="submit"
                        colorScheme="red"
                        size="lg"
                        width="full"
                    >
                        Enviar Reclamo/Queja
                    </Button>
                </Stack>
            </form>

            {/* 5. JSX del Modal de éxito */}
            <Modal
                isOpen={modalProps.isOpen}
                onClose={modalProps.onClose}
                isCentered
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>¡Reclamo enviado con éxito!</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>
                            Su número de seguimiento es:{" "}
                            <strong>{modalProps.newReclamoId}</strong>.
                        </Text>
                        <Text mt={2}>
                            Se ha enviado una copia de la confirmación a su
                            correo electrónico.
                        </Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            colorScheme="red"
                            onClick={modalProps.onClose}
                        >
                            Aceptar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default ReclamoForm;
