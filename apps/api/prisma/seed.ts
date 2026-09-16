import 'dotenv/config';
import { hash } from '@node-rs/argon2';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client.js';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const ROLES = [
  { code: 'ADMIN', label: 'Administrateur' },
  { code: 'PROFESSOR', label: 'Professeur' },
  { code: 'PARENT', label: 'Parent' },
  { code: 'SUPER_ADMIN', label: 'Super administrateur' },
  { code: 'MANAGER', label: 'Gestionnaire' },
] as const;

const SUBJECTS = [
  'Mathematiques',
  'Physique-Chimie',
  'SVT',
  'Francais',
  'Anglais',
  'Espagnol',
  'Allemand',
  'Histoire-Geographie',
  'Philosophie',
  'Economie',
  'Comptabilite',
  'Informatique',
  'Lecture et ecriture',
  'Calcul',
  'Eveil au milieu',
];

const LEVELS: Array<{ name: string; cycle: 'PRIMAIRE' | 'COLLEGE' | 'LYCEE' }> = [
  { name: 'CP1', cycle: 'PRIMAIRE' },
  { name: 'CP2', cycle: 'PRIMAIRE' },
  { name: 'CE1', cycle: 'PRIMAIRE' },
  { name: 'CE2', cycle: 'PRIMAIRE' },
  { name: 'CM1', cycle: 'PRIMAIRE' },
  { name: 'CM2', cycle: 'PRIMAIRE' },
  { name: '6e', cycle: 'COLLEGE' },
  { name: '5e', cycle: 'COLLEGE' },
  { name: '4e', cycle: 'COLLEGE' },
  { name: '3e', cycle: 'COLLEGE' },
  { name: '2nde A', cycle: 'LYCEE' },
  { name: '2nde C', cycle: 'LYCEE' },
  { name: '1ere A', cycle: 'LYCEE' },
  { name: '1ere C', cycle: 'LYCEE' },
  { name: '1ere D', cycle: 'LYCEE' },
  { name: 'Terminale A', cycle: 'LYCEE' },
  { name: 'Terminale C', cycle: 'LYCEE' },
  { name: 'Terminale D', cycle: 'LYCEE' },
];

/// Section 12 du cahier des charges.
const ZONES = [
  'Cocody',
  'Yopougon',
  'Marcory',
  'Treichville',
  'Abobo',
  'Koumassi',
  'Port-Bouet',
  'Bingerville',
  'Plateau',
  'Adjame',
  'Attecoube',
  'Anyama',
];

/// Section 9 et 26 : rien de tout cela ne doit etre code en dur dans un composant.
const SETTINGS: Array<{ key: string; value: unknown; group: string; label: string }> = [
  { key: 'contact.phone', value: '+2250700000000', group: 'contact', label: 'Telephone AnkEdu' },
  { key: 'contact.whatsapp', value: '+2250700000000', group: 'contact', label: 'WhatsApp AnkEdu' },
  { key: 'contact.email', value: 'contact@ankedu.ci', group: 'contact', label: 'Email AnkEdu' },
  { key: 'contact.address', value: 'Abidjan, Cote d Ivoire', group: 'contact', label: 'Adresse' },
  { key: 'social.facebook', value: '', group: 'social', label: 'Page Facebook' },
  { key: 'social.instagram', value: '', group: 'social', label: 'Compte Instagram' },
  { key: 'social.linkedin', value: '', group: 'social', label: 'Page LinkedIn' },
  {
    key: 'finance.default_commission_rate',
    value: 20,
    group: 'finance',
    label: 'Taux de commission par defaut (%)',
  },
  {
    key: 'site.tagline',
    value: "L'excellence commence par un accompagnement de qualite.",
    group: 'site',
    label: 'Slogan',
  },
  {
    key: 'site.hero_message',
    value:
      "AnkEdu propose un accompagnement scolaire a domicile pense autour des besoins de chaque apprenant. " +
      'Des professeurs selectionnes avec attention, un suivi organise et une approche personnalisee : ' +
      "nous placons la qualite de l'encadrement au coeur de notre engagement.",
    group: 'site',
    label: 'Message principal',
  },
];

