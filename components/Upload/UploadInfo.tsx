"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import InputBoosted from "../InputBoosted";
import { PosterDetails } from "./UploadPage";
import { PREDEFINED_CATEGORIES } from "@/lib/categories";

type UploadInfoProps = {
  field: keyof PosterDetails;
  label: string;
  posterDetails: PosterDetails;
  setPosterDetails: React.Dispatch<React.SetStateAction<PosterDetails>>;
  canRename?: boolean;
  bgColor?: string;
  isText?: boolean;
  required?: boolean;
};

const UploadInfo: React.FC<UploadInfoProps> = ({
  field,
  label,
  posterDetails,
  setPosterDetails,
  canRename = true,
  bgColor = "#fff",
  isText = false,
  required = true,
}) => {
  const isArrayField = !isText && Array.isArray(posterDetails[field]);
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const tags = isArrayField ? (posterDetails[field] as string[]) || [] : [];

  const isTagsField = field === "tags";

  const filteredSuggestions = isTagsField && inputValue.trim()
    ? PREDEFINED_CATEGORIES.filter(
        (cat) =>
          cat.toLowerCase().includes(inputValue.toLowerCase()) &&
          !tags.includes(cat)
      )
    : [];

  const addTag = (value: string) => {
    const newTag = value.trim();
    if (newTag && !tags.includes(newTag)) {
      const updatedTags = [...tags, newTag];
      setPosterDetails((prev) => ({
        ...prev,
        [field]: updatedTags,
      }));
      setInputValue("");
      setShowSuggestions(false);
    }
  };

  const removeTag = (index: number) => {
    const updatedTags = tags.filter((_, i) => i !== index);
    setPosterDetails((prev) => ({
      ...prev,
      [field]: updatedTags,
    }));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isArrayField && e.key === "Enter") {
      e.preventDefault();
      addTag(inputValue);
      setInputValue("");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (isArrayField) {
      setInputValue(value);
      if (isTagsField) {
        setShowSuggestions(value.trim().length > 0);
      }
    } else {
      setPosterDetails((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(10px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="flex flex-col justify-center relative"
    >
      <span className="font-bold detailHeadline text-3xl mb-2">{label}</span>

      <InputBoosted
        value={isArrayField ? inputValue : (posterDetails[field] as string)}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        name={label}
        canRename={canRename}
        bgColor={bgColor}
        required={required}
      />

      {isTagsField && showSuggestions && filteredSuggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-black shadow-lg z-50 max-h-48 overflow-y-auto">
          {filteredSuggestions.map((suggestion, index) => (
            <button
              key={index}
              type="button"
              onClick={() => addTag(suggestion)}
              className="w-full text-left px-3 py-2 hover:bg-accent transition-colors cursor-pointer"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}

      {isArrayField && tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {tags.map((tag, index) => (
            <div
              key={index}
              className="flex items-center bg-accent px-3 py-1 text-sm"
            >
              <span>{tag}</span>
              <button
                type="button"
                onClick={() => removeTag(index)}
                className="ml-2 textxl hover:text-red-400 cursor-pointer"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default UploadInfo;
