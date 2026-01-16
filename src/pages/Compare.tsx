import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Scale, Plus, X, Check } from "lucide-react";
import { Layout } from "@/components/Layout";
import { events, formatCurrency, formatDate, getCategoryColor } from "@/lib/data";

const Compare = () => {
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);

  const toggleEvent = (eventId: string) => {
    if (selectedEvents.includes(eventId)) {
      setSelectedEvents(selectedEvents.filter((id) => id !== eventId));
    } else if (selectedEvents.length < 3) {
      setSelectedEvents([...selectedEvents, eventId]);
    }
  };

  const selectedEventData = selectedEvents.map((id) =>
    events.find((e) => e.id === id)
  ).filter(Boolean);

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
              <Scale className="w-5 h-5 text-primary" />
              <span className="font-medium">Event Comparison</span>
            </div>
            <h1 className="text-3xl lg:text-5xl font-display font-bold mb-4">
              Compare <span className="gradient-text">Events</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Select up to 3 events to compare budgets, features, and details
              side by side.
            </p>
          </motion.div>

          {/* Event Selection */}
          <div className="mb-12">
            <h3 className="text-lg font-semibold mb-4">Select Events to Compare</h3>
            <div className="flex flex-wrap gap-3">
              {events.map((event) => (
                <motion.button
                  key={event.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toggleEvent(event.id)}
                  disabled={
                    selectedEvents.length >= 3 &&
                    !selectedEvents.includes(event.id)
                  }
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                    selectedEvents.includes(event.id)
                      ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground"
                      : "glass hover:neon-glow disabled:opacity-50 disabled:cursor-not-allowed"
                  }`}
                >
                  {selectedEvents.includes(event.id) ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                  <span className="font-medium">{event.name}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Comparison Table */}
          <AnimatePresence mode="wait">
            {selectedEventData.length > 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                className="glass rounded-2xl overflow-hidden"
              >
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="p-4 text-left font-semibold">Feature</th>
                        {selectedEventData.map((event) => (
                          <th
                            key={event!.id}
                            className="p-4 text-left font-semibold min-w-[250px]"
                          >
                            <div className="flex items-center justify-between">
                              <span>{event!.name}</span>
                              <button
                                onClick={() => toggleEvent(event!.id)}
                                className="p-1 rounded-full hover:bg-destructive/20 transition-colors"
                              >
                                <X className="w-4 h-4 text-destructive" />
                              </button>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {/* Cover Image */}
                      <tr className="border-b border-border/50">
                        <td className="p-4 font-medium">Preview</td>
                        {selectedEventData.map((event) => (
                          <td key={event!.id} className="p-4">
                            <img
                              src={event!.coverImage}
                              alt={event!.name}
                              className="w-full h-32 object-cover rounded-lg"
                            />
                          </td>
                        ))}
                      </tr>

                      {/* Category */}
                      <tr className="border-b border-border/50">
                        <td className="p-4 font-medium">Category</td>
                        {selectedEventData.map((event) => (
                          <td key={event!.id} className="p-4">
                            <span
                              className={`px-3 py-1 rounded-full text-sm text-white bg-gradient-to-r ${getCategoryColor(
                                event!.category
                              )}`}
                            >
                              {event!.category}
                            </span>
                          </td>
                        ))}
                      </tr>

                      {/* Date */}
                      <tr className="border-b border-border/50">
                        <td className="p-4 font-medium">Date</td>
                        {selectedEventData.map((event) => (
                          <td key={event!.id} className="p-4">
                            {formatDate(event!.date)}
                          </td>
                        ))}
                      </tr>

                      {/* Location */}
                      <tr className="border-b border-border/50">
                        <td className="p-4 font-medium">Location</td>
                        {selectedEventData.map((event) => (
                          <td key={event!.id} className="p-4">
                            {event!.location}
                          </td>
                        ))}
                      </tr>

                      {/* Budget Breakdown */}
                      <tr className="border-b border-border/50 bg-muted/30">
                        <td colSpan={selectedEventData.length + 1} className="p-4 font-semibold text-primary">
                          Budget Breakdown
                        </td>
                      </tr>

                      {/* Venue */}
                      <tr className="border-b border-border/50">
                        <td className="p-4 font-medium pl-8">Venue</td>
                        {selectedEventData.map((event) => (
                          <td key={event!.id} className="p-4">
                            {formatCurrency(event!.budget.venue)}
                          </td>
                        ))}
                      </tr>

                      {/* Decoration */}
                      <tr className="border-b border-border/50">
                        <td className="p-4 font-medium pl-8">Decoration</td>
                        {selectedEventData.map((event) => (
                          <td key={event!.id} className="p-4">
                            {formatCurrency(event!.budget.decoration)}
                          </td>
                        ))}
                      </tr>

                      {/* Catering */}
                      <tr className="border-b border-border/50">
                        <td className="p-4 font-medium pl-8">Catering</td>
                        {selectedEventData.map((event) => (
                          <td key={event!.id} className="p-4">
                            {formatCurrency(event!.budget.catering)}
                          </td>
                        ))}
                      </tr>

                      {/* Photography */}
                      <tr className="border-b border-border/50">
                        <td className="p-4 font-medium pl-8">Photography</td>
                        {selectedEventData.map((event) => (
                          <td key={event!.id} className="p-4">
                            {formatCurrency(event!.budget.photography)}
                          </td>
                        ))}
                      </tr>

                      {/* Miscellaneous */}
                      <tr className="border-b border-border/50">
                        <td className="p-4 font-medium pl-8">Miscellaneous</td>
                        {selectedEventData.map((event) => (
                          <td key={event!.id} className="p-4">
                            {formatCurrency(event!.budget.miscellaneous)}
                          </td>
                        ))}
                      </tr>

                      {/* Total Budget */}
                      <tr className="bg-primary/10">
                        <td className="p-4 font-bold">Total Budget</td>
                        {selectedEventData.map((event) => (
                          <td key={event!.id} className="p-4">
                            <span className="text-xl font-bold gradient-text">
                              {formatCurrency(
                                Object.values(event!.budget).reduce(
                                  (sum, val) => sum + val,
                                  0
                                )
                              )}
                            </span>
                          </td>
                        ))}
                      </tr>

                      {/* Products Count */}
                      <tr className="border-b border-border/50">
                        <td className="p-4 font-medium">Products</td>
                        {selectedEventData.map((event) => (
                          <td key={event!.id} className="p-4">
                            {event!.products.length} items
                          </td>
                        ))}
                      </tr>

                      {/* Decoration Layouts */}
                      <tr className="border-b border-border/50">
                        <td className="p-4 font-medium">Decoration Layouts</td>
                        {selectedEventData.map((event) => (
                          <td key={event!.id} className="p-4">
                            {event!.decorationLayouts.length} designs
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass rounded-2xl p-12 text-center"
              >
                <Scale className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">No Events Selected</h3>
                <p className="text-muted-foreground">
                  Select events above to start comparing
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </Layout>
  );
};

export default Compare;
