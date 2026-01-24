import { motion } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  "All",
  "Marriage",
  "Birthday",
  "Corporate",
  "Engagement",
  "Anniversary",
  "Baby Shower",
];

const sortOptions = [
  { value: "date-asc", label: "Date (Earliest)" },
  { value: "date-desc", label: "Date (Latest)" },
  { value: "price-asc", label: "Budget (Low to High)" },
  { value: "price-desc", label: "Budget (High to Low)" },
  { value: "name-asc", label: "Name (A-Z)" },
  { value: "name-desc", label: "Name (Z-A)" },
];

export const SearchBar = ({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  selectedCategory,
  onCategoryChange,
}: SearchBarProps) => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="flex gap-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 relative"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-12 pr-10 py-3 rounded-xl glass border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 bg-transparent outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </motion.div>

        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowFilters(!showFilters)}
          className={`px-4 py-3 rounded-xl glass transition-all duration-300 ${
            showFilters ? "neon-glow" : ""
          }`}
        >
          <SlidersHorizontal className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Filters */}
      <motion.div
        initial={false}
        animate={{
          height: showFilters ? "auto" : 0,
          opacity: showFilters ? 1 : 0,
        }}
        className="overflow-hidden"
      >
        <div className="glass rounded-xl p-4 space-y-4">
          {/* Categories */}
          <div>
            <h4 className="text-sm font-medium mb-3 text-muted-foreground">
              Category
            </h4>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onCategoryChange(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground"
                      : "glass hover:neon-glow"
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Sort */}
          <div>
            <h4 className="text-sm font-medium mb-3 text-muted-foreground">
              Sort By
            </h4>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="w-full md:w-auto px-4 py-2 rounded-xl glass border-border/50 focus:border-primary outline-none bg-transparent"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value} className="bg-card">
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
