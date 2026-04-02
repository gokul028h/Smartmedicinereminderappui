import { cn } from '../../app/utils/cn';

interface LoadingSkeletonProps {
  variant?: 'card' | 'list' | 'text' | 'circle' | 'chart';
  count?: number;
  className?: string;
}

function SkeletonPulse({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'animate-pulse bg-gradient-to-r from-muted via-muted/60 to-muted rounded-xl',
        className
      )}
    />
  );
}

export function LoadingSkeleton({ variant = 'card', count = 1, className }: LoadingSkeletonProps) {
  const items = Array.from({ length: count });

  if (variant === 'card') {
    return (
      <div className={cn('space-y-4', className)}>
        {items.map((_, i) => (
          <div key={i} className="bg-card rounded-2xl shadow-sm p-5 space-y-3">
            <div className="flex items-center gap-4">
              <SkeletonPulse className="w-12 h-12 rounded-xl" />
              <div className="flex-1 space-y-2">
                <SkeletonPulse className="h-4 w-3/4" />
                <SkeletonPulse className="h-3 w-1/2" />
              </div>
            </div>
            <SkeletonPulse className="h-3 w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'list') {
    return (
      <div className={cn('space-y-3', className)}>
        {items.map((_, i) => (
          <div key={i} className="flex items-center gap-3 p-3">
            <SkeletonPulse className="w-10 h-10 rounded-lg" />
            <div className="flex-1 space-y-2">
              <SkeletonPulse className="h-3 w-2/3" />
              <SkeletonPulse className="h-2 w-1/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'chart') {
    return (
      <div className={cn('bg-card rounded-2xl shadow-sm p-6', className)}>
        <SkeletonPulse className="h-5 w-1/3 mb-6" />
        <div className="flex items-end gap-3 h-48">
          {Array.from({ length: 7 }).map((_, i) => (
            <SkeletonPulse
              key={i}
              className="flex-1"
              style={{ height: `${30 + Math.random() * 70}%` } as any}
            />
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'circle') {
    return <SkeletonPulse className={cn('w-32 h-32 !rounded-full', className)} />;
  }

  // text
  return (
    <div className={cn('space-y-2', className)}>
      {items.map((_, i) => (
        <SkeletonPulse key={i} className="h-4 w-full" />
      ))}
    </div>
  );
}
