import { motion } from "framer-motion";

export const GoldParticles = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Small floating particles */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-gradient-to-r from-primary to-accent"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            boxShadow: "0 0 6px hsl(45 85% 55% / 0.8), 0 0 12px hsl(45 85% 55% / 0.4)",
          }}
          animate={{
            y: [0, -150, 0],
            x: [0, Math.random() * 60 - 30, 0],
            opacity: [0, 0.8, 0],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 8,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Medium floating orbs */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: `${5 + Math.random() * 90}%`,
            top: `${5 + Math.random() * 90}%`,
            background: "radial-gradient(circle, hsl(45 85% 55% / 0.7) 0%, hsl(35 75% 45% / 0.3) 50%, transparent 70%)",
            boxShadow: "0 0 20px hsl(45 85% 55% / 0.5), 0 0 40px hsl(45 85% 55% / 0.2)",
          }}
          animate={{
            y: [0, -80, 0],
            x: [0, 40 * (i % 2 === 0 ? 1 : -1), 0],
            opacity: [0.2, 0.7, 0.2],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 7 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 6,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Larger glowing orbs */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`glow-${i}`}
          className="absolute w-3 h-3 rounded-full"
          style={{
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 80}%`,
            background: "radial-gradient(circle, hsl(45 85% 55% / 0.5) 0%, hsl(40 80% 50% / 0.2) 40%, transparent 70%)",
            boxShadow: "0 0 30px hsl(45 85% 55% / 0.4), 0 0 60px hsl(45 85% 55% / 0.2)",
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, 50 * (i % 2 === 0 ? 1 : -1), 0],
            opacity: [0.1, 0.5, 0.1],
            scale: [1, 1.8, 1],
          }}
          transition={{
            duration: 10 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 8,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Sparkle effects */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        >
          <div 
            className="w-1 h-1 bg-primary rounded-full"
            style={{
              boxShadow: "0 0 10px hsl(45 85% 55%), 0 0 20px hsl(45 85% 55% / 0.5)",
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};
