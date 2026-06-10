import { useRef, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button, type ButtonProps } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface MagneticButtonProps extends ButtonProps {
  children: ReactNode
  to?: string
}

export function MagneticButton({ children, to, className, ...props }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    ref.current.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`
  }

  const handleMouseLeave = () => {
    if (!ref.current) return
    ref.current.style.transform = 'translate(0, 0)'
  }

  const button = to ? (
    <Button asChild className={cn('relative overflow-hidden', className)} {...props}>
      <Link to={to}>{children}</Link>
    </Button>
  ) : (
    <Button className={cn('relative overflow-hidden', className)} {...props}>
      {children}
    </Button>
  )

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block transition-transform duration-200 ease-out"
      whileTap={{ scale: 0.97 }}
    >
      {button}
    </motion.div>
  )
}
