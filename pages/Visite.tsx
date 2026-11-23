import Button from '../components/Button';
import PageHeader from '../components/PageHeader';
import { cardClass } from '../src/utils/styles';

const container = 'mx-auto w-full max-w-6xl px-4';
const sectionTitle = 'text-center font-display text-3xl font-bold md:text-4xl';

const openingHours = [
  { day: 'Lundi – Vendredi', hours: '9h30 – 18h00' },
  { day: 'Samedi – Dimanche', hours: '9h00 – 19h00' },
  { day: 'Jours fériés', hours: '9h00 – 19h00' },
  { day: 'Dernière entrée', hours: '1h30 avant la fermeture' },
];

const zones = [
  {
    name: 'Savane',
    className: 'bg-sand text-secondary-dark dark:bg-secondary-dark/30 dark:text-secondary-light',
  },
  {
    name: 'Forêt tropicale',
    className: 'bg-primary-light text-primary-darker dark:bg-primary-dark dark:text-cream',
  },
  {
    name: 'Montagne',
    className: 'bg-sand text-primary-dark dark:bg-secondary-dark/30 dark:text-secondary-light',
  },
  {
    name: 'Côtes & océans',
    className: 'bg-primary-light text-primary-dark dark:bg-primary-dark dark:text-cream',
  },
];

const prices = [
  { label: 'Enfant', detail: '3 – 11 ans', price: '14 €' },
  { label: 'Adulte', detail: 'dès 12 ans', price: '24 €', featured: true },
  { label: 'Famille', detail: '2 adultes + 2 enfants', price: '65 €' },
];

const faq = [
  {
    question: 'Puis-je venir avec ma poussette ?',
    answer:
      "Oui, tous les chemins sont adaptés. Des poussettes et fauteuils roulants sont également disponibles à l'accueil.",
  },
  {
    question: 'Les animaux de compagnie sont-ils acceptés ?',
    answer:
      "Non, pour la sécurité et la tranquillité de nos pensionnaires (hors chiens d'assistance).",
  },
  {
    question: 'Puis-je apporter mon pique-nique ?',
    answer:
      'Oui, trois aires de pique-nique sont à votre disposition. Un restaurant est aussi ouvert toute la journée.',
  },
  {
    question: 'Puis-je annuler ma réservation ?',
    answer: "Les billets sont modifiables gratuitement jusqu'à 48 heures avant la date de visite.",
  },
];

export default function Visite() {
  return (
    <>
      <PageHeader
        breadcrumb="Visite"
        title="Préparer sa visite"
        subtitle="Horaires, tarifs et conseils pour profiter pleinement de votre journée."
      />

      {/* Hours + park map */}
      <section className={`${container} grid gap-8 pt-12 md:grid-cols-2 md:items-start`}>
        <div className={`${cardClass} flex flex-col gap-4 p-6 md:p-8`}>
          <h2 className="font-display text-2xl font-bold">Horaires</h2>
          <dl className="flex flex-col">
            {openingHours.map((item) => (
              <div
                key={item.day}
                className="flex items-center justify-between gap-4 border-t border-primary-light py-4 last:pb-0 dark:border-primary-dark"
              >
                <dt>{item.day}</dt>
                <dd className="text-right font-semibold text-primary dark:text-secondary">{item.hours}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className={`${cardClass} flex flex-col gap-4 p-6 md:p-8`}>
          <h2 className="font-display text-2xl font-bold">Plan du parc</h2>
          <ul className="grid grid-cols-2 gap-3">
            {zones.map((zone) => (
              <li
                key={zone.name}
                className={`flex min-h-14 items-center justify-center rounded-xl px-3 py-4 text-center font-semibold ${zone.className}`}
              >
                {zone.name}
              </li>
            ))}
          </ul>
          <p className="text-sm leading-6 text-primary-dark dark:text-sand">
            Comptez environ 4 heures pour un parcours complet. Un petit train relie les zones toutes les
            20 minutes.
          </p>
        </div>
      </section>

      {/* Prices */}
      <section className={`${container} flex flex-col gap-10 pt-16`}>
        <h2 className={sectionTitle}>Tarifs</h2>
        <div className="grid gap-6 md:grid-cols-3 md:items-start">
          {prices.map((item) => (
            <div
              key={item.label}
              className={`flex flex-col items-center gap-1 rounded-2xl bg-white p-8 text-center dark:bg-primary-darker ${
                item.featured
                  ? 'border-2 border-secondary'
                  : 'border border-primary-light dark:border-primary-dark'
              }`}
            >
              {item.featured && (
                <span className="mb-1 rounded-full bg-secondary px-3 py-0.5 text-xs font-semibold text-primary-darkest">
                  Le plus choisi
                </span>
              )}
              <h3 className="font-display text-2xl font-bold">{item.label}</h3>
              <p className="text-sm text-primary-dark dark:text-sand">{item.detail}</p>
              <p className="my-3 font-display text-5xl font-bold text-primary dark:text-secondary">
                {item.price}
              </p>
              <Button to="/reservation" variant={item.featured ? 'primary' : 'secondary'}>
                Réserver
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className={`${container} flex flex-col gap-10 pt-16 pb-16 md:pb-36`}>
        <h2 className={sectionTitle}>Questions fréquentes</h2>
        <div className="flex flex-col gap-3">
          {faq.map((item) => (
            <details key={item.question} open className={`${cardClass} px-5 py-5`}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold [&::-webkit-details-marker]:hidden">
                {item.question}
                <span aria-hidden="true" className="text-xl leading-none">
                  +
                </span>
              </summary>
              <p className="mt-2 text-primary-dark dark:text-sand">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
