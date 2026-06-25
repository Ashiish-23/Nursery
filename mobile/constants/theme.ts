/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from "react-native";

// Plant Marketplace Primary Colors
const primaryGreen = "#2D5F3F";
const primaryGreenLight = "#4A7C5E";
const primaryGreenLighter = "#E8F5E9";
const accentGreen = "#66BB6A";
const errorRed = "#EF5350";
const warningOrange = "#FFA726";
const successGreen = "#66BB6A";

const tintColorLight = primaryGreen;
const tintColorDark = "#66BB6A";

export const Colors = {
  light: {
  text: "#1F2937",
  background: "#F8FAF7",

  tint: "#2D5F3F",

  icon: "#6B7280",
  tabIconDefault: "#6B7280",
  tabIconSelected: "#2D5F3F",

  primary: "#2D5F3F",
  primaryLight: "#4A7C5E",
  primaryLighter: "#E8F5E9",

  accent: "#66BB6A",

  error: "#DC2626",
  warning: "#F59E0B",
  success: "#16A34A",

  border: "#D1D5DB",

  placeholder: "#6B7280",

  surface: "#FFFFFF",
},
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    primary: primaryGreen,
    primaryLight: primaryGreenLight,
    primaryLighter: primaryGreenLighter,
    accent: accentGreen,
    error: errorRed,
    warning: warningOrange,
    success: successGreen,
    border: "#424242",
    placeholder: "#757575",
    surface: "#262626",
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "Menlo, Monaco, 'Courier New', monospace",
  },
});

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export const BorderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 999,
};
