
import { useState } from "react";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { X } from "lucide-react";

// Define our filter types
interface FilterOption {
  id: string;
  name: string;
}

interface FilterCategory {
  id: string;
  name: string;
  options: FilterOption[];
}

interface ProductFiltersProps {
  categories: FilterCategory[];
  activeFilters: Record<string, string[]>;
  setActiveFilters: (filters: Record<string, string[]>) => void;
  className?: string;
}

export function ProductFilters({
  categories,
  activeFilters,
  setActiveFilters,
  className,
}: ProductFiltersProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  // Toggle a filter category's expanded state
  const toggleExpanded = (categoryId: string) => {
    setExpanded((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  // Toggle a filter option
  const toggleFilter = (categoryId: string, optionId: string) => {
    setActiveFilters({
      ...activeFilters,
      [categoryId]: activeFilters[categoryId]?.includes(optionId)
        ? activeFilters[categoryId].filter((id) => id !== optionId)
        : [...(activeFilters[categoryId] || []), optionId],
    });
  };

  // Clear all filters
  const clearAllFilters = () => {
    setActiveFilters({});
  };

  // Count active filters
  const activeFilterCount = Object.values(activeFilters).reduce(
    (count, filters) => count + filters.length,
    0
  );

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-gray-900">Filters</h2>
        {activeFilterCount > 0 && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-alam-600 hover:text-alam-700 font-medium"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="space-y-6">
        {categories.map((category) => (
          <div key={category.id} className="border-b pb-6">
            <button
              className="flex w-full items-center justify-between text-sm font-medium text-gray-900 mb-2"
              onClick={() => toggleExpanded(category.id)}
            >
              <span>{category.name}</span>
              <span className="text-alam-600">
                {expanded[category.id] ? "-" : "+"}
              </span>
            </button>

            <div
              className={`${
                expanded[category.id] !== false ? "block" : "hidden"
              } space-y-2 mt-3`}
            >
              {category.options.map((option) => (
                <label
                  key={option.id}
                  className="flex items-center gap-2 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-alam-600 focus:ring-alam-600"
                    checked={activeFilters[category.id]?.includes(option.id) || false}
                    onChange={() => toggleFilter(category.id, option.id)}
                  />
                  <span className="text-sm text-gray-700 group-hover:text-gray-900">
                    {option.name}
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Mobile Filter Dialog
interface MobileFiltersProps {
  categories: FilterCategory[];
  activeFilters: Record<string, string[]>;
  setActiveFilters: (filters: Record<string, string[]>) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function MobileFilters({
  categories,
  activeFilters,
  setActiveFilters,
  isOpen,
  onClose,
}: MobileFiltersProps) {
  const [tempFilters, setTempFilters] = useState<Record<string, string[]>>(activeFilters);
  
  // Apply filters and close dialog
  const applyFilters = () => {
    setActiveFilters(tempFilters);
    onClose();
  };
  
  // Toggle a filter option in temp filters
  const toggleFilter = (categoryId: string, optionId: string) => {
    setTempFilters({
      ...tempFilters,
      [categoryId]: tempFilters[categoryId]?.includes(optionId)
        ? tempFilters[categoryId].filter((id) => id !== optionId)
        : [...(tempFilters[categoryId] || []), optionId],
    });
  };
  
  // Reset temp filters to match active filters when dialog opens
  const resetFilters = () => {
    setTempFilters(activeFilters);
    onClose();
  };

  // Count active filters
  const activeFilterCount = Object.values(tempFilters).reduce(
    (count, filters) => count + filters.length,
    0
  );
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-white">
      <div className="flex items-center justify-between border-b px-4 py-4">
        <h2 className="text-lg font-medium text-gray-900">Filters</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
          <X className="h-5 w-5" />
        </button>
      </div>
      
      <div className="px-4 py-4 h-[calc(100vh-8rem)] overflow-y-auto">
        <div className="space-y-6">
          {categories.map((category) => (
            <div key={category.id} className="border-b pb-6">
              <h3 className="text-base font-medium text-gray-900 mb-4">
                {category.name}
              </h3>
              
              <div className="space-y-3">
                {category.options.map((option) => (
                  <label
                    key={option.id}
                    className="flex items-center gap-2 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-gray-300 text-alam-600 focus:ring-alam-600"
                      checked={tempFilters[category.id]?.includes(option.id) || false}
                      onChange={() => toggleFilter(category.id, option.id)}
                    />
                    <span className="text-base text-gray-700 group-hover:text-gray-900">
                      {option.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="border-t px-4 py-4 sticky bottom-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={resetFilters}
            className="flex-1 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Reset
          </button>
          <PrimaryButton
            onClick={applyFilters}
            className="flex-1"
          >
            Apply Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
