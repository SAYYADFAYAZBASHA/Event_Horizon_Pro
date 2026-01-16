import { motion } from "framer-motion";
import { DecorationLayout } from "@/lib/data";

interface DecorationCardProps {
  layout: DecorationLayout;
  index: number;
}

const typeIcons = {
  Stage: "🎭",
  Entrance: "🚪",
  Lighting: "💡",
  Centerpiece: "🌸",
  Theme: "🎨",
};

export const DecorationCard = ({ layout, index }: DecorationCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="glass rounded-2xl overflow-hidden group cursor-pointer"
    >
      <div className="relative h-52 overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5 }}
          src={layout.image}
          alt={layout.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        
        {/* Type Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1.5 rounded-full text-sm font-medium glass">
            {typeIcons[layout.type]} {layout.type}
          </span>
        </div>

        {/* Hover Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-primary/20 backdrop-blur-sm flex items-center justify-center"
        >
          <span className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium">
            View Details
          </span>
        </motion.div>
      </div>

      <div className="p-5">
        <h4 className="text-lg font-display font-bold mb-2 group-hover:text-primary transition-colors">
          {layout.title}
        </h4>
        <p className="text-muted-foreground text-sm line-clamp-2">
          {layout.description}
        </p>
      </div>

      {/* Bottom gradient line */}
      <div className="h-1 bg-gradient-to-r from-primary via-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
};
