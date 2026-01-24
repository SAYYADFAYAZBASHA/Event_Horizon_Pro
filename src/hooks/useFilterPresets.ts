import { useState, useCallback, useEffect } from "react";
import { FilterState } from "./useEventFilters";

export interface FilterPreset {
  id: string;
  name: string;
  filters: Omit<FilterState, "searchQuery">;
  createdAt: number;
}

const STORAGE_KEY = "event-filter-presets";

export const useFilterPresets = () => {
  const [presets, setPresets] = useState<FilterPreset[]>([]);

  // Load presets from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setPresets(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Failed to load filter presets:", error);
    }
  }, []);

  // Save presets to localStorage
  const saveToStorage = useCallback((newPresets: FilterPreset[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newPresets));
    } catch (error) {
      console.error("Failed to save filter presets:", error);
    }
  }, []);

  const savePreset = useCallback(
    (name: string, filters: FilterState) => {
      const newPreset: FilterPreset = {
        id: `preset-${Date.now()}`,
        name: name.trim(),
        filters: {
          selectedCategory: filters.selectedCategory,
          sortBy: filters.sortBy,
          budgetRange: filters.budgetRange,
          dateRange: filters.dateRange,
          location: filters.location,
        },
        createdAt: Date.now(),
      };
      const newPresets = [...presets, newPreset];
      setPresets(newPresets);
      saveToStorage(newPresets);
      return newPreset;
    },
    [presets, saveToStorage]
  );

  const deletePreset = useCallback(
    (id: string) => {
      const newPresets = presets.filter((p) => p.id !== id);
      setPresets(newPresets);
      saveToStorage(newPresets);
    },
    [presets, saveToStorage]
  );

  const renamePreset = useCallback(
    (id: string, newName: string) => {
      const newPresets = presets.map((p) =>
        p.id === id ? { ...p, name: newName.trim() } : p
      );
      setPresets(newPresets);
      saveToStorage(newPresets);
    },
    [presets, saveToStorage]
  );

  return {
    presets,
    savePreset,
    deletePreset,
    renamePreset,
  };
};
