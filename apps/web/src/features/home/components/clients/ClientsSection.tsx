"use client";

/**
 * @file ClientsSection.tsx
 * @description Sección «Clientes» de la home: tira en celular y rejilla de 3 columnas en tablet y
 * escritorio (3 clientes = sin huérfanos). Cabecera con etiqueta, igual que el resto de secciones.
 * @module home/components
 */

import React from "react";
import { Container } from "@chakra-ui/react";
import { getClients } from "@features/home/services/clientService";
import ClientCard from "./ClientCard";
import { SectionHeader } from "../shared/SectionHeader";
import { CardRail } from "../featured/CardRail";

/**
 * @component ClientsSection
 * @returns {JSX.Element} Sección completa de clientes.
 */
const ClientsSection: React.FC = React.memo(() => {
    const clients = getClients();

    return (
        <Container maxW="7xl" px={{ base: 4, sm: 6, md: 8 }}>
            <SectionHeader
                eyebrow="Clientes"
                title="Quiénes confían en nosotros"
                description="Confianza sólida en cada estructura"
            />
            <CardRail label="Clientes" tabletColumns={3}>
                {clients.map((client) => (
                    <ClientCard
                        key={client.id}
                        image={client.imgClient}
                        nameClient={client.nameClient}
                        descClient={client.descClient}
                    />
                ))}
            </CardRail>
        </Container>
    );
});

ClientsSection.displayName = "ClientsSection";

export default ClientsSection;
