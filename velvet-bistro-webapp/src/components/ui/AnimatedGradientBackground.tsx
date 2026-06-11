import { motion } from "framer-motion";

interface AnimatedGradientBackgroundProps {
  variant?: "default" | "hero";
}

export function AnimatedGradientBackground({ variant = "default" }: AnimatedGradientBackgroundProps) {
  const isHero = variant === "hero";

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className={
          isHero
            ? "absolute -left-1/4 -top-1/4 h-[80vh] w-[80vh] rounded-full bg-gold/25 blur-[120px] dark:bg-gold/10"
            : "absolute -left-1/4 -top-1/4 h-[80vh] w-[80vh] rounded-full bg-gold/10 blur-[120px]"
        }
        animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className={
          isHero
            ? "absolute -bottom-1/4 -right-1/4 h-[70vh] w-[70vh] rounded-full bg-amber-800/15 blur-[100px] dark:bg-amber-900/20"
            : "absolute -bottom-1/4 -right-1/4 h-[70vh] w-[70vh] rounded-full bg-amber-900/20 blur-[100px]"
        }
        animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className={
          isHero
            ? "absolute left-1/2 top-1/2 h-[50vh] w-[50vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/15 blur-[80px] dark:bg-gold/5"
            : "absolute left-1/2 top-1/2 h-[50vh] w-[50vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/5 blur-[80px]"
        }
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
