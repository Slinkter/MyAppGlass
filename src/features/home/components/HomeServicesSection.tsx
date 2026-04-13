"use client";

import React from "react";
import ItemGridLayout from "@/shared/components/Layout/ItemGridLayout";
import ServiceCard from "@/features/services/components/ServiceCard";
import { services } from "@/features/services/data/services";

const HomeServicesSection = () => {
    // Show top 6 services for home page
    const highlightServices = services.slice(0, 6);

    return (
        <ItemGridLayout
            title="NUESTROS SERVICIOS"
            subtitle="Ofrecemos soluciones integrales en vidrio templado y aluminio para transformar tus espacios."
            columns={{ base: 1, sm: 2, md: 3 }}
        >
            {highlightServices.map((service, index) => (
                <ItemGridLayout.Item key={service.id} delay={index * 0.1}>
                    <ServiceCard
                        // @ts-ignore
                        image={service.image}
                        name={service.name}
                        description={service.description}
                        plink={service.plink}
                    />
                </ItemGridLayout.Item>
            ))}
        </ItemGridLayout>
    );
};

export default HomeServicesSection;
