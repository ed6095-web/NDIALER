export const colors = {
  background: '#000000',
  text: '#FFFFFF',
  secondarySurface: '#121212', // dark grey for list items and bottom nav
  accent: '#FFFFFF',
  textSecondary: '#888888', // for contact numbers
  buttonBackground: '#1C1C1C', // dialpad buttons
  buttonHighlight: '#333333', // tapped state
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const typography = {
  fontFamily: 'sans-serif', // Modern default, we could use Inter/Roboto if we loaded them, keeping default for now
  size: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 36,
    dialPad: 48,
  },
  weight: {
    regular: '400' as const,
    medium: '500' as const,
    bold: '700' as const,
  }
};
