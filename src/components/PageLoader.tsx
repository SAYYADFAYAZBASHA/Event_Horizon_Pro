import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

interface PageLoaderProps {
  isLoading: boolean;
}

export const PageLoader = ({ isLoading }: PageLoaderProps) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="loader-overlay"
        >
          <div className="flex flex-col items-center gap-6">
            <motion.div
              animate={{
                rotate: 360,
                scale: [1, 1.2, 1],
              }}
              transition={{
                rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                scale: { duration: 1, repeat: Infinity },
              }}
              className="p-4 rounded-2xl bg-gradient-to-br from-primary to-secondary neon-glow"
            >
              <Sparkles className="w-10 h-10 text-primary-foreground" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-display font-bold gradient-text"
            >
              EventLux
            </motion.div>
            <div className="loader-spinner" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
