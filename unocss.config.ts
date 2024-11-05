// uno.config.ts
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  // ...UnoCSS options
  shortcuts: [],
  theme: {
    breakpoints: {
      xs: '375px',
      mxs: '376px',
      sm: '640px',
      msm: '641px',
      md: '768px',
      mmd: '769px',
      lg: '1024px',
      mlg: '1025px',
      laptop: '1200px',
      mlaptop: '1201px',
      xl: '1280px',
      mxl: '1281px',
      '2xl': '1536px',
      m2xl: '1537px',
    },
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons(),
    presetTypography(),
    presetWebFonts({
      fonts: {
        // ...
      },
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  rules: [
    // TEXT
    ['text-primary', { color: 'var(--font-primary)' }],
    ['text-secondary', { color: 'var(--font-secondary)' }],
    ['text-tertiary', { color: 'var(--font-tertiary)' }],
    ['text-highlight', { color: 'var(--font-highlight)' }],
    ['text-white', { color: 'var(--font-white)' }],
    ['text-error', { color: 'var(--font-error)' }],
    ['text-success', { color: 'var(--font-success)' }],
    ['text-danger', { color: 'var(--font-error)' }],
    ['text-warning', { color: 'var(--font-warning)' }],
    ['text-placecholder', { color: 'var(--input-placeholder)' }],
    // CARD
    [
      'card-primary',
      { background: 'var(--card-primary)', transition: 'var(--transition-background)' },
    ],
    [
      'card-secondary',
      { background: 'var(--card-secondary)', transition: 'var(--transition-background)' },
    ],
    ['card-error', { background: 'var(--card-error)', transition: 'var(--transition-background)' }],
    [
      'card-success',
      { background: 'var(--card-success)', transition: 'var(--transition-background)' },
    ],
  ],
})
