import { createSystem, defaultConfig } from '@chakra-ui/react';

const auraSpacing = {
  phi_xs: { value: '8px' },
  phi_sm: { value: '13px' },
  phi_md: { value: '21px' },
  phi_lg: { value: '34px' },
  phi_xl: { value: '55px' },
  phi_2xl: { value: '89px' },
  phi_3xl: { value: '144px' },
};

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      spacing: auraSpacing,
      colors: {
        primary: {
          50: { value: '#fafafa' },
          100: { value: '#f4f4f5' },
          200: { value: '#e4e4e7' },
          300: { value: '#d4d4d8' },
          400: { value: '#a1a1aa' },
          500: { value: '#71717a' },
          600: { value: '#52525b' },
          700: { value: '#3f3f46' },
          800: { value: '#27272a' },
          900: { value: '#18181b' },
        },
      },
    },
    semanticTokens: {
      colors: {
        'bg.page': { value: { base: 'white', _dark: '#000000' } },
        'text.body': { value: { base: '{colors.primary.800}', _dark: '{colors.primary.300}' } },
      },
    },
  },
});
