import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Link } from 'react-router';
import Checkbox from '../components/Checkbox';
import Input from '../components/Input';
import Select from '../components/Select';

const slots = [
  { value: 'matin', label: 'Matin', hours: '9h – 11h' },
  { value: 'midi', label: 'Midi', hours: '11h – 14h' },
  { value: 'apres-midi', label: 'Après-midi', hours: '14h – 17h' },
];

const PRICES = { adult: 24, child: 14, audioguide: 3, restaurant: 12 };
const DEFAULTS = { adults: 1, children: 0, audioguide: true, restaurant: false };

type Choices = typeof DEFAULTS;

function getSummary({ adults, children, audioguide, restaurant }: Choices) {
  const optionsPerPerson = (audioguide ? PRICES.audioguide : 0) + (restaurant ? PRICES.restaurant : 0);
  const summary = {
    adults: adults * PRICES.adult,
    children: children * PRICES.child,
    options: optionsPerPerson * (adults + children),
  };
  return { ...summary, total: summary.adults + summary.children + summary.options };
}

function readChoices(form: HTMLFormElement): Choices {
  const data = new FormData(form);
  return {
    adults: Math.max(0, Number(data.get('adults')) || 0),
    children: Math.max(0, Number(data.get('children')) || 0),
    audioguide: data.has('audioguide'),
    restaurant: data.has('restaurant'),
  };
}

const formatPrice = (value: number) => `${value}\u00a0€`;

// "2026-11-12" -> "jeudi 12 novembre 2026" (T00:00 keeps the local day instead of UTC)
const formatDate = (value: string) =>
  new Date(`${value}T00:00`).toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

type Confirmation = { firstName: string; email: string; date: string; total: number };

const cardBox = 'rounded-2xl border border-primary-light bg-white dark:border-primary-dark dark:bg-primary-darker';
const sectionTitle = 'font-display text-lg font-bold';
const label = 'text-xs font-semibold';
function Required() {
  return (
    <span className="text-error dark:text-danger-light" aria-hidden="true">
      {' '}*
    </span>
  );
}

