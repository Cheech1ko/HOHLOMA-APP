export const Colors = {
  // Тёмная премиум-эстетика
  background: '#0D0D0D',
  surface: '#1A1A1A',
  surfaceLight: '#242424',
  
  // Акцент — золото (хохлома)
  accent: '#D4AF37',
  accentDark: '#B8960F',
  
  // Текст
  text: '#E0E0E0',
  textSecondary: '#A0A0A0',
  textMuted: '#6B6B6B',
  
  // Доп.
  border: '#2A2A2A',
  success: '#2E8B57',
  error: '#E63946',
};

export const Typography = {
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  body: {
    fontSize: 16,
    color: Colors.text,
  },
  caption: {
    fontSize: 12,
    color: Colors.textMuted,
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  round: 999,
};