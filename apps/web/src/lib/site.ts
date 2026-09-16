/**
 * Coordonnees et textes du site.
 *
 * Valeurs de repli uniquement : a partir de la Phase 10, ces champs seront
 * lus depuis la table Setting via l'API, de sorte que l'administrateur puisse
 * changer le numero WhatsApp sans toucher au code (sections 9 et 43).
 * Aucun composant ne doit ecrire un numero en dur : tout passe par ici.
 */
export const SITE = {
  nom: 'AnkEdu',
  slogan: "L'excellence commence par un accompagnement de qualite.",
  telephone: '+225 07 77 33 57 35',
  telephoneLien: '+2250777335735',
  whatsapp: '2250777335735',
  email: 'contact@ankedu.ci',
  ville: 'Abidjan, Côte d’Ivoire',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
} as const;

export const lienWhatsApp = (message?: string) =>
  `https://wa.me/${SITE.whatsapp}${message ? `?text=${encodeURIComponent(message)}` : ''}`;
