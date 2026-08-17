import { describe, it, expect } from 'vitest';
import { getCompanyJsonLd, getBreadcrumbJsonLd, getServiceJsonLd } from '@/shared/utils/seo-utils';

describe('SEO JSON-LD Generators', () => {
  it('should generate valid Schema.org graph for Company', () => {
    const jsonLd = getCompanyJsonLd();
    expect(jsonLd['@context']).toBe('https://schema.org');
    expect(Array.isArray(jsonLd['@graph'])).toBe(true);

    const organization = jsonLd['@graph'].find((item) => {
      const type = item['@type'];
      return Array.isArray(type) ? type.includes('LocalBusiness') : type === 'LocalBusiness';
    });

    expect(organization).toBeDefined();
    expect(organization?.name).toBe('Glass & Aluminum Company S.A.C.');
    expect(organization?.telephone).toBe('+51974278303');
    expect(organization?.address?.addressCountry).toBe('PE');
    expect(organization?.geo?.latitude).toBe(-12.0867);
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
});
