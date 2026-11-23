import { useEffect, useRef, useState, type SyntheticEvent } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import Button from '../components/Button';
import Checkbox from '../components/Checkbox';
import Field, { labelClass } from '../components/Field';
import Input from '../components/Input';
import PageHeader from '../components/PageHeader';
import Required from '../components/Required';
import Select from '../components/Select';
import { cardClass } from '../src/utils/styles';
import {
  DEFAULT_VALUES,
  ERROR_ORDER,
  PRICES,
  RULES,
  SLOTS,
  formatDate,
  formatPrice,
  getSummary,
  getToday,
  type Confirmation,
  type FormValues,
} from '../src/utils/reservation';

const sectionTitle = 'font-display text-xl font-bold';

const slotClass = `
  flex cursor-pointer flex-col items-center gap-0.5 rounded-lg border border-primary-light px-2 py-3.5 text-center transition-colors
  hover:bg-primary-lighter
  has-checked:border-primary has-checked:bg-primary has-checked:text-white
  has-focus-visible:ring-2 has-focus-visible:ring-primary-light
  dark:border-primary-dark dark:hover:bg-primary-dark
  dark:has-checked:border-secondary dark:has-checked:bg-secondary dark:has-checked:text-primary-darkest
  dark:has-focus-visible:ring-secondary/30
`;

