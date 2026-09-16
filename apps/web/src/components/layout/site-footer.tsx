import Link from 'next/link';
import { SITE, lienWhatsApp } from '@/lib/site';

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-brume bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <p className="font-[family-name:var(--font-titre-charge)] text-2xl font-semibold text-encre">
            AnkEdu
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-encre-voile">{SITE.slogan}</p>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-encre">Nous joindre</h2>
          <ul className="mt-4 space-y-2 text-sm text-encre-voile">
            <li>
              <a href={`tel:${SITE.telephoneLien}`} className="hover:text-ocre">
                {SITE.telephone}
              </a>
            </li>
            <li>
              <a
                href={lienWhatsApp()}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-ocre"
              >
                WhatsApp
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} className="hover:text-ocre">
                {SITE.email}
              </a>
            </li>
            <li>{SITE.ville}</li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-encre">Le service</h2>
          <ul className="mt-4 space-y-2 text-sm text-encre-voile">
            <li>
              <Link href="/demande" className="hover:text-ocre">
                Faire une demande de cours
              </Link>
            </li>
            <li>
              <Link href="/#fonctionnement" className="hover:text-ocre">
                Comment ça se passe
              </Link>
            </li>
            <li>
              <Link href="/#niveaux" className="hover:text-ocre">
                Niveaux et matières
              </Link>
            </li>
            <li>
              <Link href="/connexion" className="hover:text-ocre">
                Espace professeur
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-encre">Informations</h2>
          <ul className="mt-4 space-y-2 text-sm text-encre-voile">
            <li>
              <Link href="/confidentialite" className="hover:text-ocre">
                Politique de confidentialité
              </Link>
            </li>
            <li>
              <Link href="/mentions-legales" className="hover:text-ocre">
                Mentions légales
              </Link>
            </li>
            <li>
              <Link href="/cgu" className="hover:text-ocre">
                Conditions d’utilisation
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-brume">
        <p className="mx-auto max-w-6xl px-5 py-6 text-xs text-encre-voile">
          © {new Date().getFullYear()} AnkEdu. Accompagnement scolaire à domicile, Abidjan.
        </p>
      </div>
    </footer>
  );
}
