import { LucideIcon, TriangleAlert } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ErrorEmptyStateProps {
  mainText: string;
  description?: string;
  type?: 'error' | 'empty';
  icon?: LucideIcon;
  children?: React.ReactNode;
  className?: string;
}

export function ErrorEmptyState({
  mainText,
  type = 'empty',
  description,
  icon: Icon,
  children,
  className,
}: ErrorEmptyStateProps) {
  return (
    <div
      className={cn(
        'flex  flex-col items-center justify-center text-center',
        className
      )}
    >
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
        {type === 'error' && (
          <TriangleAlert className="h-10 w-10 text-muted-foreground" />
        )}
        {type === 'empty' && Icon && (
          <Icon className="h-10 w-10 text-muted-foreground" />
        )}
      </div>
      <h3 className="mt-6 text-2xl font-semibold tracking-tight">{mainText}</h3>
      {description && (
        <p className="mt-2 text-center text-muted-foreground max-w-sm">
          {description}
        </p>
      )}
      {children && <div className="mt-6">{children}</div>}
    </div>
  );
}
