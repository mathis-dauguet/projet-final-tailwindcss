import type { ComponentProps } from 'react';

// Shared with Select so every form field looks the same
export const fieldClass =
  'w-full rounded-lg border border-primary-light bg-white py-2.5 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary-light dark:border-primary-dark dark:bg-primary-darkest dark:scheme-dark dark:focus:border-secondary dark:focus:ring-secondary/30';

type InputProps = Omit<ComponentProps<'input'>, 'className'>;

export default function Input({ type = 'text', ...props }: InputProps) {
  return (
    <input
      type={type}
      className={`${fieldClass} px-3 placeholder:text-primary-dark/60 dark:placeholder:text-sand/60`}
      {...props}
    />
  );
}
