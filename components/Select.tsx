import type { ComponentProps, ReactNode } from 'react';
import { fieldClass } from '../src/utils/styles';

type SelectProps = Omit<ComponentProps<'select'>, 'className'> & {
  placeholder?: string;
  children: ReactNode;
};

export default function Select({ placeholder, children, ...props }: SelectProps) {
  return (
    <div className="relative">
      <select
        defaultValue={placeholder !== undefined ? '' : undefined}
        className={`
          ${fieldClass}
          cursor-pointer appearance-none pr-9
          invalid:text-primary-dark/60
          dark:invalid:text-sand/60
        `}
        {...props}
      >
        {placeholder !== undefined && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {children}
      </select>
      <svg
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-primary dark:text-secondary"
      >
        <path d="M4 6l4 4 4-4" />
      </svg>
    </div>
  );
}
