import BigTextEffect from "@/components/Login/BigTextEffect";
import DetailSection from "@/components/PosterDetail/DetailSection";
import prisma from "@/lib/prisma";
import React from "react";
export type PosterType = {
  id?: string;
  title: string;
  description: string | null;
  fonts: string[];
  colors: string[];
  tools: string[];
  views?: number;
  socials?: string[];
  imgUrl: string;
  tags?: string[];
  categoryIds?: string[];
  userId?: string;

  createdAt?: Date;
  updatedAt?: Date;

  user?: {
    name: string;
    email: string;
  };

  posterCategories?: {
    category: {
      id: string;
      name: string;
    };
  }[];
};
const Poster = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const index = slug;
  const poster = await prisma.poster.findUnique({
    where: {
      id: index,
    },
    include: {
      posterCategories: {
        include: {
          category: true,
        },
      },
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  if (!poster) {
    return <h1 className="p-8 text-2xl">Poster not found 🚫</h1>;
  }

  await prisma.poster.update({
    where: {
      id: index,
    },
    data: {
      views: poster.views + 1,
    },
  });

  return (
    <div className="flex flex-col   items-center justify-center overflow-hidden">
      <BigTextEffect headline={poster.title} direction={1} />
      <DetailSection poster={poster} />
    </div>
  );
};

export default Poster;
