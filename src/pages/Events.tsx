import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { Layout } from "@/components/Layout";
import { EventCard } from "@/components/EventCard";
import { AdvancedFilters } from "@/components/AdvancedFilters";
import { useEventFilters, initialFilters } from "@/hooks/useEventFilters";
import { useFilterPresets, FilterPreset } from "@/hooks/useFilterPresets";
import { useFilterUrlSync } from "@/hooks/useFilterUrlSync";
import { events } from "@/lib/data";

const Events = () => {
  const { filters, updateFilter, resetFilters, filteredEvents, activeFilterCount, setFiltersDirectly } = useEventFilters(events);
  const { presets, savePreset, deletePreset } = useFilterPresets();
  const { getShareableUrl } = useFilterUrlSync(filters, updateFilter, setFiltersDirectly);

  const handleSavePreset = (name: string) => {
    savePreset(name, filters);
  };

  const handleApplyPreset = (preset: FilterPreset) => {
    setFiltersDirectly({
      ...initialFilters,
      ...preset.filters,
    });
  };

  return (
    <Layout>
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
              <Calendar className="w-5 h-5 text-primary" />
              <span className="font-medium">All Events</span>
            </div>
            <h1 className="text-3xl lg:text-5xl font-display font-bold mb-4">
              Explore Our <span className="gradient-text">Events</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Browse through our complete collection of events and find the
              perfect inspiration for your celebration.
            </p>
          </motion.div>

          {/* Advanced Search & Filters */}
          <div className="mb-10">
            <AdvancedFilters
              filters={filters}
              updateFilter={updateFilter}
              resetFilters={resetFilters}
              activeFilterCount={activeFilterCount}
              resultCount={filteredEvents.length}
              presets={presets}
              onSavePreset={handleSavePreset}
              onApplyPreset={handleApplyPreset}
              onDeletePreset={deletePreset}
              getShareableUrl={getShareableUrl}
            />
          </div>

          {/* Events Grid */}
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredEvents.map((event, index) => (
                <EventCard key={event.id} event={event} index={index} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass rounded-2xl p-12 text-center"
            >
              <Calendar className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No Events Found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Events;
