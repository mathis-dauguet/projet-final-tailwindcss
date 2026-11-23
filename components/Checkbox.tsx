import type { ComponentProps, ReactNode } from 'react';

type CheckboxProps = Omit<ComponentProps<'input'>, 'type' | 'className'> & {
  children: ReactNode;
};

export default function Checkbox({ children, ...props }: CheckboxProps) {
  return (
    <label className="flex cursor-pointer items-start gap-3 text-sm">
      <span className="relative flex size-5 shrink-0">
        <input
          type="checkbox"
          className="
            peer size-5 cursor-pointer appearance-none rounded border border-primary bg-white
            checked:bg-primary
            aria-invalid:border-error dark:aria-invalid:border-danger-light
            focus-visible:ring-2 focus-visible:ring-primary-light focus-visible:outline-none
            dark:border-secondary dark:bg-primary-darkest dark:checked:bg-secondary dark:focus-visible:ring-secondary/30
          "
          {...props}
        />
        <svg
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="
            pointer-events-none absolute inset-0 hidden size-5 text-white
            peer-checked:block
            dark:text-primary-darkest
          "
        >
          <path d="M4 8.5l2.5 2.5L12 5.5" />
        </svg>
      </span>
      <span>{children}</span>
    </label>
  );
}
