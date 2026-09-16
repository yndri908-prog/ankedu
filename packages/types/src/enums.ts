/**
 * Enumerations partagees entre le site, l'API et les futures applications
 * mobiles. Elles doivent rester strictement alignees sur schema.prisma.
 */

export const USER_ROLE = ['ADMIN', 'PROFESSOR', 'PARENT', 'SUPER_ADMIN', 'MANAGER'] as const;
export type UserRole = (typeof USER_ROLE)[number];

export const PROFESSOR_STATUS = ['PENDING_REVIEW', 'ACTIVE', 'SUSPENDED'] as const;
export type ProfessorStatus = (typeof PROFESSOR_STATUS)[number];

export const CYCLE = ['PRIMAIRE', 'COLLEGE', 'LYCEE'] as const;
export type Cycle = (typeof CYCLE)[number];

/** Section 15 : cycle de vie d'une demande de cours. */
export const COURSE_REQUEST_STATUS = [
  'NEW',
  'CONTACTED',
  'NEGOTIATING',
  'PRICE_AGREED',
  'SEARCHING_PROFESSOR',
  'PROFESSOR_CONTACTED',
  'CONVERTED',
  'CANCELLED',
] as const;
export type CourseRequestStatus = (typeof COURSE_REQUEST_STATUS)[number];

/**
 * Sections 15 et 16 : cycle de vie d'un marche.
 * ASSIGNED et PUBLISHED sont deux etats distincts. Un marche ASSIGNED reste
 * invisible du professeur.
 */
export const MARKET_STATUS = [
  'DRAFT',
  'ASSIGNED',
  'PUBLISHED',
  'IN_PROGRESS',
  'COMPLETED',
  'CANCELLED',
] as const;
export type MarketStatus = (typeof MARKET_STATUS)[number];

/** Transitions autorisees. Toute autre transition est rejetee par l'API. */
export const MARKET_TRANSITIONS: Record<MarketStatus, readonly MarketStatus[]> = {
  DRAFT: ['ASSIGNED', 'CANCELLED'],
  ASSIGNED: ['PUBLISHED', 'DRAFT', 'CANCELLED'],
  PUBLISHED: ['IN_PROGRESS', 'CANCELLED'],
  IN_PROGRESS: ['COMPLETED', 'CANCELLED'],
  COMPLETED: [],
  CANCELLED: [],
} as const;

/** Etats a partir desquels le marche apparait dans l'espace professeur. */
export const MARKET_STATUSES_VISIBLE_TO_PROFESSOR = [
  'PUBLISHED',
  'IN_PROGRESS',
  'COMPLETED',
] as const satisfies readonly MarketStatus[];

export function canTransitionMarket(from: MarketStatus, to: MarketStatus): boolean {
  return MARKET_TRANSITIONS[from].includes(to);
}

export function isVisibleToProfessor(status: MarketStatus): boolean {
  return (MARKET_STATUSES_VISIBLE_TO_PROFESSOR as readonly MarketStatus[]).includes(status);
}

export const DOCUMENT_TYPE = ['CV', 'DIPLOMA', 'ID', 'OTHER'] as const;
export type DocumentType = (typeof DOCUMENT_TYPE)[number];

export const PAYMENT_DIRECTION = ['PARENT_IN', 'PROFESSOR_OUT'] as const;
export type PaymentDirection = (typeof PAYMENT_DIRECTION)[number];

export const PAYMENT_STATUS = ['PENDING', 'PARTIAL', 'PAID', 'CANCELLED'] as const;
export type PaymentStatus = (typeof PAYMENT_STATUS)[number];

export const COMMISSION_SOURCE = ['DEFAULT', 'OVERRIDE'] as const;
export type CommissionSource = (typeof COMMISSION_SOURCE)[number];

export const VIDEO_PROVIDER = ['URL', 'FILE'] as const;
export type VideoProvider = (typeof VIDEO_PROVIDER)[number];

export const DAY_OF_WEEK = [
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
  'SUNDAY',
] as const;
export type DayOfWeek = (typeof DAY_OF_WEEK)[number];

export const DAY_LABELS: Record<DayOfWeek, string> = {
  MONDAY: 'Lundi',
  TUESDAY: 'Mardi',
  WEDNESDAY: 'Mercredi',
  THURSDAY: 'Jeudi',
  FRIDAY: 'Vendredi',
  SATURDAY: 'Samedi',
  SUNDAY: 'Dimanche',
};

export const NOTIFICATION_TYPE = [
  'PROFILE_REGISTERED',
  'AWAITING_MARKET',
  'MARKET_ASSIGNED',
  'NEW_REQUEST',
  'NEW_PROFESSOR',
] as const;
export type NotificationType = (typeof NOTIFICATION_TYPE)[number];
