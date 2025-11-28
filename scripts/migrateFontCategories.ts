import prisma from "../lib/prisma";
import { getFontCategory } from "../lib/fontCategories";

async function migrateFontCategories() {
  console.log("Starting font categories migration...");

  const posters = await prisma.poster.findMany({
    where: {
      OR: [
        { fontCategories: { equals: [] } },
        { fontCategories: undefined }
      ]
    },
  });

  console.log(`Found ${posters.length} posters to migrate`);

  for (const poster of posters) {
    const fontCategories = [...new Set(poster.fonts.map(font => getFontCategory(font)))];

    await prisma.poster.update({
      where: { id: poster.id },
      data: { fontCategories },
    });

    console.log(`Updated poster ${poster.id} with font categories: ${fontCategories.join(", ")}`);
    console.log(`  Fonts: ${poster.fonts.join(", ")}`);
  }

  console.log("Migration completed!");
}

migrateFontCategories()
  .catch((error) => {
    console.error("Migration failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
