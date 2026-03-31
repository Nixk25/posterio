import prisma from "../lib/prisma";
import { getColorGroups } from "../lib/colorUtils";
import { getFontCategory } from "../lib/fontCategories";

const POSTER_DATA = [
  {
    title: "Neon Dreams",
    description: "A vibrant neon-inspired poster with bold typography",
    fonts: ["Bebas Neue", "Inter"],
    colors: ["#FF006E", "#8338EC", "#3A86FF"],
    tools: ["Figma"],
    tags: ["Modern", "Typography"],
    imgUrl: "https://picsum.photos/seed/poster1/800/1200",
  },
  {
    title: "Minimal Horizon",
    description: "Clean minimalist design with horizon line",
    fonts: ["Helvetica", "Futura"],
    colors: ["#FFFFFF", "#000000", "#E0E0E0"],
    tools: ["Illustrator"],
    tags: ["Minimal", "Abstract"],
    imgUrl: "https://picsum.photos/seed/poster2/800/1200",
  },
  {
    title: "Retro Wave",
    description: "80s inspired synthwave poster design",
    fonts: ["Monoton", "Roboto"],
    colors: ["#FF00FF", "#00FFFF", "#FFD700"],
    tools: ["Photoshop"],
    tags: ["Retro", "Vintage"],
    imgUrl: "https://picsum.photos/seed/poster3/800/1200",
  },
  {
    title: "Organic Flow",
    description: "Flowing organic shapes in earthy tones",
    fonts: ["Playfair Display", "Lato"],
    colors: ["#2D6A4F", "#52B788", "#D8F3DC"],
    tools: ["Illustrator"],
    tags: ["Abstract", "Modern"],
    imgUrl: "https://picsum.photos/seed/poster4/800/1200",
  },
  {
    title: "Brutalist Statement",
    description: "Raw brutalist design with heavy type",
    fonts: ["Impact", "Courier New"],
    colors: ["#000000", "#FF0000", "#FFFFFF"],
    tools: ["Figma"],
    tags: ["Typography", "Modern"],
    imgUrl: "https://picsum.photos/seed/poster5/800/1200",
  },
  {
    title: "Pastel Geometry",
    description: "Soft pastel geometric composition",
    fonts: ["Poppins", "Quicksand"],
    colors: ["#FFB5A7", "#FCD5CE", "#A8DADC"],
    tools: ["Figma"],
    tags: ["Geometric", "Minimal"],
    imgUrl: "https://picsum.photos/seed/poster6/800/1200",
  },
  {
    title: "Dark Matter",
    description: "Deep space inspired dark poster",
    fonts: ["Orbitron", "Space Mono"],
    colors: ["#0D1B2A", "#1B263B", "#415A77"],
    tools: ["Photoshop"],
    tags: ["Abstract", "Modern"],
    imgUrl: "https://picsum.photos/seed/poster7/800/1200",
  },
  {
    title: "Swiss Grid",
    description: "Classic Swiss design grid system poster",
    fonts: ["Helvetica", "Univers"],
    colors: ["#FFFFFF", "#FF0000", "#000000"],
    tools: ["Illustrator"],
    tags: ["Typography", "Minimal"],
    imgUrl: "https://picsum.photos/seed/poster8/800/1200",
  },
  {
    title: "Gradient Sunset",
    description: "Warm gradient poster inspired by sunsets",
    fonts: ["Montserrat", "Open Sans"],
    colors: ["#FF6B35", "#F7C59F", "#1A535C"],
    tools: ["Figma"],
    tags: ["Abstract", "Modern"],
    imgUrl: "https://picsum.photos/seed/poster9/800/1200",
  },
  {
    title: "Kinetic Type",
    description: "Dynamic typographic poster with motion feel",
    fonts: ["Anton", "Roboto Mono"],
    colors: ["#E63946", "#F1FAEE", "#457B9D"],
    tools: ["Adobe XD"],
    tags: ["Typography", "Modern"],
    imgUrl: "https://picsum.photos/seed/poster10/800/1200",
  },
  {
    title: "Paper Cut",
    description: "Paper cut style layered illustration",
    fonts: ["Merriweather", "Source Sans Pro"],
    colors: ["#264653", "#2A9D8F", "#E9C46A"],
    tools: ["Illustrator"],
    tags: ["Abstract", "Vintage"],
    imgUrl: "https://picsum.photos/seed/poster11/800/1200",
  },
  {
    title: "Glitch Art",
    description: "Digital glitch aesthetic poster",
    fonts: ["VT323", "Press Start 2P"],
    colors: ["#00FF41", "#FF0090", "#0000FF"],
    tools: ["Photoshop"],
    tags: ["Modern", "Abstract"],
    imgUrl: "https://picsum.photos/seed/poster12/800/1200",
  },
  {
    title: "Bauhaus Circle",
    description: "Bauhaus inspired geometric circles",
    fonts: ["Futura", "Gill Sans"],
    colors: ["#FFC300", "#C70039", "#003049"],
    tools: ["Illustrator"],
    tags: ["Geometric", "Vintage"],
    imgUrl: "https://picsum.photos/seed/poster13/800/1200",
  },
  {
    title: "Mono Print",
    description: "Monochrome print style design",
    fonts: ["IBM Plex Mono", "Inter"],
    colors: ["#212529", "#495057", "#ADB5BD"],
    tools: ["Figma"],
    tags: ["Minimal", "Typography"],
    imgUrl: "https://picsum.photos/seed/poster14/800/1200",
  },
  {
    title: "Tropical Bloom",
    description: "Tropical botanical poster with vivid colors",
    fonts: ["Pacifico", "Nunito"],
    colors: ["#06D6A0", "#FFD166", "#EF476F"],
    tools: ["Photoshop"],
    tags: ["Modern", "Abstract"],
    imgUrl: "https://picsum.photos/seed/poster15/800/1200",
  },
  {
    title: "Urban Grid",
    description: "City inspired architectural grid layout",
    fonts: ["Oswald", "Noto Sans"],
    colors: ["#333333", "#666666", "#CCCCCC"],
    tools: ["Figma"],
    tags: ["Minimal", "Geometric"],
    imgUrl: "https://picsum.photos/seed/poster16/800/1200",
  },
  {
    title: "Liquid Chrome",
    description: "Metallic liquid chrome 3D render poster",
    fonts: ["Space Grotesk", "Syne"],
    colors: ["#B8C0FF", "#E7C6FF", "#BBD0FF"],
    tools: ["Blender"],
    tags: ["Modern", "Abstract"],
    imgUrl: "https://picsum.photos/seed/poster17/800/1200",
  },
  {
    title: "Woodblock Print",
    description: "Japanese woodblock print inspired poster",
    fonts: ["Noto Serif JP", "Crimson Text"],
    colors: ["#BC4749", "#386641", "#F2E8CF"],
    tools: ["Illustrator"],
    tags: ["Vintage", "Abstract"],
    imgUrl: "https://picsum.photos/seed/poster18/800/1200",
  },
  {
    title: "Data Viz",
    description: "Data visualization turned into art poster",
    fonts: ["Fira Code", "Inter"],
    colors: ["#4361EE", "#3A0CA3", "#7209B7"],
    tools: ["Figma"],
    tags: ["Modern", "Geometric"],
    imgUrl: "https://picsum.photos/seed/poster19/800/1200",
  },
  {
    title: "Risograph Layers",
    description: "Risograph print style overlapping layers",
    fonts: ["Work Sans", "Libre Baskerville"],
    colors: ["#FF595E", "#FFCA3A", "#1982C4"],
    tools: ["Photoshop"],
    tags: ["Vintage", "Abstract"],
    imgUrl: "https://picsum.photos/seed/poster20/800/1200",
  },
  {
    title: "Noise Texture",
    description: "Grainy noise texture minimal poster",
    fonts: ["Satoshi", "General Sans"],
    colors: ["#F8F9FA", "#DEE2E6", "#343A40"],
    tools: ["Figma"],
    tags: ["Minimal", "Abstract"],
    imgUrl: "https://picsum.photos/seed/poster21/800/1200",
  },
  {
    title: "Isometric World",
    description: "Isometric 3D illustration poster",
    fonts: ["Rubik", "Karla"],
    colors: ["#FF6B6B", "#4ECDC4", "#45B7D1"],
    tools: ["Blender", "Figma"],
    tags: ["Geometric", "Modern"],
    imgUrl: "https://picsum.photos/seed/poster22/800/1200",
  },
  {
    title: "Type Specimen",
    description: "Font specimen display poster",
    fonts: ["Clash Display", "Cabinet Grotesk"],
    colors: ["#000000", "#FFFFFF", "#FF4444"],
    tools: ["Figma"],
    tags: ["Typography", "Minimal"],
    imgUrl: "https://picsum.photos/seed/poster23/800/1200",
  },
  {
    title: "Acid Graphics",
    description: "Acid house rave inspired graphics",
    fonts: ["Archivo Black", "Space Mono"],
    colors: ["#DFFF00", "#FF00FF", "#000000"],
    tools: ["Photoshop"],
    tags: ["Retro", "Modern"],
    imgUrl: "https://picsum.photos/seed/poster24/800/1200",
  },
  {
    title: "Watercolor Wash",
    description: "Soft watercolor washes with serif type",
    fonts: ["Cormorant Garamond", "Lora"],
    colors: ["#A2D2FF", "#BDE0FE", "#FFAFCC"],
    tools: ["Photoshop"],
    tags: ["Abstract", "Vintage"],
    imgUrl: "https://picsum.photos/seed/poster25/800/1200",
  },
  {
    title: "Constructivism",
    description: "Russian constructivist art inspired poster",
    fonts: ["Oswald", "Bebas Neue"],
    colors: ["#D90429", "#EF233C", "#2B2D42"],
    tools: ["Illustrator"],
    tags: ["Vintage", "Typography"],
    imgUrl: "https://picsum.photos/seed/poster26/800/1200",
  },
  {
    title: "Holographic Foil",
    description: "Holographic iridescent foil effect poster",
    fonts: ["Plus Jakarta Sans", "DM Sans"],
    colors: ["#C8B6FF", "#E2CFEA", "#A0C4FF"],
    tools: ["Figma", "Photoshop"],
    tags: ["Modern", "Abstract"],
    imgUrl: "https://picsum.photos/seed/poster27/800/1200",
  },
];

