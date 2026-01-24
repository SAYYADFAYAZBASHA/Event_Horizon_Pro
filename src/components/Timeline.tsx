import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { TimelineItem } from "@/lib/data";

interface TimelineProps {
  items: TimelineItem[];
}

export const Timeline = ({ items }: TimelineProps) => {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-primary" />

      <div className="space-y-8">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 }}
            className="relative pl-16"
          >
            {/* Timeline dot */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 + 0.2, type: "spring" }}
              className="absolute left-3 top-2 w-6 h-6 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center"
            >
              <div className="w-2 h-2 rounded-full bg-primary-foreground" />
            </motion.div>

            {/* Content */}
            <div className="glass rounded-xl p-5 hover:neon-glow transition-all duration-300">
              <div className="flex items-center gap-2 text-primary mb-2">
                <Clock className="w-4 h-4" />
                <span className="font-bold">{item.time}</span>
              </div>
              <h4 className="text-lg font-semibold mb-1">{item.title}</h4>
              <p className="text-muted-foreground text-sm">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
