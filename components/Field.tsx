import type { ReactNode } from 'react';
import Required from './Required';

export const labelClass = 'text-sm font-semibold';

type FieldProps = {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
};

export default function Field({ label, htmlFor, required, error, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className={labelClass}>
        {label}
        {required && <Required />}
      </label>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} className="text-xs text-error dark:text-danger-light">
          {error}
        </p>
      )}
    </div>
  );
}
