import prisma from "../lib/prisma";
import { getPlaiceholder } from "plaiceholder";

async function migrateBlurData() {
  // Fetch ALL posters and filter those without a valid blurDataURL
  const allPosters = await prisma.poster.findMany({
    select: { id: true, imgUrl: true, blurDataURL: true },
  });

  const posters = allPosters.filter(
    (p) => !p.blurDataURL || !p.blurDataURL.startsWith("data:")
  );

  console.log(`Total posters: ${allPosters.length}, need blur: ${posters.length}`);

  for (const poster of posters) {
    try {
      const buffer = await fetch(poster.imgUrl).then(async (res) =>
        Buffer.from(await res.arrayBuffer())
      );
      const { base64 } = await getPlaiceholder(buffer);

      await prisma.poster.update({
        where: { id: poster.id },
        data: { blurDataURL: base64 },
      });

      console.log(`Updated poster ${poster.id}`);
    } catch (error) {
      console.error(`Failed for poster ${poster.id}:`, error);
    }
  }

  console.log("Migration complete");
  await prisma.$disconnect();
}

migrateBlurData();
