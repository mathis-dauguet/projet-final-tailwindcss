import { useState } from 'react';
import Button from '../components/Button';
import Card from '../components/Card';
import { animals, habitats, type Habitat } from '../src/data/animals';

type Filter = Habitat | 'Tous';

const filters: Filter[] = ['Tous', ...habitats];

const container = 'mx-auto w-full max-w-6xl px-4';

export default function Animals() {
  const [filter, setFilter] = useState<Filter>('Tous');
  const [query, setQuery] = useState('');

  const normalizedQuery = query.trim().toLowerCase();
  const visibleAnimals = animals.filter(
    (animal) =>
      (filter === 'Tous' || animal.habitat === filter) &&
      animal.name.toLowerCase().includes(normalizedQuery),
  );

  return (
    <>
      {/* Header */}
      <section className="bg-sand dark:bg-primary-darker">
        <div className={`${container} flex flex-col gap-4 py-10 md:py-16`}>
          <p className="text-[13px] font-semibold uppercase text-secondary-dark dark:text-secondary-light">
            Nos pensionnaires
          </p>
          <h1 className="font-display text-4xl leading-tight font-bold md:text-5xl">Les animaux du parc</h1>
          <p className="max-w-2xl text-base leading-7 text-primary-dark md:text-lg dark:text-sand">
            Plus de 200 espèces venues des cinq continents. Découvrez leurs habitats, leur statut de
            conservation et les horaires des nourrissages.
          </p>
        </div>
      </section>

      {/* Filters + list */}
      <section className={`${container} flex flex-col gap-8 py-10 md:py-12`}>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrer par habitat">
            {filters.map((item) => {
              const isActive = item === filter;
              return (
                <button
                  key={item}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setFilter(item)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-primary text-white dark:bg-secondary dark:text-primary-darkest'
                      : 'border border-primary-light bg-white text-primary-dark hover:bg-primary-light dark:border-primary-dark dark:bg-primary-darker dark:text-sand dark:hover:bg-primary-dark'
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>

          <label className="flex flex-col gap-1 md:w-72">
            <span className="sr-only">Rechercher un animal</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Rechercher un animal…"
              className="rounded-full border border-primary-light bg-white px-5 py-2.5 text-sm placeholder:text-primary-dark/60 focus:border-primary focus:outline-none dark:border-primary-dark dark:bg-primary-darker dark:placeholder:text-sand/60 dark:focus:border-secondary"
            />
          </label>
        </div>

        <p className="text-sm text-primary-dark dark:text-sand" aria-live="polite">
          {visibleAnimals.length} {visibleAnimals.length > 1 ? 'animaux' : 'animal'}
        </p>

        {visibleAnimals.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visibleAnimals.map((animal) => (
              <Card key={animal.name} animal={animal} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-primary-light p-10 text-center text-primary-dark dark:border-primary-dark dark:text-sand">
            Aucun animal ne correspond à votre recherche.
          </div>
        )}
      </section>

      {/* CTA */}
      <section className={`${container} pt-4 pb-12 md:pb-24`}>
        <div className="flex flex-col items-center gap-4 rounded-3xl bg-primary-dark px-6 py-10 text-center text-white md:px-12 md:py-14 dark:border dark:border-primary-dark dark:bg-primary-darker dark:text-cream">
          <h2 className="font-display text-2xl font-bold sm:text-3xl md:text-4xl">Venez les rencontrer</h2>
          <p className="text-base text-sand">
            Consultez les horaires des nourrissages et préparez votre journée au parc.
          </p>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button to="/reservation" variant="gold">
              Réserver mes billets
            </Button>
            <Button to="/preparer-sa-visite" variant="outline">
              Préparer ma visite
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
