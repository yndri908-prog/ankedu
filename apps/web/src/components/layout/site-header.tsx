import Image from 'next/image';
import Link from 'next/link';
import { SITE, lienWhatsApp } from '@/lib/site';

const NAVIGATION = [
  { href: '/#fonctionnement', libelle: 'Fonctionnement' },
  { href: '/#niveaux', libelle: 'Niveaux et matières' },
  { href: '/#engagement', libelle: 'Notre rôle' },
  { href: '/#questions', libelle: 'Questions' },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-brume/80 bg-papier/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-4">
        <Link href="/" className="flex items-center gap-2.5" aria-label="AnkEdu — accueil">
          <Image
            src="/brand/logo-ankedu.png"
            alt="AnkEdu"
            width={720}
            height={266}
            priority
            className="h-9 w-auto sm:h-10"
          />
          <span className="hidden self-end pb-0.5 text-xs text-encre-voile sm:inline">
            Abidjan
          </span>
        </Link>

        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-7 text-sm text-encre-clair">
            {NAVIGATION.map((lien) => (
              <li key={lien.href}>
                <Link href={lien.href} className="transition-colors hover:text-ocre-texte">
                  {lien.libelle}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={lienWhatsApp("Bonjour AnkEdu, je souhaite des cours à domicile pour mon enfant.")}
            className="hidden rounded-douce border border-encre/15 px-3.5 py-2 text-sm text-encre-clair transition-colors hover:border-encre/35 sm:inline-block"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp
          </a>
          <a
            href={`tel:${SITE.telephoneLien}`}
            className="hidden rounded-douce border border-encre/15 px-3.5 py-2 text-sm text-encre-clair transition-colors hover:border-encre/35 sm:inline-block"
          >
            Appeler
          </a>
          <Link
            href="/demande"
            className="rounded-douce bg-encre px-4 py-2 text-sm font-medium text-papier transition-colors hover:bg-encre-clair"
          >
            Faire une demande
          </Link>
        </div>
      </div>
    </header>
  );
}
