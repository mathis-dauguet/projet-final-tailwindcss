import type { RegisterOptions } from 'react-hook-form';

export const SLOTS = [
  { value: 'matin', label: 'Matin', hours: '9h – 11h' },
  { value: 'midi', label: 'Midi', hours: '11h – 14h' },
  { value: 'apres-midi', label: 'Après-midi', hours: '14h – 17h' },
];

export const PRICES = { adult: 24, child: 14, audioguide: 3, restaurant: 12 };

export type FormValues = {
  name: string;
  email: string;
  date: string;
  visitType: 'libre' | 'guidee';
  adults: number;
  children: number;
  slot: string;
  audioguide: boolean;
  restaurant: boolean;
  message: string;
  terms: boolean;
};

export const DEFAULT_VALUES: FormValues = {
  name: '',
  email: '',
  date: '',
  visitType: 'libre',
  adults: 1,
  children: 0,
  slot: 'matin',
  audioguide: true,
  restaurant: false,
  message: '',
  terms: false,
};

export type Confirmation = { firstName: string; email: string; date: string; total: number };

export const formatPrice = (value: number) => `${value} €`;

export const formatDate = (value: string) =>
  new Date(`${value}T00:00`).toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

export function getToday() {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  return now.toISOString().slice(0, 10);
}

type Choices = Pick<FormValues, 'adults' | 'children' | 'audioguide' | 'restaurant'>;

export function getSummary(choices: Choices) {
  const adults = Math.max(1, choices.adults || 1);
  const children = Math.max(0, choices.children || 0);
  const optionsPerPerson =
    (choices.audioguide ? PRICES.audioguide : 0) + (choices.restaurant ? PRICES.restaurant : 0);
  const summary = {
    adults: adults * PRICES.adult,
    children: children * PRICES.child,
    options: optionsPerPerson * (adults + children),
  };
  return { ...summary, total: summary.adults + summary.children + summary.options };
}

type Rules = { [K in keyof FormValues]?: RegisterOptions<FormValues, K> };

export const RULES = {
  name: {
    validate: (value: string) => value.trim().length >= 2 || 'Indiquez votre nom (2 caractères minimum).',
  },
  email: {
    required: 'Indiquez votre e-mail.',
    pattern: { value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/, message: "Format d'e-mail invalide." },
  },
  date: {
    required: 'Choisissez une date de visite.',
    validate: (value: string) => value >= getToday() || "Choisissez une date à partir d'aujourd'hui.",
  },
  adults: {
    valueAsNumber: true,
    validate: (value: number) => (Number.isInteger(value) && value >= 1) || 'Indiquez au moins 1 adulte.',
  },
  children: {
    valueAsNumber: true,
    validate: (value: number) =>
      (Number.isInteger(value) && value >= 0) || "Indiquez un nombre d'enfants valide.",
  },
  terms: {
    required: 'Vous devez accepter les conditions.',
  },
} satisfies Rules;

export const ERROR_ORDER = ['name', 'email', 'date', 'adults', 'children', 'terms'] as const;
