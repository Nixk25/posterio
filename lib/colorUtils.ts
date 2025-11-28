export type ColorGroup =
  | "Red"
  | "Orange"
  | "Yellow"
  | "Green"
  | "Blue"
  | "Purple"
  | "Pink"
  | "Brown"
  | "Black"
  | "White"
  | "Gray";

export const COLOR_GROUPS: ColorGroup[] = [
  "Red",
  "Orange",
  "Yellow",
  "Green",
  "Blue",
  "Purple",
  "Pink",
  "Brown",
  "Black",
  "White",
  "Gray"
];

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
}

export function colorToGroup(hexColor: string): ColorGroup {
  const rgb = hexToRgb(hexColor);
  if (!rgb) return "Gray";

  const { r, g, b } = rgb;
  const hsl = rgbToHsl(r, g, b);

  if (hsl.s < 10) {
    if (hsl.l > 90) return "White";
    if (hsl.l < 15) return "Black";
    return "Gray";
  }

  if (hsl.l > 95) return "White";
  if (hsl.l < 8) return "Black";

  const hue = hsl.h;

  if (hue >= 0 && hue < 15) return "Red";
  if (hue >= 15 && hue < 45) return "Orange";
  if (hue >= 45 && hue < 70) return "Yellow";
  if (hue >= 70 && hue < 165) return "Green";
  if (hue >= 165 && hue < 250) return "Blue";
  if (hue >= 250 && hue < 290) return "Purple";
  if (hue >= 290 && hue < 330) return "Pink";
  if (hue >= 330 && hue < 345) return "Red";
  if (hue >= 345) return "Red";

  if (hsl.s < 30 && hsl.l > 25 && hsl.l < 60) return "Brown";

  return "Gray";
}

export function getColorGroups(hexColors: string[]): ColorGroup[] {
  const groups = new Set<ColorGroup>();

  for (const color of hexColors) {
    const group = colorToGroup(color);
    groups.add(group);
  }

  return Array.from(groups);
}
