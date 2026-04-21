import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  showText?: boolean;
  compact?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ className, compact = false, size }) => {
  // For compact/navbar mode: show brand text only (logo image has black bg that clashes with white navbar)
  if (compact) {
    return (
      <div className={cn('flex items-center gap-3', className)}>
        <img
          src="/assets/images/logo.webp"
          alt="Haus Atelier"
          className="h-10 w-auto object-contain"
        />
        <span className="font-serif font-black tracking-[0.15em] text-text-base text-sm sm:text-lg whitespace-nowrap">
          HAUS ATELIER
        </span>
      </div>
    );
  }

  // Full logo image with all text and emblem embedded
  const imgSize = size === 'lg' ? 'w-72 h-72'
    : size === 'md' ? 'w-36 h-36'
      : size === 'sm' ? 'w-10 h-10'
        : 'w-28 h-28';

  return (
    <div className={cn('relative flex items-center', className)}>
      <img
        src="/assets/images/logo.webp"
        alt="Haus Atelier Logo"
        className={cn('object-contain flex-shrink-0', imgSize)}
      />
    </div>
  );
};
