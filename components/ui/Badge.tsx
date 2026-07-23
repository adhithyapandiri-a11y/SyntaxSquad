import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'outline';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'sm',
  ...props
}) => {
  const base = 'inline-flex items-center font-medium rounded-full border transition-colors';

  const variants = {
    primary: 'bg-[#FAFAFA] text-[#0A0A0A] border-[rgba(0,0,0,0.06)]',
    secondary: 'bg-white text-[#757575] border-[rgba(0,0,0,0.06)]',
    success: 'bg-[#FAFAFA] text-[#0A0A0A] border-[rgba(0,0,0,0.06)]',
    warning: 'bg-[#FAFAFA] text-[#0A0A0A] border-[rgba(0,0,0,0.06)]',
    danger: 'bg-[#FAFAFA] text-[#0A0A0A] border-[rgba(0,0,0,0.06)]',
    info: 'bg-[#FAFAFA] text-[#0A0A0A] border-[rgba(0,0,0,0.06)]',
    outline: 'border-[rgba(0,0,0,0.06)] text-[#0A0A0A] bg-transparent',
  };

  const sizes = {
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  };

  return (
    <span className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </span>
  );
};
