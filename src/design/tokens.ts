/**
 * Atum Finance design tokens.
 * Keep values aligned with `src/app/globals.css` `@theme` and CSS custom properties.
 */

export const colors = {
  background: "#050505",
  backgroundSecondary: "#080A09",
  panel: "#0C100E",
  panelElevated: "#101511",
  text: "#F3F5F4",
  textSecondary: "#9AA39F",
  textMuted: "#858E8A",
  accent: "#00D897",
  accentMuted: "rgba(0, 216, 151, 0.16)",
  accentGlow: "rgba(0, 216, 151, 0.08)",
  border: "rgba(255, 255, 255, 0.08)",
  borderActive: "rgba(0, 216, 151, 0.35)",
  borderHover: "rgba(0, 216, 151, 0.55)",
  focus: "rgba(0, 216, 151, 0.85)",
} as const;

export const typography = {
  family: {
    sans: "var(--font-geist), ui-sans-serif, system-ui, sans-serif",
  },
  size: {
    display: "clamp(4.5rem, 9vw, 7.5rem)",
    hero: "clamp(3.75rem, 8vw, 7.5rem)",
    section: "clamp(2.5rem, 5vw, 5.625rem)",
    body: "1.125rem",
    bodyLarge: "1.25rem",
    nav: "0.875rem",
    label: "0.8125rem",
    technical: "0.75rem",
  },
  lineHeight: {
    display: 0.95,
    hero: 0.96,
    section: 1.05,
    body: 1.65,
    label: 1.3,
  },
  tracking: {
    display: "-0.04em",
    hero: "-0.038em",
    section: "-0.03em",
    body: "0em",
    label: "0.14em",
    technical: "0.16em",
    nav: "0.01em",
  },
  weight: {
    regular: 400,
    medium: 500,
    semibold: 600,
  },
} as const;

export const spacing = {
  0: "0",
  1: "0.25rem",
  2: "0.5rem",
  3: "0.75rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  8: "2rem",
  10: "2.5rem",
  12: "3rem",
  16: "4rem",
  20: "5rem",
  24: "6rem",
  32: "8rem",
  40: "10rem",
  sectionYMobile: "5rem",
  sectionYTablet: "7.5rem",
  sectionYDesktop: "10rem",
  gutterMobile: "1.25rem",
  gutterTablet: "1.75rem",
  gutterDesktop: "2.5rem",
  gridGapMobile: "1rem",
  gridGapDesktop: "1.5rem",
} as const;

export const layout = {
  container: "86.25rem",
  containerNarrow: "46rem",
  containerWide: "90rem",
  gridColumnsDesktop: 12,
  gridColumnsMobile: 4,
} as const;

export const radius = {
  none: "0",
  sm: "0.125rem",
  md: "0.25rem",
  lg: "0.5rem",
  full: "9999px",
} as const;

export const shadows = {
  glow: "0 0 60px rgba(0, 216, 151, 0.08)",
  glowStrong: "0 0 48px rgba(0, 216, 151, 0.14)",
} as const;

export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1440,
} as const;

export const zIndex = {
  base: 0,
  grid: 0,
  content: 1,
  nav: 40,
  overlay: 50,
  skip: 100,
} as const;

export const tokens = {
  colors,
  typography,
  spacing,
  layout,
  radius,
  shadows,
  breakpoints,
  zIndex,
} as const;

export type ColorToken = keyof typeof colors;
export type TypographySize = keyof typeof typography.size;
