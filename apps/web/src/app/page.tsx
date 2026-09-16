import Link from 'next/link';
import { RULES } from '@ankedu/types';
import { SITE, lienWhatsApp } from '@/lib/site';

const NIVEAUX_RACCOURCIS = [
  { libelle: 'CE1', slug: 'ce1' },
  { libelle: 'CM2', slug: 'cm2' },
  { libelle: '6e', slug: '6e' },
  { libelle: '3e', slug: '3e' },
  { libelle: '1ère D', slug: '1ere-d' },
  { libelle: 'Terminale C', slug: 'terminale-c' },
];

const ETAPES = [
  {
    titre: 'Vous décrivez le besoin',
    detail:
      'Niveau de l’élève, matières, jours, horaires, quartier. Le formulaire prend cinq minutes et ne demande rien d’inutile.',
  },
  {
    titre: 'Un conseiller vous rappelle',
    detail:
      'Nous précisons l’objectif avec vous et convenons du tarif avant toute recherche de professeur.',
  },
  {
    titre: 'Nous cherchons le bon profil',
    detail:
      'Nous croisons matière, niveau et zone d’intervention dans notre réseau, puis nous contactons le professeur.',
  },
  {
    titre: 'Les cours démarrent',
    detail:
      'La mission est officiellement attribuée. Vous recevez le nom du professeur et la date de la première séance.',
  },
];

const ENGAGEMENTS = [
  {
    titre: 'La sélection nous revient',
    detail:
      'Vous n’avez pas à comparer des profils ni à négocier avec un inconnu. Nous vérifions le parcours, la disponibilité et la zone d’intervention avant de proposer quoi que ce soit.',
  },
  {
    titre: 'Un interlocuteur unique',
    detail:
      'Un changement d’horaire, une absence, une matière à ajouter : vous nous appelez, nous nous en occupons. Vous ne gérez pas le professeur.',
  },
  {
    titre: 'Un tarif convenu à l’avance',
    detail:
      'Le prix est fixé avec vous avant le premier cours et ne bouge pas en cours de trimestre.',
  },
];

const QUESTIONS = [
  {
    question: 'Puis-je choisir moi-même le professeur ?',
    reponse:
      'Non, et c’est volontaire. C’est AnkEdu qui recherche, contacte et attribue la mission. Notre travail est précisément de vous éviter cette recherche, en nous appuyant sur ce que nous savons de chaque professeur de notre réseau.',
  },
  {
    question: 'Pourquoi des séances de deux heures ?',
    reponse:
      'En dessous, une fois l’installation faite et les devoirs revus, il ne reste plus assez de temps utile pour reprendre une notion mal comprise. Deux heures permettent d’expliquer, de faire pratiquer et de vérifier.',
  },
  {
    question: 'Combien de matières puis-je demander ?',
    reponse: `De ${RULES.MIN_SUBJECTS} à ${RULES.MAX_SUBJECTS} matières, sur ${RULES.MAX_DAYS} jours par semaine au maximum. Au-delà, le suivi se dilue et nous préférons vous proposer une autre organisation.`,
  },
  {
    question: 'Intervenez-vous dans ma commune ?',
    reponse:
      'Nous couvrons le district d’Abidjan. Indiquez votre commune et votre quartier dans le formulaire : nous vérifions la disponibilité sur votre zone dès réception de la demande.',
  },
];

