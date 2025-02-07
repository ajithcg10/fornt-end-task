import React from "react";
import { Filter } from "lucide-react";
import { ButtonHTMLAttributes } from "react";

interface FilterButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({
  onClick,
  type = "button",
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className="group relative overflow-hidden p-3  cursor-pointer bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95"
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <Filter
        size={20}
        className="relative text-white transform group-hover:rotate-12 transition-transform duration-300"
      />
    </button>
  );
};

export default FilterButton;
