import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { PosterType } from "@/app/(pages)/poster/[slug]/page";
import DeletePoster from "./DeletePoster";
import EditPoster from "./EditPoster";

interface FilteredPostersProps {
  filteredPosters: PosterType[];
  selectedPosterId: string | null;
  editingPoster: PosterType | null;
  deleteDialog: boolean;
  updateDialog: boolean;
  handleEditClick: (posterId: string) => void;
  handleInputChange: (
    field: keyof PosterType,
    value: string | string[]
  ) => void;
  setUpdateDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedPosterId: React.Dispatch<React.SetStateAction<string | null>>;
  setEditingPoster: React.Dispatch<React.SetStateAction<PosterType | null>>;
  handleDelete: () => Promise<void>;
  handleEdit: () => Promise<void>;
}

const FilteredPosters: React.FC<FilteredPostersProps> = ({
  filteredPosters,
  selectedPosterId,
  editingPoster,
  deleteDialog,
  updateDialog,
  handleEditClick,
  handleInputChange,
  setUpdateDialog,
  setDeleteDialog,
  setSelectedPosterId,
  setEditingPoster,
  handleDelete,
  handleEdit,
}) => {
  return (
    <>
      {filteredPosters.map((poster, i) => (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 * (2 + i) }}
          key={poster.id}
          className="flex flex-col h-full mt-5 mb-10 scroll-snap-start snap-center select-none group relative"
        >
          <Link
            href={`/poster/${poster.id}`}
            className="flex flex-col gap-2 border select-none"
            draggable={false}
          >
            <div className="flex flex-col p-2">
              <h3 className="text-lg font-semibold">{poster.title}</h3>
              <div className="flex flex-wrap gap-1 mt-1">
                {poster.posterCategories!.map((catObj, idx) => (
                  <span key={idx} className="bg-accent text-xs px-2 py-0.5">
                    {catObj.category.name}
                  </span>
                ))}
              </div>
            </div>
            <div className="h-[700px] w-[500px] mx-auto relative">
              <Image
                src={poster.imgUrl}
                alt={poster.title}
                className="w-full h-full object-cover group-hover:blur-md transition-all duration-300 ease-in-out"
                width={300}
                height={600}
                draggable="false"
                placeholder="blur"
                blurDataURL={poster.colors[0]}
              />
              <div className="absolute top-0 left-0 w-full h-full bg-black group-hover:opacity-70 opacity-0 z-10 transition-all duration-300 ease-in-out">
                <div className="absolute group-hover:opacity-100 opacity-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-5">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleEditClick(poster.id!);
                    }}
                    className="flex border rounded-full p-4 text-white border-white justify-center items-center hover:text-accent transition-colors duration-300 ease-in-out cursor-pointer hover:border-accent"
                  >
                    <Pencil />
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedPosterId(poster.id!);
                      setDeleteDialog(true);
                    }}
                    className="flex border rounded-full p-4 text-white border-white justify-center items-center hover:text-red-400 transition-colors duration-300 ease-in-out cursor-pointer hover:border-red-400"
                  >
                    <Trash2 />
                  </button>
                </div>
              </div>
            </div>
          </Link>
          <AnimatePresence>
            {deleteDialog && selectedPosterId === poster.id && (
              <DeletePoster
                key="deletePosterDialog"
                setDeleteDialog={setDeleteDialog}
                setSelectedPosterId={setSelectedPosterId}
                handleDelete={handleDelete}
              />
            )}
          </AnimatePresence>

          <AnimatePresence>
            {updateDialog && selectedPosterId === poster.id && (
              <EditPoster
                key="updatePosterDialog"
                editingPoster={editingPoster}
                handleInputChange={handleInputChange}
                setUpdateDialog={setUpdateDialog}
                setSelectedPosterId={setSelectedPosterId}
                setEditingPoster={setEditingPoster}
                handleEdit={handleEdit}
              />
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </>
  );
};

export default FilteredPosters;
