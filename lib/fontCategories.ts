export type FontCategory =
  | "Sans Serif"
  | "Serif"
  | "Display"
  | "Handwriting"
  | "Monospace"
  | "Other";

// Populární fonty podle kategorií
const FONT_CATEGORIES: Record<string, FontCategory> = {
  // Sans Serif
  "Arial": "Sans Serif",
  "Helvetica": "Sans Serif",
  "Helvetica Neue": "Sans Serif",
  "Roboto": "Sans Serif",
  "Open Sans": "Sans Serif",
  "Lato": "Sans Serif",
  "Montserrat": "Sans Serif",
  "Source Sans Pro": "Sans Serif",
  "Raleway": "Sans Serif",
  "Poppins": "Sans Serif",
  "Inter": "Sans Serif",
  "Nunito": "Sans Serif",
  "Proxima Nova": "Sans Serif",
  "Avenir": "Sans Serif",
  "Futura": "Sans Serif",
  "Gotham": "Sans Serif",
  "DIN": "Sans Serif",
  "Gill Sans": "Sans Serif",
  "Fira Sans": "Sans Serif",
  "Work Sans": "Sans Serif",
  "Rubik": "Sans Serif",
  "Outfit": "Sans Serif",
  "Space Grotesk": "Sans Serif",
  "Plus Jakarta Sans": "Sans Serif",
  "Manrope": "Sans Serif",

  // Serif
  "Times New Roman": "Serif",
  "Georgia": "Serif",
  "Garamond": "Serif",
  "Baskerville": "Serif",
  "Merriweather": "Serif",
  "Playfair Display": "Serif",
  "Lora": "Serif",
  "PT Serif": "Serif",
  "Crimson Text": "Serif",
  "EB Garamond": "Serif",
  "Libre Baskerville": "Serif",
  "Cormorant": "Serif",
  "Spectral": "Serif",
  "Bitter": "Serif",
  "Bodoni": "Serif",
  "Caslon": "Serif",
  "Didot": "Serif",

  // Display
  "Impact": "Display",
  "Bebas Neue": "Display",
  "Oswald": "Display",
  "Lobster": "Display",
  "Pacifico": "Display",
  "Anton": "Display",
  "Righteous": "Display",
  "Bangers": "Display",
  "Permanent Marker": "Display",
  "Archivo Black": "Display",
  "Black Ops One": "Display",
  "Bungee": "Display",
  "Comfortaa": "Display",
  "Fredoka": "Display",
  "Alfa Slab One": "Display",
  "Titan One": "Display",
  "Lexend": "Display",

  // Handwriting
  "Brush Script": "Handwriting",
  "Dancing Script": "Handwriting",
  "Satisfy": "Handwriting",
  "Great Vibes": "Handwriting",
  "Allura": "Handwriting",
  "Kaushan Script": "Handwriting",
  "Caveat": "Handwriting",
  "Amatic SC": "Handwriting",
  "Indie Flower": "Handwriting",
  "Sacramento": "Handwriting",
  "Cookie": "Handwriting",

  // Monospace
  "Courier": "Monospace",
  "Courier New": "Monospace",
  "Consolas": "Monospace",
  "Monaco": "Monospace",
  "Inconsolata": "Monospace",
  "Source Code Pro": "Monospace",
  "Fira Code": "Monospace",
  "JetBrains Mono": "Monospace",
  "IBM Plex Mono": "Monospace",
  "Roboto Mono": "Monospace",
  "Space Mono": "Monospace",
};

export function getFontCategory(fontName: string): FontCategory {
  // Přesná shoda
  if (FONT_CATEGORIES[fontName]) {
    return FONT_CATEGORIES[fontName];
  }

  // Pokus o částečnou shodu (case insensitive)
  const lowerFont = fontName.toLowerCase();
  for (const [key, category] of Object.entries(FONT_CATEGORIES)) {
    if (lowerFont.includes(key.toLowerCase()) || key.toLowerCase().includes(lowerFont)) {
      return category;
    }
  }

  // Heuristika podle klíčových slov v názvu
  if (lowerFont.includes("sans") || lowerFont.includes("grotesk") || lowerFont.includes("gothic")) {
    return "Sans Serif";
  }
  if (lowerFont.includes("serif")) {
    return "Serif";
  }
  if (lowerFont.includes("mono") || lowerFont.includes("code")) {
    return "Monospace";
  }
  if (lowerFont.includes("script") || lowerFont.includes("handwriting") || lowerFont.includes("brush")) {
    return "Handwriting";
  }
  if (lowerFont.includes("display") || lowerFont.includes("decorative") || lowerFont.includes("title")) {
    return "Display";
  }

  return "Other";
}

export const FONT_CATEGORY_OPTIONS: FontCategory[] = [
  "Sans Serif",
  "Serif",
  "Display",
  "Handwriting",
  "Monospace",
  "Other"
];
