"use client";

import { useState, useEffect, useCallback } from "react";
import { AdminLayout } from "@/widgets/AdminLayout/AdminLayout";
import { ServiceAdminTable } from "@/features/admin/components/ServiceAdminTable";
import { ServiceFormModal } from "@/features/admin/components/ServiceFormModal";
import { ConfirmDeleteDialog } from "@/features/admin/components/ConfirmDeleteDialog";
import {
  getServices,
  createService,
  updateService,
  deleteService,
} from "@/entities/service/api/servicesRepository";
import { seedApprovedNewServices } from "@/entities/service/api/approvedNewServices";
import type {
  Service,
  CreateServiceInput,
  UpdateServiceInput,
} from "@/shared/api/firebase/types";
import { toaster } from "@/shared/ui/toaster-instance";

export default function AdminServiciosPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [serviceToDelete, setServiceToDelete] = useState<Service | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [syncingApproved, setSyncingApproved] = useState(false);

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

  const handleCreate = () => {
    setSelectedService(null);
    setModalOpen(true);
  };

  const handleEdit = (service: Service) => {
    setSelectedService(service);
    setModalOpen(true);
  };

  const handleDelete = (service: Service) => {
    setServiceToDelete(service);
  };

  const handleConfirmDelete = async () => {
    if (!serviceToDelete) return;
    setDeleting(true);
    try {
      await deleteService(serviceToDelete.id);
      toaster.create({
        title: "Servicio eliminado",
        description: `Se eliminó "${serviceToDelete.title}" exitosamente.`,
        type: "success",
      });
      setServiceToDelete(null);
      await fetchServices();
    } catch {
      toaster.create({
        title: "Error al eliminar",
        description: "No se pudo eliminar el servicio seleccionado.",
        type: "error",
      });
    } finally {
      setDeleting(false);
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

  const handleSyncApprovedServices = async () => {
    setSyncingApproved(true);
    try {
      const res = await seedApprovedNewServices();
      if (res.created.length > 0) {
        toaster.create({
          title: "Servicios dados de alta",
          description: `Se crearon ${res.created.length} nuevos servicios aprobados (${res.created.join(", ")}).`,
          type: "success",
        });
        await fetchServices();
      } else {
        toaster.create({
          title: "Servicios ya sincronizados",
          description: "Todos los servicios aprobados ya existen en Firestore.",
          type: "info",
        });
      }
    } catch (err) {
      const code =
        err && typeof err === "object" && "code" in err && typeof (err as { code?: unknown }).code === "string"
          ? (err as { code: string }).code
          : "";
      const description =
        code === "permission-denied"
          ? "Permiso denegado en Firestore. Verifique que su usuario tenga role: 'admin' en users/{uid}."
          : err instanceof Error && err.message
            ? err.message
            : "No se pudieron dar de alta los servicios aprobados.";
      toaster.create({
        title: "Error al sincronizar",
        description,
        type: "error",
      });
    } finally {
      setSyncingApproved(false);
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
      <ServiceAdminTable
        services={services}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreateNew={handleCreate}
        onTogglePublish={handleTogglePublish}
        onSyncApprovedServices={handleSyncApprovedServices}
        syncingApproved={syncingApproved}
      />

      <ServiceFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        service={selectedService}
        onSubmit={handleSubmit}
        loading={submitting}
      />

      <ConfirmDeleteDialog
        isOpen={Boolean(serviceToDelete)}
        onClose={() => !deleting && setServiceToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Eliminar Servicio"
        description={`¿Estás seguro de que deseas eliminar el servicio "${serviceToDelete?.title}"? Esta acción removerá el servicio y su galería del catálogo.`}
        loading={deleting}
      />
    </AdminLayout>
  );
}
