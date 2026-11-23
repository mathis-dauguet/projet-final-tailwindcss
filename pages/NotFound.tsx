import Button from '../components/Button';

export default function NotFound() {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-4 px-4 py-24 text-center md:py-36">
      <h1 className="font-display text-7xl font-bold text-primary md:text-9xl dark:text-secondary">404</h1>
      <p className="text-lg text-primary-dark md:text-xl dark:text-sand">Page introuvable</p>
      <Button to="/" className="mt-4">
        Retour à l'accueil
      </Button>
    </section>
  );
}
