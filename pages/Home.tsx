import Button from '../components/Button';
import Card from '../components/Card';
import { animals } from '../src/data/animals';
import hero from '../src/assets/home/hero.png';
import iconWorkshops from '../src/assets/home/icon-workshops.png';
import iconPlanet from '../src/assets/home/icon-planet.png';
import iconAccessible from '../src/assets/home/icon-accessible.png';
import { cardClass } from '../src/utils/styles';

const stats = [
  { value: '200+', label: 'espèces' },
  { value: '30 ha', label: 'de parc' },
  { value: '45', label: 'programmes de conservation' },
  { value: '350 000', label: 'visiteurs par an' },
];

const stars = animals.slice(0, 3);

const features = [
  {
    icon: iconWorkshops,
    width: 33,
    height: 30,
    title: 'Ateliers pédagogiques',
    text: 'Des animations pour les scolaires et les familles, encadrées par nos soigneurs.',
  },
  {
    icon: iconPlanet,
    width: 33,
    height: 30,
    title: 'Engagé pour la planète',
    text: 'Chaque billet finance des programmes de préservation sur le terrain.',
  },
  {
    icon: iconAccessible,
    width: 34,
    height: 32,
    title: 'Parc accessible',
    text: 'Parcours adaptés aux poussettes et aux personnes à mobilité réduite.',
  },
];

const container = 'mx-auto w-full max-w-6xl px-4';

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="bg-sand dark:bg-primary-darker">
        <div className={`${container} flex flex-col gap-6 py-8 md:flex-row md:items-center md:gap-12 md:py-24`}>
          <div className="flex flex-1 flex-col items-start gap-5">
            <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white dark:bg-secondary dark:text-primary-darkest">
              Ouvert 7j/7
            </span>
            <h1 className="font-display text-4xl leading-tight font-bold md:text-6xl md:leading-16.5">
              À la rencontre de la vie sauvage
            </h1>
            <p className="text-base leading-7 text-primary-dark md:text-lg dark:text-sand">
              Plus de 200 espèces sur 30 hectares. Une journée pour émerveiller petits et grands, et
              soutenir la protection de la nature.
            </p>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Button to="/reservation">Réserver mes billets</Button>
              <Button to="/animaux" variant="secondary">
                Découvrir les animaux
              </Button>
            </div>
          </div>

          <div className="flex-1">
            <img
              src={hero}
              alt="Une famille nourrit des lémuriens au Zoo Baobab"
              width={547}
              height={365}
              className="aspect-547/365 w-full rounded-2xl object-cover"
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className={`${container} grid grid-cols-2 gap-4 py-8 md:grid-cols-4`}>
        {stats.map((stat) => (
          <div key={stat.label} className={`${cardClass} flex flex-col items-center gap-1 p-5 text-center`}>
            <p className="font-display text-3xl font-bold text-primary dark:text-secondary">{stat.value}</p>
            <p className="text-sm text-primary-dark dark:text-sand">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* Featured animals */}
      <section className={`${container} flex flex-col gap-8 py-12`}>
        <div className="flex flex-wrap items-end justify-between gap-4 md:items-center">
          <div className="flex flex-col gap-2">
            <p className="text-[13px] font-semibold uppercase text-secondary-dark dark:text-secondary-light">
              Nos pensionnaires
            </p>
            <h2 className="font-display text-3xl font-bold md:text-4xl">Les stars du moment</h2>
          </div>
          <Button to="/animaux" variant="secondary">
            Voir tous les animaux
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {stars.map((animal) => (
            <Card key={animal.name} animal={animal} />
          ))}
        </div>
      </section>

      {/* Why visit */}
      <section className={`${container} flex flex-col gap-10 py-12`}>
        <h2 className="text-center font-display text-3xl font-bold md:text-4xl">
          Une visite pour toute la famille
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className={`${cardClass} flex flex-col gap-3 p-6`}>
              <div className="flex size-12 items-center justify-center rounded-xl bg-primary-light dark:bg-primary-dark">
                <img src={feature.icon} alt="" width={feature.width} height={feature.height} className="rounded-lg" />
              </div>
              <h3 className="font-display text-xl font-bold">{feature.title}</h3>
              <p className="text-[15px] leading-5.5 text-primary-dark dark:text-sand">{feature.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className={`${container} pt-12 pb-12 md:pb-36`}>
        <div className="flex flex-col items-center gap-4 rounded-3xl bg-primary-dark px-6 py-10 text-center text-white md:px-12 md:py-14 dark:border dark:border-primary-dark dark:bg-primary-darker dark:text-cream">
          <h2 className="font-display text-2xl font-bold sm:text-3xl md:text-4xl">Prêt pour l'aventure ?</h2>
          <p className="text-base text-sand">
            Réservez en ligne et évitez la file d'attente : entrée prioritaire et tarif réduit pour les
            groupes.
          </p>
          <Button to="/reservation" variant="gold">
            Réserver maintenant
          </Button>
        </div>
      </section>
    </>
  );
}
