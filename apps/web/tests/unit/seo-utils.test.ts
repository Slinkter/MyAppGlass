import { describe, it, expect } from 'vitest';
import {
  getCompanyJsonLd,
  getBreadcrumbJsonLd,
  getServiceJsonLd,
  getFaqJsonLd,
  getProjectJsonLd,
  getWebAppJsonLd,
  cleanSeoTitle,
  resolveSeoImageUrl,
  buildPageMetadata,
} from '@/shared/utils/seo-utils';

describe('SEO JSON-LD Generators & Metadata Helpers', () => {
  it('should generate valid Schema.org graph for Company including SiteNavigationElement', () => {
    const jsonLd = getCompanyJsonLd();
    expect(jsonLd['@context']).toBe('https://schema.org');
    expect(Array.isArray(jsonLd['@graph'])).toBe(true);
    expect(jsonLd['@graph']).toHaveLength(3);

    const website = jsonLd['@graph'].find((item) => item['@type'] === 'WebSite');
    expect(website).toBeDefined();
    expect(website?.inLanguage).toBe('es-PE');

    const organization = jsonLd['@graph'].find((item) => {
      const type = item['@type'];
      return Array.isArray(type) ? type.includes('LocalBusiness') : type === 'LocalBusiness';
    });

    expect(organization).toBeDefined();
    expect(organization?.name).toBe('Glass & Aluminum Company S.A.C.');
    expect(organization?.telephone).toBe('+51974278303');
    expect(organization?.email).toBe('acueva@gyacompany.com');
    expect(organization?.address?.addressCountry).toBe('PE');
    expect(organization?.geo?.latitude).toBe(-12.0867);
    expect(organization?.knowsAbout).toContain('Ventanas antirruido');
    expect(organization?.knowsAbout).toContain('Sistema Nova');

    const sitelinks = jsonLd['@graph'].find((item) => item['@id'] === 'https://www.gyacompany.com/#sitelinks');
    expect(sitelinks).toBeDefined();
    expect(sitelinks?.['@type']).toBe('ItemList');
    expect(sitelinks?.itemListElement).toHaveLength(8);
    expect(sitelinks?.itemListElement?.[0]?.['@type']).toBe('SiteNavigationElement');
    expect(sitelinks?.itemListElement?.[0]?.url).toBe('https://www.gyacompany.com/servicios/ventana');
  });

  it('should clean redundant brand suffixes in cleanSeoTitle', () => {
    expect(cleanSeoTitle('Ventanas Antirruido | Glass & Aluminum Company S.A.C.')).toBe('Ventanas Antirruido');
    expect(cleanSeoTitle('Mamparas | GYA Glass & Aluminum')).toBe('Mamparas');
    expect(cleanSeoTitle('Contacto | GYA Company')).toBe('Contacto');
    expect(cleanSeoTitle('Barandas | GYA La Molina')).toBe('Barandas');
    expect(cleanSeoTitle('Techos | GYA Lima')).toBe('Techos');
    expect(cleanSeoTitle('Duchas | GYA')).toBe('Duchas');
    expect(cleanSeoTitle('Título Limpio')).toBe('Título Limpio');
  });

  it('should normalize relative and absolute image URLs in resolveSeoImageUrl', () => {
    expect(resolveSeoImageUrl('/images/ventana.webp')).toBe(
      'https://www.gyacompany.com/images/ventana.webp'
    );
    expect(resolveSeoImageUrl('images/ventana.webp')).toBe(
      'https://www.gyacompany.com/images/ventana.webp'
    );
    expect(resolveSeoImageUrl('https://firebasestorage.googleapis.com/v0/b/test/o/img.webp')).toBe(
      'https://firebasestorage.googleapis.com/v0/b/test/o/img.webp'
    );
    expect(resolveSeoImageUrl(undefined)).toBe(
      'https://www.gyacompany.com/images/branding-LogoCompanytrans.webp'
    );
  });

  it('should build normalized Next.js Metadata in buildPageMetadata', () => {
    const metadata = buildPageMetadata({
      title: 'Ventanas Antirruido en Lima | GYA Company',
      description: 'Fabricación de ventanas acústicas en La Molina.',
      path: '/servicios/ventana',
      image: '/images/ventana.webp',
    });

    expect(metadata.title).toBe('Ventanas Antirruido en Lima');
    expect(metadata.alternates?.canonical).toBe('https://www.gyacompany.com/servicios/ventana');
    expect(metadata.openGraph?.title).toBe(
      'Ventanas Antirruido en Lima | Glass & Aluminum Company S.A.C.'
    );
    expect(metadata.openGraph?.url).toBe('https://www.gyacompany.com/servicios/ventana');
  });

  it('should generate valid BreadcrumbList Schema', () => {
    const breadcrumb = getBreadcrumbJsonLd([
      { name: 'Inicio', url: 'https://www.gyacompany.com' },
      { name: 'Servicios', url: 'https://www.gyacompany.com/servicios' },
      { name: 'Ventanas Antirruido', url: 'https://www.gyacompany.com/servicios/ventana' },
    ]);

    expect(breadcrumb['@type']).toBe('BreadcrumbList');
    expect(breadcrumb.itemListElement).toHaveLength(3);
    expect(breadcrumb.itemListElement[0].name).toBe('Inicio');
    expect(breadcrumb.itemListElement[2].position).toBe(3);
  });

  it('should generate valid Service Schema', () => {
    const service = getServiceJsonLd(
      'Ventanas Antirruido',
      'Fabricación e instalación en La Molina',
      'https://www.gyacompany.com/servicios/ventana'
    );

    expect(service['@type']).toBe('Service');
    expect(service.name).toBe('Ventanas Antirruido');
    expect(service.provider.name).toBe('Glass & Aluminum Company S.A.C.');
  });

  it('should generate valid CreativeWork Schema for Projects', () => {
    const project = getProjectJsonLd(
      {
        title: 'Residencia La Planicie',
        description: 'Instalación de mamparas Serie 62 y ventanas antirruido.',
        location: 'La Molina, Lima',
        address: 'Av. La Fontana 450',
        completedAt: '2026-05-10',
      },
      'https://www.gyacompany.com/proyectos/12'
    );

    expect(project['@type']).toBe('CreativeWork');
    expect(project.name).toBe('Residencia La Planicie');
    expect(project.locationCreated.name).toBe('La Molina, Lima');
    expect(project.dateCreated).toBe('2026-05-10');

    const nonIsoProject = getProjectJsonLd(
      {
        title: 'Edificio Surco',
        description: 'Mamparas y barandas.',
        location: 'Surco, Lima',
        completedAt: 'Mayo 2026',
      },
      'https://www.gyacompany.com/proyectos/13'
    );
    expect(nonIsoProject.dateCreated).toBeUndefined();
  });

  it('should generate valid WebApplication Schema', () => {
    const webApp = getWebAppJsonLd(
      'Cotizador de Presupuestos Online',
      'Calcula tu presupuesto de vidriería y aluminio en línea.',
      'https://www.gyacompany.com/presupuesto'
    );

    expect(webApp['@type']).toBe('WebApplication');
    expect(webApp.applicationCategory).toBe('DesignApplication');
    expect(webApp.offers.price).toBe('0');
    expect(webApp.offers.priceCurrency).toBe('PEN');
  });

  it('should generate valid FAQPage Schema', () => {
    const faqs = [
      {
        question: '¿Cuánto ruido aísla una ventana acústica?',
        answer: 'Reduce entre 32 y 42 dB.',
      },
    ];

    const faqSchema = getFaqJsonLd(faqs);
    expect(faqSchema['@type']).toBe('FAQPage');
    expect(faqSchema.mainEntity).toHaveLength(1);
    expect(faqSchema.mainEntity[0].name).toBe('¿Cuánto ruido aísla una ventana acústica?');
    expect(faqSchema.mainEntity[0].acceptedAnswer.text).toBe('Reduce entre 32 y 42 dB.');
  });
});
