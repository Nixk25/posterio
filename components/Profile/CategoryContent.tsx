"use client";
import React, { useRef, useState } from "react";
import { PosterType } from "@/app/(pages)/poster/[slug]/page";
import Link from "next/link";
import { deletePoster, updatePoster } from "@/actions/posterActions";
import { toast } from "sonner";
import FilteredPosters from "../FilteredPosters";
import { useRouter } from "next/navigation";

const CategoryContent = ({
  activeCategory,
  userPosters,
  setUserPosters,
}: {
  activeCategory: string;
  userPosters: PosterType[];
  setUserPosters: React.Dispatch<React.SetStateAction<PosterType[]>>;
}) => {
  const router = useRouter();
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [updateDialog, setUpdateDialog] = useState(false);
  const [selectedPosterId, setSelectedPosterId] = useState<string | null>(null);
  const [editingPoster, setEditingPoster] = useState<PosterType | null>(null);
  const filteredPosters = activeCategory === "My posts" ? userPosters : [];

  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    isDragging.current = true;
    startX.current = e.pageX - containerRef.current.offsetLeft;
    scrollLeft.current = containerRef.current.scrollLeft;
  };

  const handleMouseLeaveOrUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    containerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleDelete = async () => {
    if (!selectedPosterId) return;

    try {
      await deletePoster(selectedPosterId);
      setUserPosters((prev) => prev.filter((p) => p.id !== selectedPosterId));
      toast.success("Poster deleted successfully", {
        description: "We hope you will make another poster soon!",
      });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong";

      toast.error("We couldn't delete the poster", {
        description: errorMessage,
      });
    } finally {
      setDeleteDialog(false);
      setSelectedPosterId(null);
    }
  };

  const handleEditClick = (posterId: string) => {
    const poster = userPosters.find((p) => p.id === posterId);
    if (poster) {
      setEditingPoster(poster);
      setSelectedPosterId(posterId);
      setUpdateDialog(true);
    }
  };

  const handleEdit = async () => {
    if (!selectedPosterId || !editingPoster) return;

    try {
      const result = await updatePoster(selectedPosterId, editingPoster);

      if (result.success) {
        router.push(`/poster/${selectedPosterId}`);
        toast.success("Poster updated successfully", {
          description: "Your changes have been saved!",
        });
      } else {
        toast.error("We couldn't update the poster", {
          description: result.error || "Something went wrong",
        });
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong";

      toast.error("We couldn't update the poster", {
        description: errorMessage,
      });
    } finally {
      setUpdateDialog(false);
      setSelectedPosterId(null);
      setEditingPoster(null);
    }
  };

  const handleInputChange = (
    field: keyof PosterType,
    value: string | string[]
  ) => {
    if (!editingPoster) return;
    setEditingPoster((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  return (
    <div
      ref={containerRef}
      className="w-full overflow-x-auto cursor-grab active:cursor-grabbing snap-x snap-mandatory scroll-smooth relative"
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeaveOrUp}
      onMouseUp={handleMouseLeaveOrUp}
      onMouseMove={handleMouseMove}
    >
      <div className="flex gap-5 w-max px-4">
        {filteredPosters.length > 0 ? (
          <FilteredPosters
            filteredPosters={filteredPosters}
            selectedPosterId={selectedPosterId}
            editingPoster={editingPoster}
            deleteDialog={deleteDialog}
            updateDialog={updateDialog}
            handleEditClick={handleEditClick}
            handleInputChange={handleInputChange}
            setUpdateDialog={setUpdateDialog}
            setDeleteDialog={setDeleteDialog}
            setSelectedPosterId={setSelectedPosterId}
            setEditingPoster={setEditingPoster}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        ) : (
          <Link
            href="/upload"
            className="h-[300px] text-3xl flex-col flex justify-center"
          >
            <span>You don&apos;t have any posters</span>
            <span className="underline hover:text-accent transition-all duration-300 ease-in-out">
              Upload some
            </span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default CategoryContent;
