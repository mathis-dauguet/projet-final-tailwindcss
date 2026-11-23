import { Link } from 'react-router';

export default function Reservation() {
  return (
    <>
      {/* Banner */}
      <section className="bg-sand dark:bg-primary-darker">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-8 md:py-12">
          <nav aria-label="Fil d'Ariane" className="text-xs text-primary-dark dark:text-sand">
            <ol className="flex items-center gap-1.5">
              <li>
                <Link to="/" className="hover:underline">
                  Accueil
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">Réserver</li>
            </ol>
          </nav>
          <h1 className="font-display text-4xl font-bold md:text-5xl">Réserver mes billets</h1>
          <p className="text-base text-primary-dark dark:text-sand">
            Remplissez le formulaire : vous recevez vos billets par e-mail.
          </p>
        </div>
      </section>
    </>
  );
}
