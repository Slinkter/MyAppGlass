"use client";

import React from "react";
import ItemGridLayout from "@/shared/components/Layout/ItemGridLayout";
import { getClients } from "../services/clientService";
import ClientCard from "./ClientCard";

const ClientsSection = React.memo(() => {
  const clients = getClients();

  return (
    <ItemGridLayout
      title="CLIENTES"
      subtitle="Estamos comprometidos con brindar soluciones en vidrio y aluminio"
      seoTitle="Nuestros Clientes - GYA Company"
      seoDescription="Mira las empresas y sectores que confían en Glass & Aluminum Company S.A.C. para sus proyectos de vidriería."
      seoCanonicalUrl="https://www.gyacompany.com/clientes"
      containerProps={{ mt: 0, pt: 8 }}
    >
      {clients.map((client: any) => (
        <ItemGridLayout.Item key={client.id}>
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
