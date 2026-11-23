import lion from '../assets/home/lion.png';
import panda from '../assets/home/panda.png';
import penguin from '../assets/home/penguin.png';
import giraffe from '../assets/animals/giraffe.jpg';
import rhino from '../assets/animals/rhino.jpg';
import redPanda from '../assets/animals/red-panda.jpg';
import seaLion from '../assets/animals/sea-lion.jpg';
import orangutan from '../assets/animals/orangutan.jpg';
import lemur from '../assets/animals/lemur.jpg';

export type Status = 'Préoccupation mineure' | 'Vulnérable' | 'En danger' | 'En danger critique';

export type Habitat = 'Savane' | 'Montagne' | 'Côtes & océans' | 'Forêt tropicale';

export type Animal = {
  name: string;
  description: string;
  status: Status;
  habitat: Habitat;
  schedule: string;
  image: string;
};

export const habitats: Habitat[] = ['Savane', 'Montagne', 'Côtes & océans', 'Forêt tropicale'];

export const animals: Animal[] = [
  {
    name: "Lion d'Afrique",
    description: 'Roi de la savane, il vit en groupes familiaux appelés troupes.',
    status: 'Vulnérable',
    habitat: 'Savane',
    schedule: 'Nourrissage à 15h',
    image: lion,
  },
  {
    name: 'Panda géant',
    description: "Il passe jusqu'à 12 heures par jour à manger du bambou.",
    status: 'Vulnérable',
    habitat: 'Montagne',
    schedule: 'Repas à 10h30',
    image: panda,
  },
  {
    name: 'Manchot de Humboldt',
    description: 'Excellent nageur, il vit sur les côtes rocheuses du Pérou et du Chili.',
    status: 'Vulnérable',
    habitat: 'Côtes & océans',
    schedule: 'Nourrissage à 16h',
    image: penguin,
  },
  {
    name: 'Girafe réticulée',
    description: 'Le plus grand animal terrestre, reconnaissable à son pelage en mosaïque.',
    status: 'En danger',
    habitat: 'Savane',
    schedule: 'Rencontre à 11h',
    image: giraffe,
  },
  {
    name: 'Rhinocéros noir',
    description: 'Solitaire et discret, il est au cœur de notre programme de conservation.',
    status: 'En danger critique',
    habitat: 'Savane',
    schedule: 'Présentation à 14h',
    image: rhino,
  },
  {
    name: 'Panda roux',
    description: 'Agile grimpeur, il passe la majeure partie de sa vie dans les arbres.',
    status: 'En danger',
    habitat: 'Montagne',
    schedule: 'Goûter à 16h30',
    image: redPanda,
  },
  {
    name: 'Otarie de Californie',
    description: 'Joueuse et curieuse, elle communique par de puissants aboiements.',
    status: 'Préoccupation mineure',
    habitat: 'Côtes & océans',
    schedule: 'Spectacle à 12h',
    image: seaLion,
  },
  {
    name: 'Orang-outan de Bornéo',
    description: 'Grand singe roux à l’intelligence remarquable, menacé par la déforestation.',
    status: 'En danger critique',
    habitat: 'Forêt tropicale',
    schedule: 'Enrichissement à 13h30',
    image: orangutan,
  },
  {
    name: 'Lémurien catta',
    description: 'Originaire de Madagascar, il se reconnaît à sa longue queue annelée.',
    status: 'En danger',
    habitat: 'Forêt tropicale',
    schedule: 'Nourrissage à 10h',
    image: lemur,
  },
];
