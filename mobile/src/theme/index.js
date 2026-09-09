// OnStage Design System — Cores
// Paleta oficial: Roxo #533afd + Amarelo #fbbf24

export const colors = {
  // Primária
  roxo: '#533afd',
  roxoLight: '#7c5cff',
  roxoDark: '#3b28c4',

  // Secundária
  amarelo: '#fbbf24',
  amareloDark: '#d97706',

  // Neutros
  branco: '#ffffff',
  cinza50: '#f9fafb',
  cinza100: '#f3f4f6',
  cinza200: '#e5e7eb',
  cinza300: '#d1d5db',
  cinza400: '#9ca3af',
  cinza500: '#6b7280',
  cinza700: '#374151',
  cinza900: '#111827',

  // Status
  verde: '#10b981',
  vermelho: '#ef4444',
  azul: '#3b82f6',

  // Spotify
  spotify: '#1DB954',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const radius = {
  sm: 10,
  md: 16,
  lg: 24,
  full: 9999,
};

export const typography = {
  h1: { fontSize: 28, fontWeight: '800' },
  h2: { fontSize: 22, fontWeight: '700' },
  h3: { fontSize: 18, fontWeight: '700' },
  body: { fontSize: 14, fontWeight: '400' },
  bodyMedium: { fontSize: 14, fontWeight: '500' },
  bodyBold: { fontSize: 14, fontWeight: '700' },
  caption: { fontSize: 12, fontWeight: '400' },
  captionMedium: { fontSize: 12, fontWeight: '600' },
  small: { fontSize: 10, fontWeight: '500' },
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 30,
    elevation: 8,
  },
};
