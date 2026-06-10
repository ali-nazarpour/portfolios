import { motion } from 'framer-motion'

export function AnimatedGradientBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute -top-1/2 -left-1/4 w-[80%] h-[80%] rounded-full opacity-30 dark:opacity-20"
        style={{
          background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)',
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-1/2 -right-1/4 w-[70%] h-[70%] rounded-full opacity-25 dark:opacity-15"
        style={{
          background: 'radial-gradient(circle, #818cf8 0%, transparent 70%)',
        }}
        animate={{
          x: [0, -80, 0],
          y: [0, -40, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/3 right-1/3 w-[50%] h-[50%] rounded-full opacity-20 dark:opacity-10"
        style={{
          background: 'radial-gradient(circle, #c084fc 0%, transparent 70%)',
        }}
        animate={{
          x: [0, 60, 0],
          y: [0, -60, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
    </div>
  )
}
