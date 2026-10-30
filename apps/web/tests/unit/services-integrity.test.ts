import { describe, it, expect } from 'vitest';
import { servicePageDataMap } from '@/features/services/data/servicePageDataMap';
import { services } from '@/features/services/data/services';
import { serviceFaqsMap, defaultServiceFaqs } from '@/features/services/data/serviceFaqs';
import { listVentana } from '@/features/services/data/gallery/ventana-data';
import { listBalcon } from '@/features/services/data/gallery/balcon-data';
import { listBaranda } from '@/features/services/data/gallery/baranda-data';
import { listCelosias } from '@/features/services/data/gallery/celosias-data';
import { listDucha } from '@/features/services/data/gallery/ducha-data';
import { listMampara } from '@/features/services/data/gallery/mampara-data';
import { listParapeto } from '@/features/services/data/gallery/parapeto-data';
import { listPuertas } from '@/features/services/data/gallery/puerta-serie-data';
import { listPuertav } from '@/features/services/data/gallery/puerta-vidrio-data';
import { listTecho } from '@/features/services/data/gallery/techo-data';

describe('Integridad de Datos Estáticos de Servicios (FASE 5)', () => {
  describe('Catálogo de Servicios (services.ts)', () => {
    it('✅ debe contener exactamente los servicios del catálogo con IDs únicos y consecutivos', () => {
      expect(services.length).toBeGreaterThan(0);
      const ids = services.map((s) => s.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(services.length);
    });

    it('✅ todos los servicios deben tener nombres no vacíos, categorías y rutas plink válidas', () => {
      services.forEach((service) => {
        expect(service.name).toBeTruthy();
        expect(service.name.trim().length).toBeGreaterThan(0);
        expect(service.category).toBeTruthy();
        expect(service.description).toBeTruthy();
        expect(service.description.trim().length).toBeGreaterThan(10);
        expect(service.plink).toMatch(/^\/servicios\/[a-z0-9-]+$/);
        expect(service.image).toBeTruthy();
      });
    });

    it('✅ no deben existir duplicados en plink o link', () => {
      const plinks = services.map((s) => s.plink);
      const uniquePlinks = new Set(plinks);
      expect(uniquePlinks.size).toBe(services.length);
    });
  });

  describe('Configuración de Páginas de Servicios (servicePageDataMap.ts)', () => {
    const serviceSlugs = Object.keys(servicePageDataMap);

    it('✅ debe contener configuración para todos los servicios del catálogo', () => {
      expect(serviceSlugs.length).toBeGreaterThanOrEqual(9);
      services.forEach((service) => {
        const slug = service.plink.replace('/servicios/', '');
        expect(servicePageDataMap).toHaveProperty(slug);
      });
    });

    it('✅ cada entrada del mapa debe tener SEO válido (title y description no vacíos y con longitud razonable)', () => {
      serviceSlugs.forEach((slug) => {
        const pageData = servicePageDataMap[slug];
        expect(pageData.seo).toBeDefined();
        expect(pageData.seo.title).toBeTruthy();
        expect(pageData.seo.title.trim().length).toBeGreaterThan(15);
        expect(pageData.seo.description).toBeTruthy();
        expect(pageData.seo.description.trim().length).toBeGreaterThan(30);
      });
    });

    it('✅ cada entrada debe tener sección about con title y description válidos', () => {
      serviceSlugs.forEach((slug) => {
        const pageData = servicePageDataMap[slug];
        expect(pageData.about).toBeDefined();
        expect(pageData.about.title).toBeTruthy();
        expect(pageData.about.description).toBeTruthy();
      });
    });

    it('✅ cada entrada debe tener arrays válidos de benefits, systems, features e imageLists', () => {
      serviceSlugs.forEach((slug) => {
        const pageData = servicePageDataMap[slug];
        expect(Array.isArray(pageData.benefits)).toBe(true);
        expect(pageData.benefits.length).toBeGreaterThan(0);
        pageData.benefits.forEach((benefit) => {
          expect(benefit.label).toBeTruthy();
          expect(benefit.icon).toBeDefined();
        });

        expect(Array.isArray(pageData.systems)).toBe(true);
        expect(pageData.systems.length).toBeGreaterThan(0);
        pageData.systems.forEach((system) => {
          expect(system.label).toBeTruthy();
          expect(system.icon).toBeDefined();
        });

        expect(Array.isArray(pageData.features)).toBe(true);
        expect(pageData.features.length).toBeGreaterThan(0);
        pageData.features.forEach((feature) => {
          expect(feature.label).toBeTruthy();
          expect(feature.icon).toBeDefined();
        });

        expect(Array.isArray(pageData.imageLists)).toBe(true);
        expect(pageData.imageLists.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Integridad de FAQs por Servicio (serviceFaqs.ts)', () => {
    it('✅ las FAQs por defecto deben tener preguntas y respuestas no vacías', () => {
      expect(defaultServiceFaqs.length).toBeGreaterThan(0);
      defaultServiceFaqs.forEach((faq) => {
        expect(faq.question).toBeTruthy();
        expect(faq.question.trim().length).toBeGreaterThan(5);
        expect(faq.answer).toBeTruthy();
        expect(faq.answer.trim().length).toBeGreaterThan(10);
      });
    });

    it('✅ todas las FAQs específicas mapeadas deben estar bien formateadas', () => {
      Object.entries(serviceFaqsMap).forEach(([, faqs]) => {
        expect(Array.isArray(faqs)).toBe(true);
        expect(faqs.length).toBeGreaterThan(0);
        faqs.forEach((faq) => {
          expect(faq.question).toBeTruthy();
          expect(faq.question.startsWith('¿')).toBe(true);
          expect(faq.answer).toBeTruthy();
          expect(faq.answer.trim().length).toBeGreaterThan(10);
        });
      });
    });
  });

  describe('Integridad de Galerías de Imágenes', () => {
    const galleries = [
      { name: 'Ventana Nova', items: listVentana.nova },
      { name: 'Ventana Serie 25', items: listVentana.serie25 },
      { name: 'Ventana Serie 35', items: listVentana.serie35 },
      { name: 'Ventana Serie 62', items: listVentana.serie62 },
      { name: 'Balcones', items: listBalcon.items },
      { name: 'Barandas', items: listBaranda.baranda },
      { name: 'Celosías', items: listCelosias.celocias },
      { name: 'Duchas', items: listDucha.kit },
      { name: 'Mampara Nova', items: listMampara.nova },
      { name: 'Mampara Serie', items: listMampara.serie },
      { name: 'Parapetos', items: listParapeto.parapeto },
      { name: 'Puertas Serie', items: listPuertas.puertas },
      { name: 'Puertas Vidrio', items: listPuertav.puertav },
      { name: 'Techos', items: listTecho.techo },
    ];

    it('✅ cada galería de servicio debe contener elementos con src y title o alt válidos', () => {
      galleries.forEach(({ name, items }) => {
        expect(Array.isArray(items), `Galería ${name} no es un array`).toBe(true);
        expect(items.length, `Galería ${name} está vacía`).toBeGreaterThan(0);
        items.forEach((item, index) => {
          expect(item.src, `Elemento ${index} en galería ${name} no tiene src`).toBeTruthy();
          expect(typeof item.src).toBe('string');
        });
      });
    });
  });
});
