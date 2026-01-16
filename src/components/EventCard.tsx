import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { Event, getCategoryColor, formatDate } from "@/lib/data";

interface EventCardProps {
  event: Event;
  index: number;
}

export const EventCard = ({ event, index }: EventCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -10 }}
      className="group"
    >
      <Link to={`/event/${event.id}`}>
        <div className="relative rounded-2xl overflow-hidden glass hover:neon-glow transition-all duration-500">
          {/* Image */}
          <div className="relative h-48 lg:h-56 overflow-hidden">
            <motion.img
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.5 }}
              src={event.coverImage}
              alt={event.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
            
            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getCategoryColor(
                  event.category
                )}`}
              >
                {event.category}
              </span>
            </div>

            {/* Hover Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="absolute inset-0 bg-primary/10 backdrop-blur-sm flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                className="p-4 rounded-full bg-primary text-primary-foreground"
              >
                <ArrowRight className="w-6 h-6" />
              </motion.div>
            </motion.div>
          </div>

          {/* Content */}
          <div className="p-5">
            <h3 className="text-xl font-display font-bold mb-2 group-hover:text-primary transition-colors line-clamp-1">
              {event.name}
            </h3>
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
              {event.description}
            </p>
            
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                <span>{formatDate(event.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-secondary" />
                <span className="line-clamp-1">{event.location}</span>
              </div>
            </div>
          </div>

          {/* Bottom Gradient Line */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </Link>
    </motion.div>
  );
};