const FAQS = [
  {
    question: 'Comment choisissez-vous le professeur de mon enfant ?',
    answer:
      "AnkEdu analyse votre demande — matieres, niveau, horaires, localisation — puis recherche dans son reseau " +
      "le professeur dont le profil correspond le mieux. Nous le contactons, verifions sa disponibilite et " +
      "lui attribuons officiellement la mission. Vous n'avez aucune selection a faire.",
    order: 1,
  },
  {
    question: 'Pourquoi les seances durent-elles 2 heures ?',
    answer:
      "Une seance de 2 heures laisse le temps de reprendre les notions mal acquises, de faire des exercices " +
      "et de verifier la comprehension. En dessous, le temps utile est trop court une fois l'installation faite.",
    order: 2,
  },
  {
    question: 'Combien de matieres puis-je demander ?',
    answer:
      'De 1 a 5 matieres par demande. Au-dela, le suivi perd en efficacite et nous preferons vous proposer ' +
      'une organisation differente.',
    order: 3,
  },
  {
    question: 'Comment se deroule la mise en place ?',
    answer:
      'Vous remplissez le formulaire de demande. Un conseiller AnkEdu vous rappelle pour preciser vos besoins ' +
      'et convenir du tarif. Nous recherchons ensuite le professeur et vous confirmons le demarrage des cours.',
    order: 4,
  },
  {
    question: 'Dans quelles communes intervenez-vous ?',
    answer:
      "Nous couvrons l'ensemble du district d'Abidjan. Indiquez votre commune et votre quartier dans le " +
      'formulaire : nous verifions immediatement la disponibilite sur votre zone.',
    order: 5,
  },
];

function slugify(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

async function main() {
  console.log('Seed AnkEdu — demarrage');

  for (const role of ROLES) {
    await prisma.role.upsert({
      where: { code: role.code },
      update: { label: role.label },
      create: { code: role.code, label: role.label },
    });
  }
  console.log(`  roles          : ${ROLES.length}`);

  for (const [index, name] of SUBJECTS.entries()) {
    const slug = slugify(name);
    await prisma.subject.upsert({
      where: { slug },
      update: { name, order: index },
      create: { name, slug, order: index },
    });
  }
  console.log(`  matieres       : ${SUBJECTS.length}`);

  for (const [index, level] of LEVELS.entries()) {
    const slug = slugify(level.name);
    await prisma.level.upsert({
      where: { slug },
      update: { name: level.name, cycle: level.cycle, order: index },
      create: { name: level.name, slug, cycle: level.cycle, order: index },
    });
  }
  console.log(`  niveaux        : ${LEVELS.length}`);

  for (const name of ZONES) {
    await prisma.zone.upsert({
      where: { name },
      update: {},
      create: { name, city: 'Abidjan' },
    });
  }
  console.log(`  zones          : ${ZONES.length}`);

  for (const setting of SETTINGS) {
    await prisma.setting.upsert({
      where: { key: setting.key },
      update: { group: setting.group, label: setting.label },
      create: {
        key: setting.key,
        value: setting.value as never,
        group: setting.group,
        label: setting.label,
      },
    });
  }
  console.log(`  parametres     : ${SETTINGS.length}`);

  const existingFaqs = await prisma.faq.count();
  if (existingFaqs === 0) {
    await prisma.faq.createMany({
      data: FAQS.map((faq) => ({ ...faq, isPublished: true })),
    });
    console.log(`  faq            : ${FAQS.length}`);
  } else {
    console.log('  faq            : deja presentes, ignorees');
  }

  const adminEmail = process.env.SEED_ADMIN_EMAIL;
  const adminPassword = process.env.SEED_ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    console.log('  admin          : ignore (SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD absents)');
  } else {
    const adminRole = await prisma.role.findUniqueOrThrow({ where: { code: 'ADMIN' } });
    const passwordHash = await hash(adminPassword);

    await prisma.user.upsert({
      where: { email: adminEmail },
      update: {},
      create: { email: adminEmail, passwordHash, roleId: adminRole.id },
    });
    console.log(`  admin          : ${adminEmail}`);
  }

  console.log('Seed AnkEdu — termine');
}

main()
  .catch((error: unknown) => {
    console.error('Seed echoue :', error);
    process.exitCode = 1;
  })
  .finally(() => {
    void prisma.$disconnect();
  });
