/**
 * Central theme used by every screen and component.
 * Dark cyberpunk terminal aesthetic:
 *   - deep navy background
 *   - neon green primary
 *   - cyan secondary
 *   - amber warning
 *   - red danger
 */

export const theme = {
  // ---- Colors ----------------------------------------------------------
  colors: {
    // backgrounds
    bg: '#0a0e27',        // app background (deep space navy)
    bgCard: '#131a3a',    // card / panel background
    bgElevated: '#0d1229', // locked / disabled card bg
    bgTerminal: '#000000', // terminal clue view

    // borders & dividers
    border: '#1e2a5a',
    borderSoft: '#161e3e',
    borderActive: '#00ff9f',

    // brand / accents
    primary: '#00ff9f',   // neon green — main brand
    primaryDim: '#00cc7a',
    primaryGlow: '#0f2a20', // success-tinted card bg

    secondary: '#00d9ff', // cyan — secondary accent
    warning: '#ffdd57',   // amber — hints
    warningBg: '#2a2413', // warning-tinted bg
    danger: '#ff3860',    // red — accusation / errors / time up
    dangerDim: '#cc2d4d',

    // text
    text: '#c8d6e5',      // primary body text
    textDim: '#64748b',   // muted / labels
    textInverse: '#0a0e27', // on-primary text
    textOnDanger: '#ffffff',

    // misc
    overlay: 'rgba(0,0,0,0.85)',
    white: '#ffffff',
    black: '#000000',
  },

  // ---- Typography ------------------------------------------------------
  font: {
    mono: 'monospace',
  },
  fontSize: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  fontWeight: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    heavy: '800',
  },
  lineHeight: {
    tight: 16,
    normal: 20,
    relaxed: 24,
  },

  // ---- Spacing scale (4pt) --------------------------------------------
  space: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },

  // ---- Radii -----------------------------------------------------------
  radius: {
    xs: 3,
    sm: 4,
    md: 6,
    lg: 8,
    xl: 12,
    pill: 999,
  },

  // ---- Border widths ---------------------------------------------------
  borderWidth: {
    thin: 1,
    thick: 2,
  },

  // ---- Common reusable style fragments ---------------------------------
  shadow: {
    card: {
      shadowColor: '#00ff9f',
      shadowOpacity: 0.15,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 0 },
      elevation: 3,
    },
  },

  // ---- Semantic aliases (shortcuts) ------------------------------------
  bg: '#0a0e27',
  bgCard: '#131a3a',
  border: '#1e2a5a',
  primary: '#00ff9f',
  secondary: '#00d9ff',
  danger: '#ff3860',
  warning: '#ffdd57',
  text: '#c8d6e5',
  textDim: '#64748b',
  mono: 'monospace',
};

/**
 * Difficulty color helper.
 */
export const difficultyColor = (level) => {
  switch (level) {
    case 'EASY':
      return theme.primary;
    case 'MEDIUM':
      return theme.warning;
    case 'HARD':
      return theme.danger;
    default:
      return theme.secondary;
  }
};

/**
 * Rank color helper (1 = gold, 2 = silver, 3 = bronze).
 */
export const rankColor = (rank) => {
  if (rank === 1) return '#ffd700';
  if (rank === 2) return '#c0c0c0';
  if (rank === 3) return '#cd7f32';
  return theme.textDim;
};

export default theme;