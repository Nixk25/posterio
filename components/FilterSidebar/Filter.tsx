import React, { useMemo } from "react";
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

const colorCategories = {
  red: { label: "Red", bgClass: "bg-red-500", value: "red" },
  blue: { label: "Blue", bgClass: "bg-blue-500", value: "blue" },
  green: { label: "Green", bgClass: "bg-green-500", value: "green" },
  yellow: { label: "Yellow", bgClass: "bg-yellow-400", value: "yellow" },
  orange: { label: "Orange", bgClass: "bg-orange-500", value: "orange" },
  purple: { label: "Purple", bgClass: "bg-purple-500", value: "purple" },
  pink: { label: "Pink", bgClass: "bg-pink-500", value: "pink" },
  black: { label: "Black", bgClass: "bg-black", value: "black" },
  white: { label: "White", bgClass: "bg-white border", value: "white" },
  gray: { label: "Gray", bgClass: "bg-gray-500", value: "gray" },
};

const getColorCategory = (hex: string) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  if (r > g && r > b) return "red";
  if (g > r && g > b) return "green";
  if (b > r && b > g) return "blue";
  if (r > 200 && g > 200 && b < 100) return "yellow";
  if (r > 200 && g > 100 && b < 100) return "orange";
  if (r > 150 && g < 100 && b > 150) return "purple";
  if (r > 200 && g < 150 && b > 150) return "pink";
  if (r < 60 && g < 60 && b < 60) return "black";
  if (r > 200 && g > 200 && b > 200) return "white";
  if (Math.abs(r - g) < 40 && Math.abs(r - b) < 40) return "gray";

  return "other";
};

const Filter = ({ filter }: FilterProps) => {
  const { filters, toggleFilter, setMultipleFilters } = useFilterContext();

  const isColorFilter = filter.options.some((option) => "color" in option);

  const colorGroups = useMemo(() => {
    if (!isColorFilter) return null;

    const groups: Record<string, string[]> = {};

    filter.options.forEach((option) => {
      if ("color" in option) {
        const category = getColorCategory(option.value);
        if (category !== "other" && colorCategories[category]) {
          if (!groups[category]) {
            groups[category] = [];
          }
          groups[category].push(option.value);
        }
      }
    });

    return groups;
  }, [filter.options, isColorFilter]);

  const handleColorCategoryToggle = (category: string, hexValues: string[]) => {
    const currentSelected = filters[filter.key] || [];

    const hasSelectedFromCategory = hexValues.some((hex) =>
      currentSelected.includes(hex)
    );

    if (hasSelectedFromCategory) {
      const newSelected = currentSelected.filter(
        (hex) => !hexValues.includes(hex)
      );
      setMultipleFilters(filter.key, newSelected);
    } else {
      const newSelected = [...currentSelected, ...hexValues];
      setMultipleFilters(filter.key, newSelected);
    }
  };

  if (isColorFilter && colorGroups) {
    return (
      <div className="pt-9 pb-5 px-5 last:border-r-0 border-r w-full">
        <h3 className="font-semibold text-lg mb-2">{filter.title}</h3>
        <div className="space-y-2 w-max">
          {Object.entries(colorGroups).map(([category, hexValues]) => {
            const categoryInfo =
              colorCategories[category as keyof typeof colorCategories];
            if (!categoryInfo) return null;

            const isSelected = hexValues.some((hex) =>
              filters[filter.key]?.includes(hex)
            );

            return (
              <label
                key={category}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="w-4 h-4"
                  checked={isSelected}
                  onChange={() =>
                    handleColorCategoryToggle(category, hexValues)
                  }
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
            {"color" in option ? (
              <span
                className="w-5 h-5 rounded-full border border-gray-400"
                style={{ backgroundColor: option.value }}
              />
            ) : (
              <span>{option.label}</span>
            )}
          </label>
        ))}
      </div>
    </div>
  );
};

export default Filter;
