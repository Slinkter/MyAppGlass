import { describe, it, expect } from 'vitest';
import { getCompanyJsonLd } from '@/shared/utils/seo-utils';

describe('SEO JSON-LD Generator', () => {
  it('should generate valid Schema.org graph for Company', () => {
    const jsonLd = getCompanyJsonLd();
    expect(jsonLd['@context']).toBe('https://schema.org');
    expect(Array.isArray(jsonLd['@graph'])).toBe(true);

    const organization = jsonLd['@graph'].find((item) => item['@type'] === 'LocalBusiness');
    expect(organization).toBeDefined();
    expect(organization?.name).toBe('Glass & Aluminum Company S.A.C.');
    expect(organization?.telephone).toBe('+51974278303');
    expect(organization?.address?.addressCountry).toBe('PE');
  });
});
