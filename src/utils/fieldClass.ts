// Shared styles for text-like form fields (Input, Select).
export const fieldClass = `
  w-full rounded-lg border border-primary-light bg-white px-3 py-2.5 text-sm outline-none transition-colors
  focus:border-primary focus:ring-2 focus:ring-primary-light
  user-invalid:border-error dark:user-invalid:border-danger-light
  dark:border-primary-dark dark:bg-primary-darkest dark:scheme-dark
  dark:focus:border-secondary dark:focus:ring-secondary/30
`;
