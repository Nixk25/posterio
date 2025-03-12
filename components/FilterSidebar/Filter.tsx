import React from "react";

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
const Filter = ({ filter }: FilterProps) => {
  return (
    <div key={filter.key} className=" p-4 border-r w-full">
      <h3 className="font-semibold text-lg mb-2">{filter.title}</h3>
      <div className="space-y-2">
        {filter.options.map((option) => (
          <label
            key={option.value}
            className="flex items-center space-x-2 cursor-pointer"
          >
            {"color" in option ? (
              <div className="flex items-center space-x-2">
                <input type="checkbox" className="w-4 h-4" />

                <span
                  className="w-5 h-5 rounded-full border border-gray-400"
                  style={{ backgroundColor: option.value }}
                />
              </div>
            ) : (
              <input type="checkbox" className="w-4 h-4" />
            )}
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default Filter;
