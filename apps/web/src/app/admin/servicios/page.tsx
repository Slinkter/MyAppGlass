"use client";

import React, { useState, useEffect, useCallback } from "react";
import { AdminLayout } from "@/features/admin/components/AdminLayout";
import { ServiceAdminTable } from "@/features/admin/components/ServiceAdminTable";
import { ServiceFormModal } from "@/features/admin/components/ServiceFormModal";
import {
  getServices,
  createService,
  updateService,
  deleteService,
} from "@/shared/api/firebase/servicesRepository";
import type {
  Service,
  CreateServiceInput,
  UpdateServiceInput,
} from "@/shared/api/firebase/types";
import { seedDatabase } from "@/features/admin/seed/seedData";
import { env } from "@/shared/config/env";
import { toaster } from "@/components/ui/toaster-instance";

export default function AdminServiciosPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchServices = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getServices();
      setServices(data);
    } catch {
      toaster.create({
        title: "Error al cargar servicios",
        description: "No se pudieron recuperar los servicios desde Firestore.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const handleSeed = async () => {
    const result = await seedDatabase();
    toaster.create({
      title: result.errors.length ? "Error al sembrar datos" : "Datos sembrados",
      description: result.errors.length
        ? result.errors[0]
        : `Servicios: ${result.servicesInserted} nuevos, ${result.servicesSkipped} omitidos. Proyectos: ${result.projectsInserted} nuevos, ${result.projectsSkipped} omitidos.`,
      type: result.errors.length ? "error" : "success",
    });
    await fetchServices();
  };

  const handleCreate = () => {
    setSelectedService(null);
    setModalOpen(true);
  };

  const handleEdit = (service: Service) => {
    setSelectedService(service);
    setModalOpen(true);
  };

  const handleDelete = async (service: Service) => {
    const confirmed = window.confirm(
      `¿Confirmas la eliminación del servicio "${service.title}"? Esta acción no se puede deshacer.`
    );
    if (!confirmed) return;

    try {
      await deleteService(service.id);
      toaster.create({
        title: "Servicio eliminado",
        description: `Se eliminó "${service.title}" exitosamente.`,
        type: "success",
      });
      await fetchServices();
    } catch {
      toaster.create({
        title: "Error al eliminar",
        description: "No se pudo eliminar el servicio seleccionado.",
        type: "error",
      });
    }
  };

  const handleTogglePublish = async (service: Service) => {
    try {
      await updateService(service.id, {
        published: !service.published,
      });
      toaster.create({
        title: service.published ? "Servicio ocultado" : "Servicio publicado",
        description: `Se actualizó el estado de "${service.title}".`,
        type: "info",
      });
      await fetchServices();
    } catch {
      toaster.create({
        title: "Error al cambiar estado",
        description: "No se pudo actualizar el estado de publicación.",
        type: "error",
      });
    }
  };

  const handleSubmit = async (
    data: CreateServiceInput | UpdateServiceInput
  ) => {
    setSubmitting(true);
    try {
      if (selectedService) {
        await updateService(selectedService.id, data as UpdateServiceInput);
        toaster.create({
          title: "Servicio actualizado",
          description: `Se guardaron los cambios para "${data.title || selectedService.title}".`,
          type: "success",
        });
      } else {
        await createService(data as CreateServiceInput);
        toaster.create({
          title: "Servicio creado",
          description: `Se ha registrado "${data.title}" en Firestore.`,
          type: "success",
        });
      }
      setModalOpen(false);
      await fetchServices();
    } catch (err) {
      toaster.create({
        title: "Error al guardar",
        description: err instanceof Error ? err.message : "Ocurrió un error inesperado.",
        type: "error",
      });
      throw err;
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AdminLayout
      title="Gestión de Servicios"
      subtitle="Administración de líneas de producto y carpintería de vidrio y aluminio"
      badge="Catálogo Maestro"
    >
      {env.NEXT_PUBLIC_USE_EMULATORS === "true" && (
        <button type="button" onClick={handleSeed} data-testid="seed-button">
          Sembrar datos iniciales (emulador)
        </button>
      )}

      <ServiceAdminTable
        services={services}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreateNew={handleCreate}
        onTogglePublish={handleTogglePublish}
      />

      <ServiceFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        service={selectedService}
        onSubmit={handleSubmit}
        loading={submitting}
      />
    </AdminLayout>
  );
}
