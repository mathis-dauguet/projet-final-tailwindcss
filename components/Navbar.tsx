import { useState } from 'react';
import { Link, NavLink } from 'react-router';
import logo from '../src/assets/logo.png';
import { useTheme } from '../src/utils/ThemeContext';

const links = [
  { to: '/', label: 'Accueil' },
  { to: '/animaux', label: 'Animaux' },
  { to: '/preparer-sa-visite', label: 'Visite' },
  { to: '/reservation', label: 'Réserver' },
];

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
    isActive
      ? 'bg-primary text-white dark:bg-secondary dark:text-primary-darkest'
      : 'text-primary-darker hover:bg-primary-light dark:text-cream dark:hover:bg-primary-dark'
  }`;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen((open) => !open);
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="border-b border-primary-light bg-cream dark:border-primary-dark dark:bg-primary-darkest">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="" width={36} height={36} className="size-8 rounded-full md:size-9" />
          <span className="font-display text-lg font-bold text-primary-darker md:text-xl dark:text-cream">
            Zoo Baobab
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Navigation principale">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end className={linkClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Passer en mode clair' : 'Passer en mode sombre'}
            className="flex size-11 items-center justify-center rounded-full border border-primary-light text-lg text-primary-darker hover:bg-primary-light dark:border-primary-dark dark:text-cream dark:hover:bg-primary-dark"
          >
            {theme === 'dark' ? '☀' : '☾'}
          </button>

          <Link
            to="/reservation"
            className="hidden rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-dark md:block dark:bg-secondary dark:text-primary-darkest dark:hover:bg-secondary-light"
          >
            Réserver
          </Link>

          <button
            type="button"
            aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={isOpen}
            onClick={toggleMenu}
            className="flex size-11 items-center justify-center rounded-full border border-primary-light text-lg text-primary-darker md:hidden dark:border-primary-dark dark:text-cream"
          >
            {isOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      <div
        inert={!isOpen}
        className={`grid transition-all duration-300 ease-out md:hidden ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <nav className="overflow-hidden" aria-label="Navigation mobile">
          <div className="flex flex-col gap-1 px-4 pb-4">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end
                className={linkClass}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
