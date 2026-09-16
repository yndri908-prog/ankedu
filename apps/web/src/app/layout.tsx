import type { Metadata, Viewport } from 'next';
import { IBM_Plex_Sans, Newsreader } from 'next/font/google';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { SITE } from '@/lib/site';
import './globals.css';

const titre = Newsreader({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-titre-charge',
  display: 'swap',
});

const texte = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-texte-charge',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.nom} — cours à domicile à Abidjan`,
    template: `%s · ${SITE.nom}`,
  },
  description:
    'AnkEdu organise l’accompagnement scolaire à domicile du primaire au lycée à Abidjan. ' +
    'Vous décrivez le besoin, nous trouvons le professeur.',
  openGraph: {
    type: 'website',
    locale: 'fr_CI',
    siteName: SITE.nom,
    title: `${SITE.nom} — cours à domicile à Abidjan`,
    description: 'Vous décrivez le besoin, AnkEdu trouve le professeur.',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#10233f',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${titre.variable} ${texte.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:bg-encre focus:px-4 focus:py-2 focus:text-papier"
        >
          Aller au contenu
        </a>
        <SiteHeader />
        <main id="contenu" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