export default function Reservation() {
  const [summary, setSummary] = useState(() => getSummary(DEFAULTS));
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);
  const confirmationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (confirmation) confirmationRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [confirmation]);

  const updateSummary = (event: FormEvent<HTMLFormElement>) => setSummary(getSummary(readChoices(event.currentTarget)));
  // The reset event fires before the fields are cleared, so we use the defaults directly
  const resetSummary = () => {
    setSummary(getSummary(DEFAULTS));
    setConfirmation(null);
  };

  const confirm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setConfirmation({
      firstName: String(data.get('name')).trim().split(' ')[0],
      email: String(data.get('email')),
      date: formatDate(String(data.get('date'))),
      total: summary.total,
    });
  };

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

      {/* Form */}
      <section className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-8 md:py-12 lg:grid-cols-3">
        {/* Confirmation */}
        <div ref={confirmationRef} role="status" className="empty:hidden lg:col-span-3">
          {confirmation && (
            <div className="flex flex-col gap-1 rounded-2xl border-2 border-primary bg-primary-lighter px-5 py-4 dark:border-secondary dark:bg-primary-darker">
              <p className="font-display text-lg font-bold">Réservation confirmée !</p>
              <p className="text-sm text-primary-dark dark:text-sand">
                Merci {confirmation.firstName} ! Vos billets ({formatPrice(confirmation.total)}) seront envoyés à{' '}
                {confirmation.email}. Rendez-vous le {confirmation.date}.
              </p>
            </div>
          )}
        </div>

        <form
          onSubmit={confirm}
          onChange={updateSummary}
          onReset={resetSummary}
          className={`${cardBox} flex flex-col gap-6 p-5 md:p-6 lg:col-span-2`}
        >
          {/* 1. Contact */}
          <div className="flex flex-col gap-4">
            <h2 className={sectionTitle}>1. Vos coordonnées</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className={label}>
                  Nom complet
                  <Required />
                </label>
                <Input id="name" name="name" autoComplete="name" required />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className={label}>
                  E-mail
                  <Required />
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="vous@exemple.fr"
                  required
                />
              </div>
            </div>
          </div>

          {/* 2. Visit */}
          <div className="flex flex-col gap-4">
            <h2 className={sectionTitle}>2. Votre visite</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="date" className={label}>
                  Date de visite
                  <Required />
                </label>
                <Input id="date" name="date" type="date" required />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="visit-type" className={label}>
                  Type de visite
                  <Required />
                </label>
                <Select id="visit-type" name="visitType" placeholder="Sélectionner" required>
                  <option value="libre">Visite libre</option>
                  <option value="guidee">Visite guidée</option>
                </Select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="adults" className={label}>
                  Adultes (24 €)
                  <Required />
                </label>
                <Input id="adults" name="adults" type="number" min={1} defaultValue={DEFAULTS.adults} required />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="children" className={label}>
                  Enfants 3-11 ans (14 €)
                  <Required />
                </label>
                <Input id="children" name="children" type="number" min={0} defaultValue={DEFAULTS.children} required />
              </div>
            </div>

            <fieldset className="flex flex-col gap-1.5">
              <legend className={`${label} mb-1.5`}>
                Créneau d'arrivée
                <Required />
              </legend>
              <div className="grid grid-cols-3 gap-2">
                {slots.map((slot) => (
                  <label
                    key={slot.value}
                    className="flex cursor-pointer flex-col items-center gap-0.5 rounded-lg border border-primary-light px-2 py-2.5 text-center transition-colors hover:bg-primary-lighter has-checked:border-primary has-checked:bg-primary has-checked:text-white has-focus-visible:ring-2 has-focus-visible:ring-primary-light dark:border-primary-dark dark:hover:bg-primary-dark dark:has-checked:border-secondary dark:has-checked:bg-secondary dark:has-checked:text-primary-darkest dark:has-focus-visible:ring-secondary/30"
                  >
                    <input
                      type="radio"
                      name="slot"
                      value={slot.value}
                      defaultChecked={slot.value === 'matin'}
                      required
                      className="sr-only"
                    />
                    <span className="text-xs font-semibold">{slot.label}</span>
                    <span className="text-[11px] opacity-80">{slot.hours}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          </div>

          {/* 3. Options */}
          <div className="flex flex-col gap-4">
            <h2 className={sectionTitle}>3. Options</h2>
            <div className="flex flex-col gap-2.5">
              <Checkbox name="audioguide" defaultChecked={DEFAULTS.audioguide}>
                Audioguide (+3 € / pers.)
              </Checkbox>
              <Checkbox name="restaurant" defaultChecked={DEFAULTS.restaurant}>Repas au restaurant du zoo (+12 € / pers.)</Checkbox>
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className={label}>
                Message ou besoin particulier
              </label>
              <Input
                id="message"
                name="message"
               
                placeholder="Accessibilité, allergies, anniversaire…"
              />
            </div>
          </div>

          <Checkbox name="terms" required>
            J'accepte les conditions générales de vente et la politique de confidentialité.
            <Required />
          </Checkbox>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              className="flex-1 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark dark:bg-secondary dark:text-primary-darkest dark:hover:bg-secondary-light"
            >
              Confirmer la réservation
            </button>
            <button
              type="reset"
              className="rounded-full border-2 border-primary px-6 py-3 text-sm font-semibold text-primary-dark transition-colors hover:bg-primary-light dark:border-secondary-light dark:text-sand dark:hover:bg-primary-dark"
            >
              Effacer
            </button>
          </div>
        </form>

        {/* Summary */}
        <aside className={`${cardBox} flex flex-col gap-4 self-start p-5 md:p-6`}>
          <h2 className={sectionTitle}>Récapitulatif</h2>
          <dl className="flex flex-col gap-2 text-sm">
            <div className="flex justify-between">
              <dt>Adultes</dt>
              <dd className="font-semibold">{formatPrice(summary.adults)}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Enfants</dt>
              <dd className="font-semibold">{formatPrice(summary.children)}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Options</dt>
              <dd className="font-semibold">{formatPrice(summary.options)}</dd>
            </div>
            <div className="mt-2 flex items-center justify-between border-t border-primary-light pt-4 dark:border-primary-dark">
              <dt className="font-semibold">Total</dt>
              <dd className="font-display text-3xl font-bold text-primary dark:text-secondary" aria-live="polite">
                {formatPrice(summary.total)}
              </dd>
            </div>
          </dl>
          <p className="text-xs text-primary-dark dark:text-sand">Paiement sécurisé via Stripe</p>
        </aside>
      </section>
    </>
  );
}
