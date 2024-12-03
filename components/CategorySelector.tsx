import React from "react";

interface CategorySelectorProps {
  categories: string[];
  onSelect: (category: string) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  categories,
  onSelect,
}) => {
  return (
    <div>
      {categories.map((category) => (
        <button key={category} onClick={() => onSelect(category)}>
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategorySelector;
