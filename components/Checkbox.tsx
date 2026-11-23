import type { ComponentProps, ReactNode } from 'react';

type CheckboxProps = Omit<ComponentProps<'input'>, 'type' | 'className'> & {
  children: ReactNode;
};

export default function Checkbox({ children, ...props }: CheckboxProps) {
  return (
    <label className="flex cursor-pointer items-start gap-2 text-sm">
      <span className="relative mt-0.5 flex size-4 shrink-0">
        <input
          type="checkbox"
          className="
            peer size-4 cursor-pointer appearance-none rounded border border-primary bg-white
            checked:bg-primary
            user-invalid:border-error dark:user-invalid:border-danger-light
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
            pointer-events-none absolute inset-0 hidden size-4 text-white
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
