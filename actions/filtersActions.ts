"use server";
import prisma from "@/lib/prisma";
import { COLOR_GROUPS } from "@/lib/colorUtils";
import { PREDEFINED_CATEGORIES } from "@/lib/categories";
import { FONT_CATEGORY_OPTIONS } from "@/lib/fontCategories";

export const getFilterOptions = async () => {
  const posters = await prisma.poster.findMany({
    select: { tools: true },
  });

  const allTools = [...new Set(posters.flatMap((p) => p.tools))];

  return {
    categories: PREDEFINED_CATEGORIES.map((c) => ({ label: c, value: c })),
    colors: COLOR_GROUPS.map((c) => ({ label: c, value: c, color: true })),
    fonts: FONT_CATEGORY_OPTIONS.map((f) => ({ label: f, value: f })),
    tools: allTools.map((t) => ({ label: t, value: t })),
  };
};

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
