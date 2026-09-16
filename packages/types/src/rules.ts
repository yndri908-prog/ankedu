/**
 * Contraintes metier figees par le cahier des charges AnkEdu.
 *
 * Source unique de verite : le compteur « 3 / 5 matieres » du formulaire parent
 * et la validation serveur lisent ces memes constantes. Elles ne peuvent donc
 * pas diverger.
 */
export const RULES = {
  /** Section 8, etape 2 : minimum 1 matiere. */
  MIN_SUBJECTS: 1,
  /** Section 8, etape 2 : maximum 5 matieres, bloque techniquement. */
  MAX_SUBJECTS: 5,
  /** Section 8, etape 3 : 1, 2 ou 3 jours par semaine. */
  MIN_DAYS: 1,
  MAX_DAYS: 3,
  /** Section 8, etape 4 : duree FIXE, non modifiable par le parent. */
  SESSION_DURATION_MINUTES: 120,
  /** Section 24 : taux de commission par defaut, surchargeable par marche. */
  DEFAULT_COMMISSION_RATE: 20,
  /** Section 11 : tailles et types acceptes pour les justificatifs. */
  MAX_UPLOAD_BYTES: 5 * 1024 * 1024,
  ALLOWED_UPLOAD_MIME_TYPES: [
    'application/pdf',
    'image/jpeg',
    'image/png',
  ] as const,
} as const;

/** Message impose par la section 8, etape 4. */
export const SESSION_DURATION_NOTICE =
  "Pour une meilleure comprehension et un meilleur accompagnement de l'eleve, " +
  'AnkEdu privilegie des seances de 2 heures.';

/** Message impose par la section 13. */
export const AWAITING_MARKET_NOTICE =
  "Votre profil est enregistre aupres d'AnkEdu. Lorsqu'une mission correspondant " +
  'a votre profil sera disponible et validee par AnkEdu, elle apparaitra dans votre espace.';

/**
 * Calcule l'heure de fin d'une seance. La duree n'est jamais transmise par
 * le client : elle est toujours recalculee ici.
 */
export function computeEndTime(startTime: string): string {
  const [hoursRaw, minutesRaw] = startTime.split(':');
  const hours = Number(hoursRaw);
  const minutes = Number(minutesRaw);

  if (!Number.isInteger(hours) || !Number.isInteger(minutes)) {
    throw new Error(`Heure de debut invalide : ${startTime}`);
  }

  const total = hours * 60 + minutes + RULES.SESSION_DURATION_MINUTES;
  const endHours = Math.floor(total / 60) % 24;
  const endMinutes = total % 60;

  return `${String(endHours).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}`;
}

/**
 * Repartition financiere d'un marche (section 24).
 * Invariant verifie : prix parent = commission + remuneration professeur.
 */
export function splitMarketAmount(parentPrice: number, commissionRate: number) {
  if (parentPrice < 0) throw new Error('Le prix parent ne peut pas etre negatif.');
  if (commissionRate < 0 || commissionRate > 100) {
    throw new Error('Le taux de commission doit etre compris entre 0 et 100.');
  }

  const commissionAmount = Math.round((parentPrice * commissionRate) / 100);
  const professorPay = parentPrice - commissionAmount;

  return { parentPrice, commissionRate, commissionAmount, professorPay };
}
