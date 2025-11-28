export const PREDEFINED_CATEGORIES = [
  "Minimal",
  "Abstract",
  "Typography",
  "Vintage",
  "Modern",
  "Retro",
  "Geometric",
  "Nature",
  "Urban",
  "Illustration",
  "Photography",
  "3D",
  "Collage",
  "Grunge",
  "Elegant",
  "Playful",
  "Dark",
  "Colorful",
  "Monochrome",
  "Experimental"
] as const;

export type PredefinedCategory = typeof PREDEFINED_CATEGORIES[number];
