import type { Animal, Status } from '../src/data/animals';

export type { Animal };

const statusStyles: Record<Status, string> = {
  'Préoccupation mineure':
    'bg-primary-lighter text-primary-dark dark:bg-primary-dark dark:text-primary-light',
  Vulnérable: 'bg-warning-light text-warning dark:bg-warning-darkest dark:text-warning-pale',
  'En danger': 'bg-danger-light text-danger dark:bg-danger dark:text-danger-light',
  'En danger critique': 'bg-error text-white',
};

export default function Card({ animal }: { animal: Animal }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-primary-light bg-white dark:border-primary-dark dark:bg-primary-darker">
      <div className="h-44">
        <img src={animal.image} alt={animal.name} className="size-full object-cover" loading="lazy" />
      </div>

      <div className="flex flex-col gap-3 p-5">
        <div className="flex flex-wrap gap-2">
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[animal.status]}`}>
            {animal.status}
          </span>
          <span className="rounded-full bg-sand px-3 py-1 text-xs font-semibold text-secondary-dark dark:bg-primary-dark dark:text-secondary-light">
            {animal.habitat}
          </span>
        </div>
        <h3 className="font-display text-xl leading-5 font-bold">{animal.name}</h3>
        <p className="text-sm leading-5 text-primary-dark dark:text-sand">{animal.description}</p>
        <p className="text-sm font-semibold text-primary dark:text-secondary">{animal.schedule}</p>
      </div>
    </article>
  );
}
