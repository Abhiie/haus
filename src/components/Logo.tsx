import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  showText?: boolean;
  compact?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className, showText = true, compact = false }) => {
  return (
    <div className={cn("relative flex items-center gap-4", className)}>
      <div className={cn(
        "relative rounded-full bg-black flex items-center justify-center overflow-hidden border border-white/10",
        compact ? "w-10 h-10" : "w-20 h-20"
      )}>
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full p-2"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Abstract arch/dog icon representative of the logo in the image */}
          <path
            d="M30 70V40C30 30 40 25 50 25C60 25 70 30 70 40V70H60V55C60 48 56 42 50 42C44 42 40 48 40 55V70H30Z"
            fill="white"
          />
          <circle cx="65" cy="35" r="4" fill="#CC2626" />
        </svg>
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
