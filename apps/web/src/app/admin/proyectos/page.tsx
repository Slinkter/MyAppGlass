"use client";

import React, { useState, useEffect, useCallback } from "react";
import { AdminLayout } from "@/features/admin/components/AdminLayout";
import { ProjectAdminTable } from "@/features/admin/components/ProjectAdminTable";
import { ProjectFormModal } from "@/features/admin/components/ProjectFormModal";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "@/shared/api/firebase/projectsRepository";
import { getServices } from "@/shared/api/firebase/servicesRepository";
import type {
  Project,
  CreateProjectInput,
  UpdateProjectInput,
  Service,
} from "@/shared/api/firebase/types";
import { toaster } from "@/components/ui/toaster-instance";

export default function AdminProyectosPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [servicesList, setServicesList] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [projectsData, servicesData] = await Promise.all([
        getProjects(),
        getServices().catch(() => []),
      ]);
      setProjects(projectsData);
      setServicesList(servicesData);
    } catch {
      toaster.create({
        title: "Error al cargar portafolio",
        description: "No se pudieron recuperar los proyectos desde Firestore.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCreate = () => {
    setSelectedProject(null);
    setModalOpen(true);
  };

  const handleEdit = (project: Project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  const handleDelete = async (project: Project) => {
    const confirmed = window.confirm(
      `¿Confirmas la eliminación del proyecto "${project.title}"? Esta acción no se puede deshacer.`
    );
    if (!confirmed) return;

    try {
      await deleteProject(project.id);
      toaster.create({
        title: "Proyecto eliminado",
        description: `Se eliminó "${project.title}" exitosamente.`,
        type: "success",
      });
      await fetchData();
    } catch {
      toaster.create({
        title: "Error al eliminar",
        description: "No se pudo eliminar el proyecto seleccionado.",
        type: "error",
      });
    }
  };

  const handleTogglePublish = async (project: Project) => {
    try {
      await updateProject(project.id, {
        published: !project.published,
      });
      toaster.create({
        title: project.published ? "Proyecto ocultado" : "Proyecto publicado",
        description: `Se actualizó el estado de "${project.title}".`,
        type: "info",
      });
      await fetchData();
    } catch {
      toaster.create({
        title: "Error al cambiar estado",
        description: "No se pudo actualizar el estado de publicación.",
        type: "error",
      });
    }
  };

  const handleSubmit = async (
    data: CreateProjectInput | UpdateProjectInput
  ) => {
    setSubmitting(true);
    try {
      if (selectedProject) {
        await updateProject(selectedProject.id, data as UpdateProjectInput);
        toaster.create({
          title: "Proyecto actualizado",
          description: `Se guardaron los cambios para "${data.title || selectedProject.title}".`,
          type: "success",
        });
      } else {
        await createProject(data as CreateProjectInput);
        toaster.create({
          title: "Proyecto creado",
          description: `Se ha registrado "${data.title}" en Firestore.`,
          type: "success",
        });
      }
      setModalOpen(false);
      await fetchData();
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
      title="Gestión de Obras y Proyectos"
      subtitle="Portafolio fotográfico de carpintería residencial y comercial instalada"
      badge="Portafolio Maestro"
    >
      <ProjectAdminTable
        projects={projects}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreateNew={handleCreate}
        onTogglePublish={handleTogglePublish}
      />

      <ProjectFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        project={selectedProject}
        servicesList={servicesList}
        onSubmit={handleSubmit}
        loading={submitting}
      />
    </AdminLayout>
  );
}
