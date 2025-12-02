"use server";
import prisma from "@/lib/prisma";
import { COLOR_GROUPS } from "@/lib/colorUtils";
import { PREDEFINED_CATEGORIES } from "@/lib/categories";
import { FONT_CATEGORY_OPTIONS } from "@/lib/fontCategories";
import { unstable_cache } from "next/cache";

export const getFilterOptions = unstable_cache(
  async () => {
  // Fetch only the fields we need for filters (much faster than fetching all data)
  const posters = await prisma.poster.findMany({
    select: {
      tools: true,
      colorGroups: true,
      fontCategories: true,
      posterCategories: {
        select: {
          category: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  // Get unique values from database
  const allTools = [...new Set(posters.flatMap((p) => p.tools))];
  const allColorGroups = [...new Set(posters.flatMap((p) => p.colorGroups))];
  const allFontCategories = [
    ...new Set(posters.flatMap((p) => p.fontCategories)),
  ];
  const allCategories = [
    ...new Set(
      posters.flatMap((p) => p.posterCategories.map((pc) => pc.category.name))
    ),
  ];

  // Filter predefined options to only show those that exist in database
  const existingCategories = PREDEFINED_CATEGORIES.filter((c) =>
    allCategories.includes(c)
  );
  const existingColors = COLOR_GROUPS.filter((c) =>
    allColorGroups.includes(c)
  );
  const existingFonts = FONT_CATEGORY_OPTIONS.filter((f) =>
    allFontCategories.includes(f)
  );

    return {
      categories: existingCategories.map((c) => ({ label: c, value: c })),
      colors: existingColors.map((c) => ({ label: c, value: c, color: true })),
      fonts: existingFonts.map((f) => ({ label: f, value: f })),
      tools: allTools.map((t) => ({ label: t, value: t })),
    };
  },
  ["filter-options"],
  {
    revalidate: 60, // Cache for 60 seconds
    tags: ["filter-options"],
  }
);

type FilterInput = {
  categories?: string[];
  colors?: string[];
  fonts?: string[];
  tools?: string[];
};

export const filterPosters = async (filters: FilterInput) => {
  const { categories, colors, fonts, tools } = filters;

  const posters = await prisma.poster.findMany({
    where: {
      AND: [
        categories && categories.length > 0
          ? {
              posterCategories: {
                some: {
                  category: {
                    name: { in: categories },
                  },
                },
              },
            }
          : {},
        colors && colors.length > 0
          ? { colorGroups: { hasSome: colors } }
          : {},
        fonts && fonts.length > 0
          ? { fontCategories: { hasSome: fonts } }
          : {},
        tools && tools.length > 0 ? { tools: { hasSome: tools } } : {},
      ],
    },
    include: {
      posterCategories: {
        include: {
          category: true,
        },
      },
    },
  });

  return posters;
};
