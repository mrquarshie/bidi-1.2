/**
 * BiDi Fuel Station App Theme
 * Dark Green and Light Green Color Scheme with Fuel Station Aesthetic
 */

import { Platform } from 'react-native';

// Primary brand colors - Green fuel station theme
const primaryDarkGreen = '#1a5f3f';  // Dark forest green
const primaryGreen = '#2d7a4f';      // Medium green
const lightGreen = '#4ade80';        // Light green
const accentGreen = '#22c55e';       // Bright green
const darkGreen = '#14532d';         // Very dark green

// Modern tint colors
const tintColorLight = primaryGreen;
const tintColorDark = lightGreen;

export const Colors = {
  light: {
    // Text colors
    text: '#0f172a',
    textSecondary: '#374151',
    textMuted: '#6b7280',
    
    // Background colors
    background: '#f0fdf4',        // Very light green
    backgroundSecondary: '#dcfce7', // Light green
    backgroundTertiary: '#bbf7d0',  // Lighter green
    
    // Brand colors
    primary: primaryGreen,
    primaryDark: primaryDarkGreen,
    accent: lightGreen,
    success: accentGreen,
    
    // UI colors
    tint: tintColorLight,
    icon: '#374151',
    tabIconDefault: '#6b7280',
    tabIconSelected: tintColorLight,
    
    // Border and divider colors
    border: '#bbf7d0',
    borderLight: '#dcfce7',
    
    // Card colors
    card: '#ffffff',
    cardBorder: '#bbf7d0',
    
    // Status colors
    error: '#ef4444',
    warning: '#f59e0b',
    info: primaryGreen,
  },
  dark: {
    // Text colors
    text: '#f0fdf4',
    textSecondary: '#bbf7d0',
    textMuted: '#86efac',
    
    // Background colors
    background: darkGreen,         // Very dark green
    backgroundSecondary: primaryDarkGreen, // Dark green
    backgroundTertiary: primaryGreen,      // Medium green
    
    // Brand colors
    primary: lightGreen,
    primaryDark: primaryGreen,
    accent: accentGreen,
    success: lightGreen,
    
    // UI colors
    tint: tintColorDark,
    icon: '#86efac',
    tabIconDefault: '#4ade80',
    tabIconSelected: tintColorDark,
    
    // Border and divider colors
    border: primaryGreen,
    borderLight: '#2d7a4f',
    
    // Card colors
    card: primaryDarkGreen,
    cardBorder: primaryGreen,
    
    // Status colors
    error: '#f87171',
    warning: '#fbbf24',
    info: lightGreen,
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