export default function Reservation() {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormValues>({ defaultValues: DEFAULT_VALUES });
  const [adults, children, audioguide, restaurant] = useWatch({
    control,
    name: ['adults', 'children', 'audioguide', 'restaurant'],
  });
  const summary = getSummary({ adults, children, audioguide, restaurant });
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);
  const confirmationRef = useRef<HTMLDivElement>(null);
  const errorMessages = ERROR_ORDER.map((name) => errors[name]?.message).filter(Boolean);

  useEffect(() => {
    if (confirmation) confirmationRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [confirmation]);

  const onValid = (values: FormValues) => {
    setConfirmation({
      firstName: values.name.trim().split(' ')[0],
      email: values.email,
      date: formatDate(values.date),
      total: getSummary(values).total,
    });
  };

  const handleReset = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    reset();
    setConfirmation(null);
  };

  const errorProps = (name: keyof FormValues) => ({
    id: name,
    'aria-invalid': Boolean(errors[name]),
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
  });

  const summaryRows = [
    { label: 'Adultes', value: summary.adults },
    { label: 'Enfants', value: summary.children },
    { label: 'Options', value: summary.options },
  ];

  return (
    <>
      <PageHeader
        breadcrumb="Réserver"
        title="Réserver mes billets"
        subtitle="Remplissez le formulaire : vous recevrez vos billets par e-mail."
      />

      <section className="mx-auto grid w-full max-w-6xl gap-x-8 gap-y-6 px-4 pt-10 pb-16 md:pb-36 lg:grid-cols-[1fr_22rem]">
        {errorMessages.length > 0 && (
          <div
            role="alert"
            className="col-span-full flex flex-col gap-1.5 rounded-2xl border-2 border-error bg-danger-light p-5 text-sm text-danger dark:border-danger-light dark:bg-danger dark:text-danger-light"
          >
            <p className="font-bold">Le formulaire contient des erreurs :</p>
            <ul className="flex list-inside list-disc flex-col gap-1.5">
              {errorMessages.map((message) => (
                <li key={message}>{message}</li>
              ))}
            </ul>
          </div>
        )}

        <div ref={confirmationRef} role="status" className="col-span-full empty:hidden">
          {confirmation && (
            <div className="flex flex-col gap-1 rounded-2xl border-2 border-primary bg-primary-lighter p-6 dark:border-secondary dark:bg-primary-darker">
              <p className="font-display text-xl font-bold">Réservation confirmée !</p>
              <p className="text-sm text-primary-dark dark:text-sand">
                Merci {confirmation.firstName} ! Vos billets ({formatPrice(confirmation.total)}) seront envoyés à{' '}
                {confirmation.email}. Rendez-vous le {confirmation.date}.
              </p>
            </div>
          )}
        </div>

        <form
          noValidate
          onSubmit={handleSubmit(onValid, () => setConfirmation(null))}
          onReset={handleReset}
          className={`${cardClass} flex flex-col gap-8 p-5 md:p-8`}
        >
          <div className="flex flex-col gap-5">
            <h2 className={sectionTitle}>1. Vos coordonnées</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Nom complet" htmlFor="name" required error={errors.name?.message}>
                <Input {...errorProps('name')} {...register('name', RULES.name)} autoComplete="name" required />
              </Field>
              <Field label="E-mail" htmlFor="email" required error={errors.email?.message}>
                <Input
                  {...errorProps('email')}
                  {...register('email', RULES.email)}
                  type="email"
                  autoComplete="email"
                  placeholder="vous@exemple.fr"
                  required
                />
              </Field>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <h2 className={sectionTitle}>2. Votre visite</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Date de visite" htmlFor="date" required error={errors.date?.message}>
                <Input {...errorProps('date')} {...register('date', RULES.date)} type="date" min={getToday()} required />
              </Field>
              <Field label="Type de visite" htmlFor="visitType" required>
                <Select id="visitType" {...register('visitType')} required>
                  <option value="libre">Visite libre</option>
                  <option value="guidee">Visite guidée</option>
                </Select>
              </Field>
              <Field
                label={`Adultes (${formatPrice(PRICES.adult)})`}
                htmlFor="adults"
                required
                error={errors.adults?.message}
              >
                <Input {...errorProps('adults')} {...register('adults', RULES.adults)} type="number" min={1} required />
              </Field>
              <Field
                label={`Enfants 3-11 ans (${formatPrice(PRICES.child)})`}
                htmlFor="children"
                required
                error={errors.children?.message}
              >
                <Input
                  {...errorProps('children')}
                  {...register('children', RULES.children)}
                  type="number"
                  min={0}
                  required
                />
              </Field>
            </div>

            <fieldset>
              <legend className={`${labelClass} mb-5`}>
                Créneau d'arrivée
                <Required />
              </legend>
              <div className="grid grid-cols-3 gap-3">
                {SLOTS.map((slot) => (
                  <label key={slot.value} className={slotClass}>
                    <input type="radio" value={slot.value} {...register('slot')} className="sr-only" />
                    <span className="text-sm font-semibold">{slot.label}</span>
                    <span className="text-xs opacity-80">{slot.hours}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className={sectionTitle}>3. Options</h2>
            <Checkbox {...register('audioguide')}>
              Audioguide (+{formatPrice(PRICES.audioguide)} / pers.)
            </Checkbox>
            <Checkbox {...register('restaurant')}>
              Repas au restaurant du zoo (+{formatPrice(PRICES.restaurant)} / pers.)
            </Checkbox>
            <Field label="Message ou besoin particulier" htmlFor="message">
              <Input id="message" {...register('message')} placeholder="Accessibilité, allergies, anniversaire…" />
            </Field>
          </div>

          <Checkbox {...register('terms', RULES.terms)} required aria-invalid={Boolean(errors.terms)}>
            J'accepte les conditions générales de vente et la politique de confidentialité.
            <Required />
          </Checkbox>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button type="submit" className="flex-1">
              Confirmer la réservation
            </Button>
            <Button type="reset" variant="secondary">
              Effacer
            </Button>
          </div>
        </form>

        <aside className={`${cardClass} flex flex-col gap-3 self-start p-6`}>
          <h2 className={sectionTitle}>Récapitulatif</h2>
          <dl className="flex flex-col gap-3 text-sm">
            {summaryRows.map((row) => (
              <div key={row.label} className="flex justify-between">
                <dt>{row.label}</dt>
                <dd className="font-semibold">{formatPrice(row.value)}</dd>
              </div>
            ))}
            <div className="flex items-center justify-between border-t border-primary-light py-4 dark:border-primary-dark">
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
