import { cn } from '@/lib/utils'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'success' | 'warning'
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors',
        {
          'bg-primary/10 text-primary': variant === 'default',
          'bg-secondary text-secondary-foreground': variant === 'secondary',
          'border border-border text-muted-foreground': variant === 'outline',
          'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400': variant === 'success',
          'bg-amber-500/10 text-amber-600 dark:text-amber-400': variant === 'warning',
        },
        className
      )}
      {...props}
    />
  )
}
