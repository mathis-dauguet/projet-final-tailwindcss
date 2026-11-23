import type { ReactNode } from 'react';
import Required from './Required';

export const labelClass = 'text-xs font-semibold';

type FieldProps = {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: ReactNode;
};

export default function Field({ label, htmlFor, required, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className={labelClass}>
        {label}
        {required && <Required />}
      </label>
      {children}
    </div>
  );
}
