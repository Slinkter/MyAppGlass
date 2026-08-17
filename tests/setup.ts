import '@testing-library/jest-dom';

process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY = 'test_recaptcha_site_key';

// Mock window.matchMedia for next-themes / Chakra UI / Responsive hooks in jsdom
if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });
}
