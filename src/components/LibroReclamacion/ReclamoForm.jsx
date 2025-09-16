import { useState } from "react";
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
} from "@chakra-ui/react";
import { db } from "../../firebase"; // Import the database connection
import { collection, addDoc } from "firebase/firestore"; // Import Firestore functions

// Componente principal del formulario
const ReclamoForm = () => {
  // Estado unificado y simplificado del formulario
  const [formData, setFormData] = useState({
    // Datos del consumidor
    nombreCompleto: "",
    domicilio: "",
    email: "",
    telefono: "",
    tipoDocumento: "",
    numeroDocumento: "",
    nombrePadreMadre: "", // Opcional para menores de edad

    // Datos de la reclamación
    tipoBien: "",
    montoReclamado: "",
    descripcionBien: "",
    tipoSolicitud: "", // "Reclamo" o "Queja"
    detalle: "",
    pedido: "",

    // Aceptaciones
    aceptaTerminos: false,
  });

  // Handler genérico para actualizar el estado
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handler para el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.aceptaTerminos) {
      alert(
        "Debe declarar que la información es veraz y aceptar la política de privacidad."
      );
      return;
    }

    try {
      // Replace the fetch call with a direct write to Firestore
      const docRef = await addDoc(collection(db, "reclamaciones"), {
        ...formData,
        fechaReclamo: new Date().toISOString(), // Add timestamp
      });

      alert(
        `¡Reclamo enviado con éxito! Su número de seguimiento es: ${docRef.id}. Se ha enviado una copia a su correo electrónico.`
      );
      // Optionally, clear the form or redirect
      // setFormData({ ...initial state... });
    } catch (error) {
      console.error("Error writing document to Firestore: ", error);
      alert(
        "Hubo un error al enviar su reclamo. Por favor, intente más tarde."
      );
    }
  };

  return (
    <Box p={{ base: 4, md: 8 }} maxW="800px" mx="auto" borderWidth={1} borderRadius="lg" boxShadow="lg">
      <Heading as="h2" size="lg" mb={4} textAlign="center">
        Libro de Reclamaciones Virtual
      </Heading>

      {/* Sección con datos del proveedor (obligatorio) */}
      <Box  p={4} borderRadius="md" mb={6}>
        <Text fontWeight="bold">Razón Social:</Text>
        <Text mb={2}>GLASS & ALUMINUM COMPANY S.A.C.</Text> {/* <-- REEMPLAZA CON TUS DATOS */}
        <Text fontWeight="bold">RUC:</Text>
        <Text mb={2}>20606432870</Text> {/* <-- REEMPLAZA CON TUS DATOS */}
        <Text fontWeight="bold">Dirección:</Text>
        <Text>Av.Los Fresnos MZ H Lt.16 - La Molina</Text> {/* <-- REEMPLAZA CON TUS DATOS */}
      </Box>

      <form onSubmit={handleSubmit}>
        <Stack spacing={5}>
          {/* --- Sección 1: Identificación del Consumidor --- */}
          <Heading as="h3" size="md" borderBottomWidth={2} pb={2}>
            1. Identificación del consumidor
          </Heading>
          <FormControl isRequired>
            <FormLabel>Nombre Completo</FormLabel>
            <Input name="nombreCompleto" value={formData.nombreCompleto} onChange={handleChange} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Domicilio</FormLabel>
            <Input name="domicilio" value={formData.domicilio} onChange={handleChange} />
          </FormControl>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input type="email" name="email" value={formData.email} onChange={handleChange} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Teléfono</FormLabel>
              <Input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} />
            </FormControl>
          </SimpleGrid>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            <FormControl isRequired>
              <FormLabel>Tipo de Documento</FormLabel>
              <Select name="tipoDocumento" value={formData.tipoDocumento} onChange={handleChange} placeholder="Seleccionar">
                <option value="DNI">DNI</option>
                <option value="CE">CE</option>
                <option value="PASAPORTE">PASAPORTE</option>
              </Select>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Nº de Documento</FormLabel>
              <Input name="numeroDocumento" value={formData.numeroDocumento} onChange={handleChange} />
            </FormControl>
          </SimpleGrid>
          <FormControl>
            <FormLabel>Padre, madre o tutor (si es menor de edad)</FormLabel>
            <Input name="nombrePadreMadre" value={formData.nombrePadreMadre} onChange={handleChange} />
          </FormControl>

          {/* --- Sección 2: Identificación del bien contratado --- */}
          <Heading as="h3" size="md" borderBottomWidth={2} pb={2} pt={4}>
            2. Identificación del bien contratado
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            <FormControl isRequired>
              <FormLabel>Tipo de Bien</FormLabel>
              <Select name="tipoBien" value={formData.tipoBien} onChange={handleChange} placeholder="Seleccionar">
                <option value="producto">Producto</option>
                <option value="servicio">Servicio</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Monto Reclamado (S/.)</FormLabel>
              <InputGroup>
                <InputLeftAddon>S/.</InputLeftAddon>
                <Input type="number" name="montoReclamado" value={formData.montoReclamado} onChange={handleChange} />
              </InputGroup>
            </FormControl>
          </SimpleGrid>
          <FormControl isRequired>
            <FormLabel>Descripción del Producto o Servicio</FormLabel>
            <Textarea name="descripcionBien" value={formData.descripcionBien} onChange={handleChange} />
          </FormControl>

          {/* --- Sección 3: Detalle de la Reclamación --- */}
          <Heading as="h3" size="md" borderBottomWidth={2} pb={2} pt={4}>
            3. Detalle de su solicitud
          </Heading>
          <FormControl isRequired>
            <FormLabel>Tipo de Solicitud</FormLabel>
            <Select name="tipoSolicitud" value={formData.tipoSolicitud} onChange={handleChange} placeholder="Seleccionar">
              <option value="Reclamo">Reclamo: Disconformidad con el producto o servicio.</option>
              <option value="Queja">Queja: Malestar respecto a la atención.</option>
            </Select>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Detalle de la Solicitud</FormLabel>
            <Textarea name="detalle" value={formData.detalle} onChange={handleChange} placeholder="Describa aquí qué sucedió..." />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Pedido del Consumidor</FormLabel>
            <Textarea name="pedido" value={formData.pedido} onChange={handleChange} placeholder="Ej: Devolución del dinero, cambio del producto, etc." />
          </FormControl>

          {/* --- Sección 4: Aceptación y Envío --- */}
          <Heading as="h3" size="md" borderBottomWidth={2} pb={2} pt={4}>
            4. Declaración y Envío
          </Heading>
          <Text fontSize="sm" color="gray.600">
            * La respuesta a la presente será remitida al correo electrónico consignado en un plazo no mayor a 15 días hábiles, según el D.S. N° 006-2014-PCM.
          </Text>
          <FormControl isRequired>
            <Checkbox name="aceptaTerminos" isChecked={formData.aceptaTerminos} onChange={handleChange}>
              Declaro que la información proporcionada es veraz y acepto la Política de Privacidad y Protección de Datos.
            </Checkbox>
          </FormControl>

          <Button type="submit" colorScheme="red" size="lg" width="full">
            Enviar Reclamo/Queja
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default ReclamoForm;