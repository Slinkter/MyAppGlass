import { describe, it, expect } from 'vitest';
import { getProjects, getProjectById } from '@/shared/services/projectService';
import { projects } from '@/shared/data/projects';

describe('projectService - Gestión y Consulta de Proyectos', () => {
  describe('getProjects()', () => {
    it('✅ debe retornar la lista completa de proyectos del portafolio', () => {
      const result = getProjects();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(projects.length);
      expect(result).toEqual(projects);
    });

    it('✅ todos los proyectos deben tener estructura válida de campos requeridos', () => {
      const result = getProjects();
      for (const project of result) {
        expect(project).toHaveProperty('id');
        expect(project).toHaveProperty('image');
        expect(project).toHaveProperty('residencial');
        expect(project).toHaveProperty('name');
        expect(project).toHaveProperty('address');
        expect(project).toHaveProperty('year');
        expect(typeof project.id).toBe('number');
        expect(typeof project.residencial).toBe('string');
        expect(typeof project.image).toBe('string');
      }
    });
  });

  describe('getProjectById()', () => {
    it('✅ debe recuperar un proyecto específico pasando su ID como número', () => {
      const project = getProjectById(1);
      expect(project).toBeDefined();
      expect(project?.id).toBe(1);
      expect(project?.residencial).toBe('Edificio Torre Sipan');
    });

    it('✅ debe recuperar un proyecto específico pasando su ID como string', () => {
      const project = getProjectById('2');
      expect(project).toBeDefined();
      expect(project?.id).toBe(2);
      expect(project?.residencial).toBe('Mirador de la Reserva');
    });

    it('✅ debe recuperar correctamente proyectos con fotos de obra asociadas', () => {
      // Proyecto 14 (Palmer) contiene fotosObra pobladas
      const project = getProjectById(14);
      expect(project).toBeDefined();
      expect(project?.residencial).toBe('Palmer');
      expect(project?.photosObra.length).toBeGreaterThan(0);
    });

    it('❌ debe retornar undefined para un ID inexistente', () => {
      const project = getProjectById(9999);
      expect(project).toBeUndefined();
    });

    it('❌ debe retornar undefined para un string de ID no numérico inexistente', () => {
      const project = getProjectById('invalid-id');
      expect(project).toBeUndefined();
    });
  });
});
