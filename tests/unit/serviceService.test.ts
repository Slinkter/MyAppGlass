import { describe, it, expect } from 'vitest';
import {
  getServices,
  getServicePageData,
  getServiceBySlug,
} from '@/features/services/services/serviceService';
import { services } from '@/features/services/data/services';
import { servicePageDataMap } from '@/features/services/data/servicePageDataMap';

describe('serviceService - Catálogo y Páginas de Servicios', () => {
  describe('getServices()', () => {
    it('✅ debe retornar la lista completa de todos los servicios', () => {
      const result = getServices();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(services.length);
      expect(result).toEqual(services);
    });

    it('✅ cada servicio debe contener la estructura e identificadores válidos', () => {
      const result = getServices();
      for (const service of result) {
        expect(service).toHaveProperty('id');
        expect(service).toHaveProperty('name');
        expect(service).toHaveProperty('category');
        expect(service).toHaveProperty('description');
        expect(service).toHaveProperty('image');
        expect(service).toHaveProperty('link');
        expect(service).toHaveProperty('plink');
        expect(typeof service.id).toBe('number');
        expect(typeof service.name).toBe('string');
        expect(typeof service.plink).toBe('string');
      }
    });
  });

  describe('getServiceBySlug()', () => {
    it('✅ debe encontrar y retornar un servicio existente por su slug', () => {
      const service = getServiceBySlug('ventana');
      expect(service).toBeDefined();
      expect(service?.name).toBe('Ventanas');
      expect(service?.plink).toBe('/servicios/ventana');
    });

    it('✅ debe encontrar servicios para diferentes slugs válidos', () => {
      const slugsToTest = ['mampara', 'ducha', 'balcones', 'baranda', 'techo'];
      for (const slug of slugsToTest) {
        const service = getServiceBySlug(slug);
        expect(service).toBeDefined();
        expect(service?.plink).toBe(`/servicios/${slug}`);
      }
    });

    it('❌ debe retornar undefined si el servicio no existe', () => {
      const service = getServiceBySlug('servicio-inexistente-123');
      expect(service).toBeUndefined();
    });

    it('❌ debe retornar undefined para slug vacío', () => {
      const service = getServiceBySlug('');
      expect(service).toBeUndefined();
    });
  });

  describe('getServicePageData()', () => {
    it('✅ debe resolver con la información completa de página para un slug existente', async () => {
      const data = await getServicePageData('ventana');
      expect(data).toBeDefined();
      expect(data.seo).toBeDefined();
      expect(data.seo.title).toContain('Ventanas');
      expect(data.systems).toBeInstanceOf(Array);
      expect(data.features).toBeInstanceOf(Array);
      expect(data.imageLists).toBeInstanceOf(Array);
      expect(data).toEqual(servicePageDataMap['ventana']);
    });

    it('✅ debe resolver los datos de página para todos los slugs registrados en el mapa', async () => {
      const availableSlugs = Object.keys(servicePageDataMap);
      expect(availableSlugs.length).toBeGreaterThan(0);

      for (const slug of availableSlugs) {
        const data = await getServicePageData(slug);
        expect(data).toBeDefined();
        expect(data.seo.title).toBeTruthy();
        expect(data.seo.description).toBeTruthy();
        expect(Array.isArray(data.imageLists)).toBe(true);
      }
    });

    it('❌ debe rechazar con un Error si el slug no se encuentra en el mapa', async () => {
      await expect(getServicePageData('slug-no-valido')).rejects.toThrow(
        'Página de servicio no encontrada.'
      );
    });
  });
});
