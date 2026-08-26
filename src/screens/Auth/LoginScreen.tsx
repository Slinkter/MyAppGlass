"use client";

import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Field,
  Input,
  Tabs,
  Badge,
  SimpleGrid,
} from "@chakra-ui/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { toaster } from "@/components/ui/toaster-instance";
import { useAuth } from "@/features/auth/context/AuthContext";
import {
  Lock,
  Mail,
  User,
  Phone,
  MapPin,
  ShieldCheck,
  LogIn,
  UserPlus,
  LayoutDashboard,
  Calculator,
} from "lucide-react";

export const LoginScreen: React.FC = () => {
  const { login, registerClient, user, profile, role, logout, loading } = useAuth();

  // Estado Login
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");

  // Estado Registro
  const [regEmail, setRegEmail] = useState("");
  const [regPass, setRegPass] = useState("");
  const [fullName, setFullName] = useState("");
  const [dniRuc, setDniRuc] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("La Molina");

  const [submitting, setSubmitting] = useState(false);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPass) {
      toaster.create({ title: "Datos incompletos", type: "warning" });
      return;
    }
    setSubmitting(true);
    try {
      await login(loginEmail, loginPass);
      toaster.create({ title: "Sesión iniciada con éxito", type: "success" });
    } catch (err: unknown) {
      let errorMsg = "Credenciales incorrectas. Verifique su correo y contraseña.";
      const code = (err as { code?: string })?.code || "";
      if (code === "auth/invalid-credential" || code === "auth/wrong-password" || code === "auth/user-not-found") {
        errorMsg = "Correo o contraseña incorrectos.";
      } else if (code === "auth/invalid-email") {
        errorMsg = "El formato de correo electrónico no es válido.";
      } else if (code === "auth/too-many-requests") {
        errorMsg = "Demasiados intentos fallidos. Intente nuevamente en unos minutos.";
      } else if (code === "auth/network-request-failed") {
        errorMsg = "Error de conexión de red. Verifique su conexión a internet.";
      } else if (err instanceof Error && err.message) {
        errorMsg = err.message;
      }

      toaster.create({
        title: "Error al iniciar sesión",
        description: errorMsg,
        type: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regEmail || !regPass || !fullName || !dniRuc || !phone || !address) {
      toaster.create({
        title: "Campos requeridos",
        description: "Por favor complete todos los campos de cliente (DNI/RUC, teléfono, dirección).",
        type: "warning",
      });
      return;
    }
    setSubmitting(true);
    try {
      await registerClient(regEmail, regPass, {
        fullName,
        dniRuc,
        phone,
        address,
        district,
      });
      toaster.create({ title: "Cuenta de cliente creada con éxito", type: "success" });
    } catch (err: unknown) {
      toaster.create({
        title: "Error al crear cuenta",
        description: err instanceof Error ? err.message : "No se pudo completar el registro",
        type: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (user) {
    const isAdmin = role === "admin";

    return (
      <Box py="12" maxW="580px" mx="auto" px="4">
        <Box
          bg="surface.card"
          borderRadius="2xl"
          p={{ base: "6", md: "8" }}
          border="1px solid"
          borderColor="border.glass"
          backdropFilter="blur(16px)"
          boxShadow="0 20px 40px rgba(0,0,0,0.2)"
        >
          <VStack gap="6" align="center" textAlign="center">
            <Box
              p="4"
              bg={isAdmin ? "purple.500/10" : "blue.500/10"}
              color={isAdmin ? "purple.400" : "blue.400"}
              borderRadius="full"
            >
              <ShieldCheck size={44} />
            </Box>

            <VStack gap="1">
              <Heading size="xl" color="brand.primary">
                {isAdmin ? "Sesión de Administrador" : "Mi Cuenta"}
              </Heading>
              <Text fontSize="xs" color="text.muted">
                {user.email}
              </Text>
            </VStack>

            <Badge colorPalette={isAdmin ? "purple" : "blue"} px="3" py="1" borderRadius="full" fontSize="xs">
              ROL: {role.toUpperCase()}
            </Badge>

            {profile && (
              <VStack align="start" w="full" bg="whiteAlpha.50" p="4" borderRadius="xl" fontSize="xs" gap="1" textAlign="left">
                <Text><strong>Nombre:</strong> {profile.fullName}</Text>
                <Text><strong>DNI / RUC:</strong> {profile.dniRuc}</Text>
                <Text><strong>Teléfono:</strong> {profile.phone}</Text>
                <Text><strong>Dirección:</strong> {profile.address} ({profile.district})</Text>
              </VStack>
            )}

            <VStack w="full" gap="3" pt="2">
              {isAdmin ? (
                <>
                  <Button asChild colorPalette="cyan" size="lg" w="full">
                    <Link href="/admin">
                      <LayoutDashboard size={18} style={{ marginRight: 8 }} />
                      Ir al Dashboard de Administración
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="md" w="full">
                    <Link href="/presupuesto">
                      <Calculator size={18} style={{ marginRight: 8 }} />
                      Cotizador de Presupuestos
                    </Link>
                  </Button>
                </>
              ) : (
                <Button asChild colorPalette="cyan" size="lg" w="full">
                  <Link href="/presupuesto">
                    <Calculator size={18} style={{ marginRight: 8 }} />
                    Cotizar Presupuesto de Obra
                  </Link>
                </Button>
              )}

              <Button colorPalette="red" variant="ghost" w="full" size="sm" onClick={logout}>
                Cerrar Sesión
              </Button>
            </VStack>
          </VStack>
        </Box>
      </Box>
    );
  }

  return (
    <Box py="12" maxW="540px" mx="auto">
      <Box
        bg="surface.card"
        borderRadius="2xl"
        p={{ base: "6", md: "8" }}
        border="1px solid"
        borderColor="border.glass"
        backdropFilter="blur(16px)"
        boxShadow="0 20px 40px rgba(0,0,0,0.2)"
      >
        <VStack gap="2" align="center" textAlign="center" mb="6">
          <Heading size="xl" color="brand.primary">
            Portal Transaccional GYA
          </Heading>
          <Text fontSize="sm" color="text.muted">
            Accede a tu cuenta de cliente o panel de administración
          </Text>
        </VStack>

        <Tabs.Root defaultValue="login" variant="enclosed">
          <Tabs.List w="full" display="grid" gridTemplateColumns="1fr 1fr" mb="6">
            <Tabs.Trigger value="login" display="flex" gap="2">
              <LogIn size={16} /> Iniciar Sesión
            </Tabs.Trigger>
            <Tabs.Trigger value="register" display="flex" gap="2">
              <UserPlus size={16} /> Registrar Cliente
            </Tabs.Trigger>
          </Tabs.List>

          {/* TAB LOGIN */}
          <Tabs.Content value="login">
            <form onSubmit={handleLoginSubmit}>
              <VStack gap="4">
                <Field.Root required>
                  <Field.Label display="flex" alignItems="center" gap="2">
                    <Mail size={16} /> Correo Electrónico
                  </Field.Label>
                  <Input
                    type="email"
                    placeholder="usuario@ejemplo.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </Field.Root>

                <Field.Root required>
                  <Field.Label display="flex" alignItems="center" gap="2">
                    <Lock size={16} /> Contraseña
                  </Field.Label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={loginPass}
                    onChange={(e) => setLoginPass(e.target.value)}
                  />
                </Field.Root>

                <Button
                  type="submit"
                  colorPalette="blue"
                  size="lg"
                  w="full"
                  mt="2"
                  loading={submitting || loading}
                >
                  Entrar al Sistema
                </Button>
              </VStack>
            </form>
          </Tabs.Content>

          {/* TAB REGISTRO */}
          <Tabs.Content value="register">
            <form onSubmit={handleRegisterSubmit}>
              <VStack gap="3">
                <Field.Root required>
                  <Field.Label display="flex" alignItems="center" gap="2">
                    <User size={16} /> Nombre Completo / Razón Social
                  </Field.Label>
                  <Input
                    placeholder="Ej. Juan Pérez"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </Field.Root>

                <HStack w="full" gap="3">
                  <Field.Root required>
                    <Field.Label>DNI o RUC</Field.Label>
                    <Input
                      placeholder="8 u 11 dígitos"
                      value={dniRuc}
                      onChange={(e) => setDniRuc(e.target.value)}
                    />
                  </Field.Root>
                  <Field.Root required>
                    <Field.Label display="flex" alignItems="center" gap="1">
                      <Phone size={14} /> Celular
                    </Field.Label>
                    <Input
                      placeholder="974278303"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </Field.Root>
                </HStack>

                <HStack w="full" gap="3">
                  <Field.Root required>
                    <Field.Label display="flex" alignItems="center" gap="1">
                      <MapPin size={14} /> Dirección
                    </Field.Label>
                    <Input
                      placeholder="Av. Los Fresnos 1214"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </Field.Root>
                  <Field.Root required>
                    <Field.Label>Distrito</Field.Label>
                    <Input
                      placeholder="La Molina"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                    />
                  </Field.Root>
                </HStack>

                <Field.Root required>
                  <Field.Label display="flex" alignItems="center" gap="2">
                    <Mail size={16} /> Correo Electrónico
                  </Field.Label>
                  <Input
                    type="email"
                    placeholder="cliente@ejemplo.com"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                  />
                </Field.Root>

                <Field.Root required>
                  <Field.Label display="flex" alignItems="center" gap="2">
                    <Lock size={16} /> Contraseña
                  </Field.Label>
                  <Input
                    type="password"
                    placeholder="Mínimo 6 caracteres"
                    value={regPass}
                    onChange={(e) => setRegPass(e.target.value)}
                  />
                </Field.Root>

                <Button
                  type="submit"
                  colorPalette="green"
                  size="lg"
                  w="full"
                  mt="2"
                  loading={submitting || loading}
                >
                  Crear Cuenta de Cliente
                </Button>
              </VStack>
            </form>
          </Tabs.Content>
        </Tabs.Root>
      </Box>
    </Box>
  );
};
