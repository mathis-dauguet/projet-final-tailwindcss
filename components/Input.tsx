import type { ComponentProps } from 'react';
import { fieldClass } from '../src/utils/styles';

type InputProps = Omit<ComponentProps<'input'>, 'className'>;

export default function Input({ type = 'text', ...props }: InputProps) {
  return (
    <input
      type={type}
      className={`
        ${fieldClass}
        placeholder:text-primary-dark/60
        dark:placeholder:text-sand/60
      `}
      {...props}
    />
  );
}
