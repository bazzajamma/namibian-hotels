import Link from 'next/link';
import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  asLink?: boolean;
  href?: string;
}

const variantStyles = {
  primary: 'bg-terracotta-600 hover:bg-terracotta-700 text-white',
  secondary: 'bg-sand-200 dark:bg-sand-800 text-sand-800 dark:text-sand-200 hover:bg-sand-300 dark:hover:bg-sand-700',
  outline: 'border-2 border-terracotta-600 text-terracotta-600 hover:bg-terracotta-50 dark:hover:bg-terracotta-900',
  ghost: 'hover:bg-sand-200 dark:hover:bg-sand-800 text-sand-800 dark:text-sand-200',
};

const sizeStyles = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', asLink = false, href, children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed';
    const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

    if (asLink && href) {
      return (
        <Link href={href} className={combinedClassName}>
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={combinedClassName} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

