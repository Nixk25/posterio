"use server";

import prisma from "@/lib/prisma";

export interface SearchParams {
  query: string;
  filters?: {
    categories?: string[];
    colorGroups?: string[];
    fontCategories?: string[];
    tools?: string[];
  };
}

export async function searchPosters({ query, filters }: SearchParams) {
  try {
    // Get all posters first
    const allPosters = await prisma.poster.findMany({
      include: {
        posterCategories: { include: { category: true } },
        user: { select: { name: true, email: true } },
      },
    });

    // Filter posters based on search query
    const searchLower = query.toLowerCase();
    let results = allPosters.filter((poster) => {
      // Search in title
      if (poster.title?.toLowerCase().includes(searchLower)) return true;

      // Search in description
      if (poster.description?.toLowerCase().includes(searchLower)) return true;

      // Search in fonts array
      if (poster.fonts?.some((font) => font.toLowerCase().includes(searchLower)))
        return true;

      // Search in fontCategories array
      if (
        poster.fontCategories?.some((fc) => fc.toLowerCase().includes(searchLower))
      )
        return true;

      // Search in tools array
      if (poster.tools?.some((tool) => tool.toLowerCase().includes(searchLower)))
        return true;

      // Search in colors array
      if (poster.colors?.some((color) => color.toLowerCase().includes(searchLower)))
        return true;

      // Search in colorGroups array
      if (
        poster.colorGroups?.some((cg) => cg.toLowerCase().includes(searchLower))
      )
        return true;

      // Search in categories
      if (
        poster.posterCategories?.some((pc) =>
          pc.category.name.toLowerCase().includes(searchLower)
        )
      )
        return true;

      // Search in user name
      if (poster.user?.name?.toLowerCase().includes(searchLower)) return true;

      return false;
    });

    // Apply filters if provided
    if (filters) {
      if (filters.colorGroups && filters.colorGroups.length > 0) {
        results = results.filter((poster) =>
          poster.colorGroups?.some((cg) => filters.colorGroups!.includes(cg))
        );
      }

      if (filters.fontCategories && filters.fontCategories.length > 0) {
        results = results.filter((poster) =>
          poster.fontCategories?.some((fc) =>
            filters.fontCategories!.includes(fc)
          )
        );
      }

      if (filters.tools && filters.tools.length > 0) {
        results = results.filter((poster) =>
          poster.tools?.some((tool) => filters.tools!.includes(tool))
        );
      }

      if (filters.categories && filters.categories.length > 0) {
        results = results.filter((poster) =>
          poster.posterCategories?.some((pc) =>
            filters.categories!.includes(pc.category.name)
          )
        );
      }
    }

    // Sort by views and createdAt
    results.sort((a, b) => {
      if (b.views !== a.views) {
        return b.views - a.views;
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return {
      success: true,
      data: results,
      nbHits: results.length,
    };
  } catch (error) {
    console.error("Error searching posters:", error);
    return {
      success: false,
      error: "Failed to search posters",
      data: [],
      nbHits: 0,
    };
  }
}
