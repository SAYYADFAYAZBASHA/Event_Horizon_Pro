import { motion } from "framer-motion";
import { Sparkles, Calendar, TrendingUp, Users } from "lucide-react";
import { Layout } from "@/components/Layout";
import { EventCard } from "@/components/EventCard";
import { AdvancedFilters } from "@/components/AdvancedFilters";
import { useEventFilters, initialFilters } from "@/hooks/useEventFilters";
import { useFilterPresets, FilterPreset } from "@/hooks/useFilterPresets";
import { useFilterUrlSync } from "@/hooks/useFilterUrlSync";
import { events } from "@/lib/data";

const stats = [
  { icon: Calendar, value: "500+", label: "Events Hosted" },
  { icon: Users, value: "10K+", label: "Happy Clients" },
  { icon: TrendingUp, value: "98%", label: "Satisfaction Rate" },
  { icon: Sparkles, value: "50+", label: "Venues Available" },
];

const Index = () => {
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
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "-3s" }} />
          
          {/* Gold Particle Effects */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-gradient-to-r from-primary to-accent"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                boxShadow: "0 0 6px hsl(45 85% 55% / 0.8), 0 0 12px hsl(45 85% 55% / 0.4)",
              }}
              animate={{
                y: [0, -100, 0],
                x: [0, Math.random() * 50 - 25, 0],
                opacity: [0, 1, 0],
                scale: [0.5, 1.5, 0.5],
              }}
              transition={{
                duration: 4 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut",
              }}
            />
          ))}
          
          {/* Larger floating gold orbs */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`orb-${i}`}
              className="absolute w-2 h-2 rounded-full"
              style={{
                left: `${10 + Math.random() * 80}%`,
                top: `${10 + Math.random() * 80}%`,
                background: "radial-gradient(circle, hsl(45 85% 55% / 0.8) 0%, hsl(35 75% 45% / 0.4) 50%, transparent 70%)",
                boxShadow: "0 0 20px hsl(45 85% 55% / 0.6), 0 0 40px hsl(45 85% 55% / 0.3)",
              }}
              animate={{
                y: [0, -60, 0],
                x: [0, 30 * (i % 2 === 0 ? 1 : -1), 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 6 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 4,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium">
                <Sparkles className="w-4 h-4 text-primary" />
                Premium Event Management
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-7xl font-display font-bold mb-6 leading-tight"
            >
              Create{" "}
              <span className="relative inline-block">
                <span className="gradient-text neon-text">Unforgettable</span>
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/40 to-transparent"
                  initial={{ x: "-100%" }}
                  animate={{ x: "200%" }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3,
                    ease: "easeInOut",
                  }}
                  style={{ 
                    maskImage: "linear-gradient(to right, transparent, white, transparent)",
                    WebkitMaskImage: "linear-gradient(to right, transparent, white, transparent)",
                  }}
                />
              </span>
              <br />
              Moments
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg lg:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
            >
              From intimate celebrations to grand galas, we transform your
              vision into extraordinary events that leave lasting impressions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <motion.a
                href="#events"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold neon-glow transition-all duration-300"
              >
                Explore Events
              </motion.a>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-xl glass font-semibold hover:neon-glow transition-all duration-300"
              >
                Contact Us
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="glass rounded-2xl p-6 text-center hover:neon-glow transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="text-3xl lg:text-4xl font-display font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-5xl font-display font-bold mb-4">
              Upcoming <span className="gradient-text">Events</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover our curated collection of events, each designed to
              create magical moments and lasting memories.
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
              className="text-center py-20"
            >
              <p className="text-xl text-muted-foreground">
                No events found matching your criteria.
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Index;
