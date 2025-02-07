import React, { useState } from "react";
import FilterButton from "./general/FilterButton";

interface FilterSectionProps {
  sortOption: string;
  handleSortChange: (option: string) => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  sortOption,

  handleSortChange,
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const toggleFilter = () => setIsFilterOpen((prev) => !prev);
  return (
    <div className="relative mb-4">
      <FilterButton onClick={toggleFilter} />
      {isFilterOpen && (
        <div className="absolute w-[200px] top-13 left:0 sm:right-0 bg-white shadow-md p-4 rounded border border-gray-300">
          <div>
            <label className="flex gap-2">
              <input
                type="radio"
                name="sort"
                checked={sortOption === "asc"}
                onChange={() => {
                  handleSortChange("asc"), setIsFilterOpen(false);
                }}
              />
              <span>A to Z</span>
            </label>
          </div>
          <div>
            <label className="flex gap-2">
              <input
                type="radio"
                name="sort"
                checked={sortOption === "desc"}
                onChange={() => {
                  handleSortChange("desc"), setIsFilterOpen(false);
                }}
              />
              <span>Z to A</span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterSection;
