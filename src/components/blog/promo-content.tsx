import { cn } from '@/lib/cn';
import { Button } from '@/components/ui/button';

interface PromoContentProps {
  variant?: 'desktop' | 'mobile';
  className?: string;
}

export function PromoContent({ variant = 'desktop', className }: PromoContentProps) {
  if (variant === 'mobile') {
    return (
      <div className={cn('border-t border-border bg-muted/20 p-3', className)}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center shrink-0">
            <span className="text-primary font-bold text-sm">L</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-foreground/90 truncate">
              Open a Lenco Account
            </p>
            <p className="text-xs text-muted-foreground truncate">
              Free business banking
            </p>
          </div>
          <a
            href="https://app.lenco.co/signup"
            className="text-xs text-primary hover:text-primary/80 font-medium"
          >
            Get Started
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('border border-border rounded-lg p-4 bg-card', className)}>
      <div className="flex flex-col gap-4">
        <div className="w-full h-32 rounded-md bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
          <div className="text-4xl font-bold text-primary">Lenco</div>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold tracking-tight">Open a Lenco Account</h3>
          <p className="text-sm text-muted-foreground">
            Get a free business current account with unlimited sub-accounts, instant
            payments, and powerful tools.
          </p>
        </div>
        <Button asChild className="w-full">
          <a href="https://app.lenco.co/signup">Get Started Free</a>
        </Button>
      </div>
    </div>
  );
}
