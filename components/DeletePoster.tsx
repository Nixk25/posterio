import React from "react";
import { motion } from "framer-motion";

interface DeletePosterProps {
  setDeleteDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedPosterId: React.Dispatch<React.SetStateAction<string | null>>;

  handleDelete: () => Promise<void>;
}

const DeletePoster: React.FC<DeletePosterProps> = ({
  setDeleteDialog,
  setSelectedPosterId,

  handleDelete,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: "100%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "100%" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-2 bg-white p-10 w-[80%] shadow-lg z-50 cursor-auto"
    >
      <p>Are you sure you want to delete this poster?</p>
      <button
        onClick={handleDelete}
        className="bg-accent px-4 py-2 rounded-md hover:bg-red-400 transition-all duration-300 ease-in-out cursor-pointer"
      >
        Yes, delete
      </button>
      <button
        onClick={() => {
          setDeleteDialog(false);
          setSelectedPosterId(null);
        }}
        className="cursor-pointer text-xs text-slate-500 hover:text-black"
      >
        No thanks
      </button>
    </motion.div>
  );
};

export default DeletePoster;
