import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  showText?: boolean;
  compact?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ className, showText = true, compact = false, size }) => {
  // Determine icon size — 'size' prop takes priority, else based on compact
  const wrapperSize = size === 'lg' ? 'w-28 h-28'
    : size === 'md' ? 'w-16 h-16'
      : size === 'sm' ? 'w-10 h-10'
        : compact ? 'w-10 h-10' : 'w-16 h-16';

  return (
    <div className={cn("relative flex items-center gap-4", className)}>
      {/* Circular clip wrapper ensures the logo is always a perfect circle */}
      <div className={cn("rounded-full overflow-hidden flex-shrink-0", wrapperSize)}>
        <img
          src="/assets/images/logo.png"
          alt="Haus Atelier Logo"
          className="w-full h-full object-cover"
        />
      </div>

      {showText && !compact && (
        <div className="flex flex-col">
          <span className="font-serif text-2xl font-bold tracking-[0.1em] leading-tight text-text-base">HAUS ATELIER</span>
          <span className="text-[10px] tracking-[0.3em] text-text-base/60 uppercase">Interior Studio</span>
        </div>
      )}

      {showText && compact && (
        <span className="font-serif text-lg font-bold tracking-[0.05em] text-text-base">HAUS ATELIER</span>
      )}
    </div>
  );
};
