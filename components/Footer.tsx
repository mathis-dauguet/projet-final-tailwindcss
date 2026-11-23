import { Link } from 'react-router';

const links = [
  { to: '/', label: 'Accueil' },
  { to: '/animaux', label: 'Animaux' },
  { to: '/preparer-sa-visite', label: 'Visite' },
  { to: '/reservation', label: 'Réserver' },
];

export default function Footer() {
  return (
    <footer className="bg-primary-darker py-10 text-cream dark:bg-primary-black">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-3">
        <div className="flex max-w-xs flex-col gap-2">
          <h2 className="font-display text-2xl font-bold">Zoo Baobab</h2>
          <p className="text-sm leading-6 text-sand">
            Un parc animalier engagé pour la préservation de la biodiversité.
          </p>
        </div>

          <nav className="flex flex-col gap-2">
            <h3 className="text-xs font-semibold uppercase text-sand">Explorer</h3>
            {links.map((link) => (
              <Link key={link.to} to={link.to} className="text-sm hover:underline">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-2">
            <h3 className="text-xs font-semibold uppercase text-sand">Nous trouver</h3>
            <address className="text-sm leading-6 not-italic">
              12 route de la Savane
              <br />
              75000 Paris
              <br />
              <a href="tel:0100000000" className="hover:underline">01 00 00 00 00</a>
            </address>
          </div>
      </div>

      <p className="mt-8 px-4 text-center text-sm text-sand">
        © 2026 Zoo Baobab — Projet pédagogique, contenu fictif.
      </p>
    </footer>
  );
}
