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
          src="/assets/images/haus-logo-final.jpg"
          alt="Haus Atelier"
          className="h-14 sm:h-16 lg:h-20 w-auto object-contain rounded-xl overflow-hidden"
        />
      </div>
    );
  }

  // Full logo image with all text and emblem embedded
  const imgSize = size === 'lg' ? 'w-80 h-80 sm:w-96 sm:h-96'
    : size === 'md' ? 'w-48 h-48 sm:w-64 sm:h-64'
      : size === 'sm' ? 'w-16 h-16'
        : 'w-40 h-40 sm:w-48 sm:h-48';

  return (
    <div className={cn('relative flex items-center', className)}>
      <img
        src="/assets/images/haus-logo-final.jpg"
        alt="Haus Atelier Logo"
        className={cn('object-contain flex-shrink-0', imgSize)}
      />
    </div>
  );
};
