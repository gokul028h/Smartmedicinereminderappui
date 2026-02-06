import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '../utils/cn';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block mb-2 text-foreground">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            'w-full px-4 py-4 min-h-[56px] rounded-xl border-2 bg-white transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary',
            'placeholder:text-muted-foreground',
            error ? 'border-error' : 'border-border',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-2 text-error text-sm">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p className="mt-2 text-muted-foreground text-sm">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