async function seed() {
  // Get first user
  const user = await prisma.user.findFirst();
  if (!user) {
    console.error("No user found. Create a user first.");
    await prisma.$disconnect();
    return;
  }

  console.log(`Seeding posters for user: ${user.name} (${user.id})`);

  for (const data of POSTER_DATA) {
    const colorGroups = getColorGroups(data.colors);
    const fontCategories = [...new Set(data.fonts.map(f => getFontCategory(f)))];

    const categories = await Promise.all(
      data.tags.map(async (tag) => {
        return prisma.category.upsert({
          where: { name: tag },
          update: {},
          create: { name: tag },
        });
      })
    );

    const poster = await prisma.poster.create({
      data: {
        title: data.title,
        description: data.description,
        fonts: data.fonts,
        fontCategories,
        colors: data.colors,
        colorGroups,
        tools: data.tools,
        socials: [],
        views: Math.floor(Math.random() * 500),
        imgUrl: data.imgUrl,
        userId: user.id,
        categoryIds: categories.map(c => c.id),
        posterCategories: {
          create: categories.map((category) => ({
            category: { connect: { id: category.id } },
          })),
        },
      },
    });

    console.log(`Created: ${poster.title}`);
  }

  // Generate blur placeholders
  console.log("\nGenerating blur placeholders...");
  const { getPlaiceholder } = await import("plaiceholder");

  const postersWithoutBlur = await prisma.poster.findMany({
    select: { id: true, imgUrl: true, blurDataURL: true },
  });

  const needsBlur = postersWithoutBlur.filter(p => !p.blurDataURL?.startsWith("data:"));

  for (const poster of needsBlur) {
    try {
      const buffer = await fetch(poster.imgUrl).then(async (res) =>
        Buffer.from(await res.arrayBuffer())
      );
      const { base64 } = await getPlaiceholder(buffer);
      await prisma.poster.update({
        where: { id: poster.id },
        data: { blurDataURL: base64 },
      });
      console.log(`Blur: ${poster.id}`);
    } catch (error) {
      console.error(`Blur failed for ${poster.id}:`, error);
    }
  }

  console.log(`\nDone! Seeded ${POSTER_DATA.length} posters.`);
  await prisma.$disconnect();
}

seed();
