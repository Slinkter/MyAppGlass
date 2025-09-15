import React, { useState } from "react";
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
} from "@chakra-ui/react";

const ReclamoForm = () => {
  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    email: "",
    telefono: "",
    tipoDocumento: "",
    numeroDocumento: "",
    nombrePadreMadre: "",
    departamento: "",
    provincia: "",
    distrito: "",
    direccion: "",
    tipoBien: "",
    planContratado: "",
    fecha: "",
    montoReclamado: "",
    descripcionBien: "",
    detalleReclamacion: "",
    descripcionEvento: "",
    pedidoReclamante: "",
    datosVeraces: false,
    politicaPrivacidad: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos del formulario:", formData);
  };

  return (
    <Box p={4} maxW="600px" mx="auto">
      <Heading as="h2" size="lg" mb={6}>
        Libro de Reclamaciones
      </Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Nombres</FormLabel>
            <Input
              type="text"
              name="nombres"
              value={formData.nombres}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Apellidos</FormLabel>
            <Input
              type="text"
              name="apellidos"
              value={formData.apellidos}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Teléfono</FormLabel>
            <Input
              type="tel"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Tipo de Documento</FormLabel>
            <Select
              name="tipoDocumento"
              value={formData.tipoDocumento}
              onChange={handleChange}
            >
              <option value="">Seleccionar</option>
              <option value="reclamo">CE</option>
              <option value="queja">DNI</option>
              <option value="queja">PASAPORTE</option>
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Número de Documento</FormLabel>
            <Input
              type="text"
              name="numeroDocumento"
              value={formData.numeroDocumento}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl>
            <FormLabel>
              Nombre de padre o madre (en caso de ser menor de edad)
            </FormLabel>
            <Input
              type="text"
              name="nombrePadreMadre"
              value={formData.nombrePadreMadre}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Dirección</FormLabel>
            <Input
              type="text"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Tipo Contrato o Trabajo </FormLabel>
            <Select
              name="tipoBien"
              value={formData.tipoBien}
              onChange={handleChange}
            >
              <option value="">Seleccionar</option>
              <option value="servicio">Servicio</option>
              <option value="producto">Producto</option>
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Descripción del contrato o venta </FormLabel>
            <Textarea
              name="descripcionBien"
              value={formData.descripcionBien}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Fecha</FormLabel>
            <Input
              type="date"
              name="fecha"
              value={formData.fecha}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>
              Detalle de la reclamación y pedido del consumidor
            </FormLabel>
            <Heading size="xs" mb={2} fontWeight="normal">
              - Reclamo: Disconformidad relacionada a los productos o servicios
            </Heading>
            <Heading size="xs" mb={2} fontWeight="normal">
              -Queja: Disconformidad no relacionada a los productos o servicios
              o malestar o descontento respecto a la atención al público
            </Heading>

            <Select
              name="detalleReclamacion"
              value={formData.detalleReclamacion}
              onChange={handleChange}
            >
              <option value="">Seleccionar</option>
              <option value="reclamo">Reclamo</option>
              <option value="queja">Queja</option>
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Descripción del evento</FormLabel>
            <Textarea
              name="descripcionEvento"
              value={formData.descripcionEvento}
              onChange={handleChange}
              maxLength="1300"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Pedido del Reclamante</FormLabel>
            <Textarea
              name="pedidoReclamante"
              value={formData.pedidoReclamante}
              onChange={handleChange}
              maxLength="1000"
            />
          </FormControl>

          <FormControl isRequired>
            <Checkbox
              name="datosVeraces"
              checked={formData.datosVeraces}
              onChange={handleChange}
            >
              Doy fe que los datos e información proporcionada son veraces
            </Checkbox>
          </FormControl>

          <FormControl isRequired>
            <Checkbox
              name="politicaPrivacidad"
              checked={formData.politicaPrivacidad}
              onChange={handleChange}
            >
              Acepto la Política de Privacidad y Protección de Datos Personales
            </Checkbox>
          </FormControl>

          <Button type="submit" colorScheme="blue">
            Enviar
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default ReclamoForm;
