import type { ReactNode } from 'react';
import { Link } from 'react-router';

type Variant = 'primary' | 'secondary' | 'gold' | 'outline';

const variants: Record<Variant, string> = {
  primary:
    'bg-primary px-6 text-white hover:bg-primary-dark dark:bg-secondary dark:text-primary-darkest dark:hover:bg-secondary-light',
  secondary:
    'border-2 border-primary px-6 text-primary-dark hover:bg-primary-light dark:border-secondary-light dark:text-sand dark:hover:bg-primary-dark',
  gold: 
    'bg-secondary px-8 text-primary-darkest hover:bg-secondary-light',
  outline:
    'border-2 border-sand px-6 text-sand hover:bg-primary-darker dark:hover:bg-primary-dark',
};

type ButtonProps = {
  to: string;
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

export default function Button({ to, variant = 'primary', className = '', children }: ButtonProps) {
  return (
    <Link
      to={to}
      className={`inline-flex items-center justify-center rounded-full py-3 text-sm font-semibold whitespace-nowrap transition-colors ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