export default function Accueil() {
  return (
    <>
      {/* Hero */}
      <section className="bg-encre text-papier">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
          <div className="max-w-3xl">
            <h1 className="font-[family-name:var(--font-titre-charge)] text-4xl leading-[1.08] font-normal sm:text-6xl lg:text-7xl">
              Vous décrivez le besoin.
              <br />
              Nous trouvons le professeur.
            </h1>

            <div className="mt-8 h-px w-24 bg-ocre" aria-hidden="true" />

            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-papier/75">
              AnkEdu organise l’accompagnement scolaire à domicile du primaire au lycée, à Abidjan.
              Des professeurs choisis avec attention, un suivi organisé, une approche construite
              autour de l’élève. Confiez-nous le besoin.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link
                href="/demande"
                className="rounded-douce bg-ocre px-6 py-3.5 font-medium text-encre transition-colors hover:bg-ocre-clair"
              >
                Faire une demande de cours
              </Link>
              <a
                href={lienWhatsApp(
                  'Bonjour AnkEdu, je souhaite des cours à domicile pour mon enfant.',
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-douce border border-papier/25 px-6 py-3.5 font-medium text-papier transition-colors hover:border-papier/60"
              >
                Écrire sur WhatsApp
              </a>
              <a
                href={`tel:${SITE.telephoneLien}`}
                className="px-2 py-3.5 text-papier/70 underline underline-offset-4 transition-colors hover:text-papier"
              >
                {SITE.telephone}
              </a>
            </div>
          </div>

          <div className="mt-16 border-t border-papier/15 pt-8">
            <p className="text-sm text-papier/60">Commencer par le niveau de votre enfant</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {NIVEAUX_RACCOURCIS.map((niveau) => (
                <li key={niveau.slug}>
                  <Link
                    href={`/demande?niveau=${niveau.slug}`}
                    className="inline-block rounded-douce border border-papier/20 px-4 py-2 text-sm text-papier/85 transition-colors hover:border-ocre hover:text-ocre"
                  >
                    {niveau.libelle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Fonctionnement — sequence reelle, donc numerotee */}
      <section id="fonctionnement" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20 sm:py-24">
        <h2 className="max-w-2xl text-3xl sm:text-4xl">De votre demande au premier cours</h2>
        <p className="mt-4 max-w-2xl text-encre-voile">
          Quatre étapes, dans cet ordre. Aucune ne se déclenche sans la précédente.
        </p>

        <ol className="mt-12 grid gap-px overflow-hidden rounded-carte bg-brume sm:grid-cols-2 lg:grid-cols-4">
          {ETAPES.map((etape, index) => (
            <li key={etape.titre} className="bg-papier p-7">
              <span className="font-[family-name:var(--font-titre-charge)] text-3xl text-ocre-texte">
                {index + 1}
              </span>
              <h3 className="mt-4 text-lg">{etape.titre}</h3>
              <p className="mt-2 text-sm leading-relaxed text-encre-voile">{etape.detail}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Notre role */}
      <section id="engagement" className="scroll-mt-20 bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="max-w-2xl text-3xl sm:text-4xl">
            AnkEdu reste votre interlocuteur, du premier appel au dernier cours
          </h2>
          <div className="mt-12 grid gap-10 lg:grid-cols-3">
            {ENGAGEMENTS.map((item) => (
              <div key={item.titre} className="border-t-2 border-ardoise pt-5">
                <h3 className="text-xl">{item.titre}</h3>
                <p className="mt-3 leading-relaxed text-encre-voile">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Niveaux et matieres */}
      <section id="niveaux" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <h2 className="text-3xl sm:text-4xl">Du CP1 à la terminale</h2>
            <p className="mt-4 leading-relaxed text-encre-voile">
              Nous couvrons les trois cycles et l’essentiel des matières enseignées dans les
              établissements ivoiriens. Si une matière ne figure pas ici, indiquez-la dans votre
              demande : nous chercherons.
            </p>
            <Link
              href="/demande"
              className="mt-8 inline-block rounded-douce bg-encre px-6 py-3.5 font-medium text-papier transition-colors hover:bg-encre-clair"
            >
              Faire une demande de cours
            </Link>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-semibold text-encre">Primaire</h3>
              <p className="mt-2 text-encre-voile">
                Lecture et écriture, calcul, éveil au milieu, méthodes de travail.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-encre">Collège</h3>
              <p className="mt-2 text-encre-voile">
                Mathématiques, physique-chimie, SVT, français, anglais, histoire-géographie.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-encre">Lycée</h3>
              <p className="mt-2 text-encre-voile">
                Mathématiques, physique-chimie, SVT, philosophie, économie, comptabilité, langues
                vivantes, préparation au baccalauréat.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Questions */}
      <section id="questions" className="scroll-mt-20 bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-5">
          <h2 className="text-3xl sm:text-4xl">Questions fréquentes</h2>
          <dl className="mt-10 divide-y divide-brume border-y border-brume">
            {QUESTIONS.map((item) => (
              <div key={item.question} className="py-6">
                <dt className="text-lg text-encre">{item.question}</dt>
                <dd className="mt-2 leading-relaxed text-encre-voile">{item.reponse}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Appel a l'action final */}
      <section className="mx-auto max-w-6xl px-5 pb-4">
        <div className="rounded-carte bg-ardoise-clair px-7 py-14 text-center sm:px-14">
          <h2 className="mx-auto max-w-xl text-3xl sm:text-4xl">
            Dites-nous ce dont votre enfant a besoin
          </h2>
          <p className="mx-auto mt-4 max-w-lg leading-relaxed text-encre-clair">
            Le formulaire prend cinq minutes. Un conseiller vous rappelle ensuite pour en parler.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/demande"
              className="rounded-douce bg-encre px-6 py-3.5 font-medium text-papier transition-colors hover:bg-encre-clair"
            >
              Faire une demande de cours
            </Link>
            <a
              href={`tel:${SITE.telephoneLien}`}
              className="rounded-douce border border-encre/20 px-6 py-3.5 font-medium text-encre transition-colors hover:border-encre/50"
            >
              Appeler AnkEdu
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
