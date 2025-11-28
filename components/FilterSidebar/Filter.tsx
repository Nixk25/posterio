import React from "react";
import { useFilterContext } from "@/context/FilterContext";

type FilterProps = {
  filter: {
    title: string;
    key: string;
    options: {
      label: string;
      value: string;
      color?: boolean;
    }[];
  };
};

const colorCategories: Record<string, { label: string; bgClass: string }> = {
  Red: { label: "Red", bgClass: "bg-red-500" },
  Blue: { label: "Blue", bgClass: "bg-blue-500" },
  Green: { label: "Green", bgClass: "bg-green-500" },
  Yellow: { label: "Yellow", bgClass: "bg-yellow-400" },
  Orange: { label: "Orange", bgClass: "bg-orange-500" },
  Purple: { label: "Purple", bgClass: "bg-purple-500" },
  Pink: { label: "Pink", bgClass: "bg-pink-500" },
  Brown: { label: "Brown", bgClass: "bg-amber-700" },
  Black: { label: "Black", bgClass: "bg-black" },
  White: { label: "White", bgClass: "bg-white border" },
  Gray: { label: "Gray", bgClass: "bg-gray-500" },
};

const Filter = ({ filter }: FilterProps) => {
  const { filters, toggleFilter } = useFilterContext();

  const isColorFilter = filter.options.some((option) => option.color === true);

  if (isColorFilter) {
    return (
      <div className="pt-9 pb-5 px-5 last:border-r-0 border-r w-full">
        <h3 className="font-semibold text-lg mb-2">{filter.title}</h3>
        <div className="space-y-2 w-max">
          {filter.options.map((option) => {
            const categoryInfo = colorCategories[option.value];
            if (!categoryInfo) return null;

            const isSelected = filters[filter.key]?.includes(option.value);

            return (
              <label
                key={option.value}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="w-4 h-4"
                  checked={isSelected}
                  onChange={() => toggleFilter(filter.key, option.value)}
                />
                <div className="flex items-center space-x-2">
                  <span
                    className={`w-5 h-5 rounded-full border border-gray-400 ${categoryInfo.bgClass}`}
                  />
                  <span>{categoryInfo.label}</span>
                </div>
              </label>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="pt-9 pb-5 px-5 last:border-r-0 border-r w-full">
      <h3 className="font-semibold text-lg mb-2">{filter.title}</h3>
      <div className="space-y-2 w-max">
        {filter.options.map((option) => (
          <label
            key={option.value}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <input
              type="checkbox"
              className="w-4 h-4"
              checked={filters[filter.key]?.includes(option.value)}
              onChange={() => toggleFilter(filter.key, option.value)}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default Filter;
