import React from "react";
import { motion } from "framer-motion";
import { PosterType } from "@/app/(pages)/poster/[slug]/page";
import InputBoosted from "@/components/InputBoosted";

interface EditPosterProps {
  editingPoster: PosterType | null;

  handleInputChange: (
    field: keyof PosterType,
    value: string | string[]
  ) => void;
  setUpdateDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedPosterId: React.Dispatch<React.SetStateAction<string | null>>;
  setEditingPoster: React.Dispatch<React.SetStateAction<PosterType | null>>;
  handleEdit: () => Promise<void>;
}

const EditPoster: React.FC<EditPosterProps> = ({
  editingPoster,

  handleInputChange,
  setUpdateDialog,
  setSelectedPosterId,
  setEditingPoster,
  handleEdit,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: "100%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "100%" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4 bg-white p-6 w-[90%] max-h-[80vh] overflow-y-auto shadow-lg z-50 cursor-auto"
    >
      <h3 className="text-xl font-semibold">Edit Poster</h3>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Title</label>
        <InputBoosted
          value={editingPoster?.title || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleInputChange("title", e.target.value)
          }
          name="Title"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Description</label>
        <InputBoosted
          value={editingPoster?.description || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleInputChange("description", e.target.value)
          }
          name="Description"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Tags (comma separated)</label>
        <InputBoosted
          value={editingPoster?.tags ? editingPoster?.tags.join(", ") : ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleInputChange(
              "tags",
              e.target.value
                .split(",")
                .map((tag) => tag.trim())
                .filter((tag) => tag !== "")
            )
          }
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === ",") {
              e.preventDefault();
              handleInputChange(
                "tags",
                editingPoster?.tags ? [...editingPoster?.tags, ""] : [""]
              );
            }
          }}
          name="Tags"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Fonts (comma separated)</label>
        <InputBoosted
          value={editingPoster?.fonts ? editingPoster?.fonts.join(", ") : ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleInputChange(
              "fonts",
              e.target.value
                .split(",")
                .map((font) => font.trim())
                .filter((font) => font !== "")
            )
          }
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === ",") {
              e.preventDefault();
              handleInputChange(
                "fonts",
                editingPoster?.fonts ? [...editingPoster?.fonts, ""] : [""]
              );
            }
          }}
          name="Fonts"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Tools (comma separated)</label>
        <InputBoosted
          value={editingPoster?.tools ? editingPoster?.tools.join(", ") : ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleInputChange(
              "tools",
              e.target.value
                .split(",")
                .map((tool) => tool.trim())
                .filter((tool) => tool !== "")
            )
          }
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === ",") {
              e.preventDefault();
              handleInputChange(
                "tools",
                editingPoster?.tools ? [...editingPoster?.tools, ""] : [""]
              );
            }
          }}
          name="Tools"
        />
      </div>

      <div className="flex gap-4 mt-4">
        <button
          onClick={handleEdit}
          className="bg-accent px-4 py-2 rounded-md hover:bg-green-500 transition-all duration-300 ease-in-out cursor-pointer"
        >
          Save Changes
        </button>
        <button
          onClick={() => {
            setUpdateDialog(false);
            setSelectedPosterId(null);
            setEditingPoster(null);
          }}
          className="px-4 py-2 border rounded-md hover:bg-gray-100 transition-all duration-300 ease-in-out cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </motion.div>
  );
};

export default EditPoster;
