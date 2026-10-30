export interface ProjectFormFields {
  title: string;
  slug: string;
  client: string;
  location: string;
  serviceId: string;
  description: string;
  coverImage: string;
}

/** Devuelve el primer mensaje de error de validación, o null si el formulario es válido. */
export const validateProjectForm = (f: ProjectFormFields): string | null => {
  if (!f.title.trim()) return "El título de la obra es obligatorio";
  if (!f.slug.trim()) return "El slug del proyecto es obligatorio";
  if (!f.client.trim()) return "El cliente o constructora es obligatorio";
  if (!f.location.trim()) return "La ubicación es obligatoria";
  if (!f.serviceId.trim()) return "Debes seleccionar el servicio vinculado";
  if (!f.description.trim()) return "La descripción técnica del proyecto es obligatoria";
  if (!f.coverImage.trim()) return "Debes cargar una foto principal de portada";
  return null;
};
