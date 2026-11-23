import { Link } from 'react-router';

type PageHeaderProps = {
  breadcrumb: string;
  title: string;
  subtitle: string;
};

export default function PageHeader({ breadcrumb, title, subtitle }: PageHeaderProps) {
  return (
    <section className="bg-sand dark:bg-primary-darker">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-10 md:py-14">
        <nav aria-label="Fil d'Ariane" className="text-sm text-primary-dark dark:text-sand">
          <ol className="flex gap-2">
            <li>
              <Link to="/" className="hover:underline">
                Accueil
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">{breadcrumb}</li>
          </ol>
        </nav>
        <h1 className="font-display text-4xl leading-tight font-bold md:text-5xl">{title}</h1>
        <p className="text-base text-primary-dark md:text-lg dark:text-sand">{subtitle}</p>
      </div>
    </section>
  );
}
