import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]';

  const variants = {
    primary: 'bg-[#0A0A0A] hover:bg-[#1A1A1A] text-white shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:-translate-y-[1px]',
    secondary: 'bg-[#FAFAFA] hover:bg-[#F0F0F0] text-[#0A0A0A] border border-[rgba(0,0,0,0.04)]',
    outline: 'border border-[rgba(0,0,0,0.06)] bg-white hover:bg-[#FAFAFA] text-[#0A0A0A]',
    ghost: 'bg-transparent hover:bg-[#FAFAFA] text-[#757575] hover:text-[#0A0A0A]',
    danger: 'bg-white hover:bg-rose-50 text-rose-600 border border-rose-100 hover:border-rose-200',
    success: 'bg-white hover:bg-emerald-50 text-emerald-600 border border-emerald-100 hover:border-emerald-200',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-5 py-2.5 text-[13px] gap-2',
    lg: 'px-8 py-3.5 text-[15px] gap-2.5',
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin h-4 w-4 text-current mr-2" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
};
