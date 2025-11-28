import prisma from "../lib/prisma";
import { getColorGroups } from "../lib/colorUtils";

async function migrateColorGroups() {
  console.log("Starting color groups migration...");

  const posters = await prisma.poster.findMany({
    where: {
      OR: [
        { colorGroups: { equals: [] } },
        { colorGroups: undefined }
      ]
    },
  });

  console.log(`Found ${posters.length} posters to migrate`);

  for (const poster of posters) {
    const colorGroups = getColorGroups(poster.colors);

    await prisma.poster.update({
      where: { id: poster.id },
      data: { colorGroups },
    });

    console.log(`Updated poster ${poster.id} with color groups: ${colorGroups.join(", ")}`);
  }

  console.log("Migration completed!");
}

migrateColorGroups()
  .catch((error) => {
    console.error("Migration failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
