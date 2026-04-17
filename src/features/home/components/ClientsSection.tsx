/**
 * @file ClientsSection.tsx
 * @description Orchestrator component for the "Our Clients" section.
 * @module home/components
 */

import React from "react";
import ItemGridLayout from "@/shared/components/Layout/ItemGridLayout";
import { getClients } from "../services/clientService";
import ClientCard from "./ClientCard";

/**
 * @component ClientsSection
 * @description Sección de "Clientes" en la página principal.
 *
 * @returns {JSX.Element} Sección completa de clientes.
 */
const ClientsSection: React.FC = React.memo(() => {
  const clients = getClients();

  return (
    <ItemGridLayout
      title="NUESTROS ALIADOS"
      subtitle="Confianza sólida en cada estructura"
      seoTitle="Nuestros Clientes - GYA Company"
      seoDescription="Descubre por qué somos los líderes en vidriería y aluminio."
      seoCanonicalUrl="https://www.gyacompany.com/clientes"
      containerProps={{ mt: 0, pt: 0 }}
    >
      {clients.map((client, index) => (
        <ItemGridLayout.Item key={client.id} delay={index * 0.1}>
          <ClientCard
            image={client.imgClient}
            nameClient={client.nameClient}
            descClient={client.descClient}
          />
        </ItemGridLayout.Item>
      ))}
    </ItemGridLayout>
  );
});

ClientsSection.displayName = "ClientsSection";

export default ClientsSection;
