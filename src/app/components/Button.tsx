import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '../utils/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'success';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'lg', fullWidth = false, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95',
          {
            'bg-primary text-primary-foreground hover:bg-primary/90 shadow-md': variant === 'primary',
            'bg-secondary text-secondary-foreground hover:bg-secondary/80': variant === 'secondary',
            'border-2 border-primary text-primary bg-white hover:bg-primary/5': variant === 'outline',
            'hover:bg-accent': variant === 'ghost',
            'bg-destructive text-destructive-foreground hover:bg-destructive/90': variant === 'destructive',
            'bg-success text-success-foreground hover:bg-success/90 shadow-md': variant === 'success',
            'px-4 py-2.5 min-h-[44px]': size === 'sm',
            'px-6 py-3.5 min-h-[56px]': size === 'md',
            'px-8 py-4 min-h-[64px]': size === 'lg',
            'w-full': fullWidth,
          },
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
