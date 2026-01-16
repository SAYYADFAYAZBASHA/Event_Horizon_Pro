import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, X, MapPin, Calendar, IndianRupee, RotateCcw, Bookmark, Share2, Check } from "lucide-react";
import { useState } from "react";
import { FilterState } from "@/hooks/useEventFilters";
import { FilterPreset } from "@/hooks/useFilterPresets";
import { formatCurrency } from "@/lib/data";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface AdvancedFiltersProps {
  filters: FilterState;
  updateFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  resetFilters: () => void;
  activeFilterCount: number;
  resultCount: number;
  presets?: FilterPreset[];
  onSavePreset?: (name: string) => void;
  onApplyPreset?: (preset: FilterPreset) => void;
  onDeletePreset?: (id: string) => void;
  getShareableUrl?: () => string;
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

const budgetPresets = [
  { label: "Under ₹1L", range: [0, 100000] as [number, number] },
  { label: "₹1L - ₹5L", range: [100000, 500000] as [number, number] },
  { label: "₹5L - ₹10L", range: [500000, 1000000] as [number, number] },
  { label: "₹10L+", range: [1000000, 10000000] as [number, number] },
];

export const AdvancedFilters = ({
  filters,
  updateFilter,
  resetFilters,
  activeFilterCount,
  resultCount,
  presets = [],
  onSavePreset,
  onApplyPreset,
  onDeletePreset,
  getShareableUrl,
}: AdvancedFiltersProps) => {
  const [showFilters, setShowFilters] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>("category");
  const [showSavePreset, setShowSavePreset] = useState(false);
  const [presetName, setPresetName] = useState("");

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleSavePreset = () => {
    if (presetName.trim() && onSavePreset) {
      onSavePreset(presetName.trim());
      setPresetName("");
      setShowSavePreset(false);
      toast.success("Filter preset saved!");
    }
  };

  const handleShareFilters = async () => {
    if (getShareableUrl) {
      const url = getShareableUrl();
      try {
        await navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard!");
      } catch {
        toast.error("Failed to copy link");
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* Search Input Row */}
      <div className="flex gap-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 relative"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search events by name, location, or description..."
            value={filters.searchQuery}
            onChange={(e) => updateFilter("searchQuery", e.target.value)}
            className="w-full pl-12 pr-10 py-3 rounded-xl glass border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 bg-transparent outline-none"
          />
          {filters.searchQuery && (
            <button
              onClick={() => updateFilter("searchQuery", "")}
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
          onClick={handleShareFilters}
          className="px-4 py-3 rounded-xl glass transition-all duration-300"
          title="Share filters"
        >
          <Share2 className="w-5 h-5" />
        </motion.button>

        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowFilters(!showFilters)}
          className={`relative px-4 py-3 rounded-xl glass transition-all duration-300 ${
            showFilters ? "neon-glow" : ""
          }`}
        >
          <SlidersHorizontal className="w-5 h-5" />
          {activeFilterCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-r from-primary to-secondary text-primary-foreground text-xs flex items-center justify-center font-bold">
              {activeFilterCount}
            </span>
          )}
        </motion.button>
      </div>

      {/* Saved Presets Row */}
      {presets.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap items-center gap-2"
        >
          <span className="text-sm text-muted-foreground flex items-center gap-1">
            <Bookmark className="w-4 h-4" />
            Saved:
          </span>
          {presets.map((preset) => (
            <Badge
              key={preset.id}
              variant="secondary"
              className="gap-1.5 cursor-pointer hover:bg-primary/20 transition-colors group"
              onClick={() => onApplyPreset?.(preset)}
            >
              {preset.name}
              <X
                className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeletePreset?.(preset.id);
                  toast.success("Preset deleted");
                }}
              />
            </Badge>
          ))}
        </motion.div>
      )}

      {/* Active Filters Display */}
      <AnimatePresence>
        {activeFilterCount > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-wrap items-center gap-2"
          >
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {filters.selectedCategory !== "All" && (
              <Badge variant="secondary" className="gap-1 bg-primary/10 text-primary">
                {filters.selectedCategory}
                <X
                  className="w-3 h-3 cursor-pointer"
                  onClick={() => updateFilter("selectedCategory", "All")}
                />
              </Badge>
            )}
            {(filters.budgetRange[0] > 0 || filters.budgetRange[1] < 10000000) && (
              <Badge variant="secondary" className="gap-1 bg-secondary/10 text-secondary">
                {formatCurrency(filters.budgetRange[0])} - {formatCurrency(filters.budgetRange[1])}
                <X
                  className="w-3 h-3 cursor-pointer"
                  onClick={() => updateFilter("budgetRange", [0, 10000000])}
                />
              </Badge>
            )}
            {filters.location && (
              <Badge variant="secondary" className="gap-1 bg-primary/10 text-primary">
                📍 {filters.location}
                <X
                  className="w-3 h-3 cursor-pointer"
                  onClick={() => updateFilter("location", "")}
                />
              </Badge>
            )}
            {(filters.dateRange.from || filters.dateRange.to) && (
              <Badge variant="secondary" className="gap-1 bg-secondary/10 text-secondary">
                📅 {filters.dateRange.from || "Any"} - {filters.dateRange.to || "Any"}
                <X
                  className="w-3 h-3 cursor-pointer"
                  onClick={() => updateFilter("dateRange", { from: "", to: "" })}
                />
              </Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSavePreset(true)}
              className="text-muted-foreground hover:text-foreground"
            >
              <Bookmark className="w-3 h-3 mr-1" />
              Save preset
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={resetFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="w-3 h-3 mr-1" />
              Clear all
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Save Preset Modal */}
      <AnimatePresence>
        {showSavePreset && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="glass rounded-xl p-4"
          >
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Enter preset name..."
                value={presetName}
                onChange={(e) => setPresetName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSavePreset()}
                className="flex-1 px-3 py-2 rounded-lg glass border-border/50 focus:border-primary outline-none bg-transparent text-sm"
                autoFocus
                maxLength={50}
              />
              <Button size="sm" onClick={handleSavePreset} disabled={!presetName.trim()}>
                <Check className="w-4 h-4 mr-1" />
                Save
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setShowSavePreset(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="glass rounded-2xl p-6 space-y-6">
              {/* Category Section */}
              <FilterSection
                title="Category"
                icon={<span className="text-lg">🎉</span>}
                isExpanded={expandedSection === "category"}
                onToggle={() => toggleSection("category")}
              >
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <motion.button
                      key={category}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => updateFilter("selectedCategory", category)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        filters.selectedCategory === category
                          ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground"
                          : "glass hover:neon-glow"
                      }`}
                    >
                      {category}
                    </motion.button>
                  ))}
                </div>
              </FilterSection>

              {/* Budget Range Section */}
              <FilterSection
                title="Budget Range"
                icon={<IndianRupee className="w-4 h-4" />}
                isExpanded={expandedSection === "budget"}
                onToggle={() => toggleSection("budget")}
              >
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {budgetPresets.map((preset) => (
                      <motion.button
                        key={preset.label}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => updateFilter("budgetRange", preset.range)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ${
                          filters.budgetRange[0] === preset.range[0] &&
                          filters.budgetRange[1] === preset.range[1]
                            ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground"
                            : "glass hover:neon-glow"
                        }`}
                      >
                        {preset.label}
                      </motion.button>
                    ))}
                  </div>
                  <div className="px-2">
                    <Slider
                      value={[filters.budgetRange[0], filters.budgetRange[1]]}
                      min={0}
                      max={10000000}
                      step={50000}
                      onValueChange={(value) =>
                        updateFilter("budgetRange", [value[0], value[1]])
                      }
                      className="w-full"
                    />
                    <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                      <span>{formatCurrency(filters.budgetRange[0])}</span>
                      <span>{formatCurrency(filters.budgetRange[1])}</span>
                    </div>
                  </div>
                </div>
              </FilterSection>

              {/* Location Section */}
              <FilterSection
                title="Location"
                icon={<MapPin className="w-4 h-4" />}
                isExpanded={expandedSection === "location"}
                onToggle={() => toggleSection("location")}
              >
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Filter by city or venue..."
                    value={filters.location}
                    onChange={(e) => updateFilter("location", e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-xl glass border-border/50 focus:border-primary outline-none bg-transparent text-sm"
                  />
                </div>
              </FilterSection>

              {/* Date Range Section */}
              <FilterSection
                title="Date Range"
                icon={<Calendar className="w-4 h-4" />}
                isExpanded={expandedSection === "date"}
                onToggle={() => toggleSection("date")}
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">From</label>
                    <input
                      type="date"
                      value={filters.dateRange.from}
                      onChange={(e) =>
                        updateFilter("dateRange", { ...filters.dateRange, from: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl glass border-border/50 focus:border-primary outline-none bg-transparent text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">To</label>
                    <input
                      type="date"
                      value={filters.dateRange.to}
                      onChange={(e) =>
                        updateFilter("dateRange", { ...filters.dateRange, to: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl glass border-border/50 focus:border-primary outline-none bg-transparent text-sm"
                    />
                  </div>
                </div>
              </FilterSection>

              {/* Sort Section */}
              <FilterSection
                title="Sort By"
                icon={<SlidersHorizontal className="w-4 h-4" />}
                isExpanded={expandedSection === "sort"}
                onToggle={() => toggleSection("sort")}
              >
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {sortOptions.map((option) => (
                    <motion.button
                      key={option.value}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => updateFilter("sortBy", option.value)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 text-left ${
                        filters.sortBy === option.value
                          ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground"
                          : "glass hover:neon-glow"
                      }`}
                    >
                      {option.label}
                    </motion.button>
                  ))}
                </div>
              </FilterSection>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results Count */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-between"
      >
        <p className="text-muted-foreground">
          Showing <span className="text-primary font-semibold">{resultCount}</span> event{resultCount !== 1 ? "s" : ""}
        </p>
        {activeFilterCount > 0 && (
          <Button
            variant="link"
            size="sm"
            onClick={resetFilters}
            className="text-muted-foreground"
          >
            Reset all filters
          </Button>
        )}
      </motion.div>
    </div>
  );
};

interface FilterSectionProps {
  title: string;
  icon: React.ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

const FilterSection = ({ title, icon, isExpanded, onToggle, children }: FilterSectionProps) => (
  <div className="border-b border-border/30 last:border-0 pb-4 last:pb-0">
    <button
      onClick={onToggle}
      className="flex items-center justify-between w-full text-left mb-3"
    >
      <div className="flex items-center gap-2">
        {icon}
        <h4 className="text-sm font-medium">{title}</h4>
      </div>
      <motion.span
        animate={{ rotate: isExpanded ? 180 : 0 }}
        className="text-muted-foreground"
      >
        ▼
      </motion.span>
    </button>
    <AnimatePresence>
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);
