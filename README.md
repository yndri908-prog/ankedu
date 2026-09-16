# AnkEdu

Plateforme d’organisation de cours à domicile — primaire, collège, lycée. Abidjan, Côte d’Ivoire.

> AnkEdu est l’intermédiaire : le parent décrit son besoin, AnkEdu recherche et attribue le
> professeur. Le parent ne choisit jamais directement son professeur.

## Ce qui est en place

| Phase | État |
|---|---|
| 1 — Socle technique | fait |
| 2 — Modèle de données | fait (schéma + seed ; migration à générer en local) |
| 3 — Authentification et rôles | à faire |
| 4 — Design system et site public | accueil livrée, reste à faire |
| 5 à 14 | à faire |

## Structure

```
ankedu/
├── apps/
│   ├── api/                  NestJS 12 (ESM) — API REST, Prisma 7, PostgreSQL
│   │   ├── prisma/
│   │   │   ├── schema.prisma     27 modèles
│   │   │   └── seed.ts           rôles, matières, niveaux, zones, paramètres, admin
│   │   ├── prisma.config.ts      configuration Prisma 7 (URL hors du schéma)
│   │   └── src/
│   │       ├── config/           validation des variables d’environnement
│   │       ├── health/           GET /api/health
│   │       └── prisma/           PrismaService avec driver adapter
│   └── web/                  Next.js 16 — site public, BFF, espaces pro et admin
│       └── src/
│           ├── app/
│           │   ├── api/bff/      proxy vers l’API (décision D1)
│           │   ├── layout.tsx
│           │   ├── page.tsx      accueil
│           │   └── globals.css   design tokens AnkEdu
│           ├── components/layout/
│           └── lib/site.ts       coordonnées centralisées
├── packages/
│   ├── tsconfig/             configuration TypeScript partagée
│   └── types/                énumérations et règles métier partagées
├── docker-compose.yml        PostgreSQL 17 sur le port hôte 5433
└── turbo.json
```

## Démarrage

Prérequis : Node 22 ou plus récent, Docker, Git.

```bash
corepack enable
pnpm install

# Variables d'environnement
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env.local

# Générer les deux secrets JWT et les coller dans apps/api/.env
openssl rand -base64 48
openssl rand -base64 48

# Base de données
pnpm db:up
docker compose ps        # attendre "healthy"

# Schéma et données de référence
pnpm db:generate
pnpm db:migrate          # nommer la migration : init
pnpm db:seed

# Lancer le tout
pnpm dev
```

| Adresse | Contenu |
|---|---|
| http://localhost:3000 | site public |
| http://localhost:4000/api/health | état de l’API et de la base |
| http://localhost:3000/api/bff/health | même réponse, via le BFF |

La troisième adresse est la vérification qui compte : elle prouve que le navigateur atteint
l’API sans jamais la connaître directement.

## Scripts

| Commande | Effet |
|---|---|
| `pnpm dev` | site + API en watch |
| `pnpm build` | compilation complète |
| `pnpm typecheck` | vérification TypeScript sur tout le dépôt |
| `pnpm db:up` / `db:down` | conteneur PostgreSQL |
| `pnpm db:reset` | **supprime le volume** et repart d’une base vide |
| `pnpm db:migrate` | crée et applique une migration |
| `pnpm db:seed` | référentiels et compte admin |
| `pnpm db:studio` | explorateur Prisma |

## Règles à ne pas contourner

1. **Attribuer ≠ publier.** Deux actions distinctes. Un marché `ASSIGNED` reste invisible
   du professeur ; seul `PUBLISHED` le fait apparaître.
2. **La visibilité est appliquée côté serveur.** Un champ non autorisé par `MarketVisibility`
   est absent de la réponse JSON — jamais masqué en CSS ni filtré en React.
3. **Les zones d’intervention ne sont pas publiques.** Elles servent uniquement à la recherche
   par l’administrateur.
4. **Aucune coordonnée en dur.** Téléphone, WhatsApp, réseaux sociaux : table `Setting`.
5. **Les limites métier sont dans `@ankedu/types`.** 5 matières, 3 jours, 2 heures : une seule
   source, lue par le formulaire et par la validation serveur.

## Sécurité

- `apps/api/.env` et `apps/web/.env.local` ne sont jamais versionnés.
- Les secrets livrés dans cette archive sont des secrets de développement local.
  **Régénérez-les avant tout déploiement.**
- Les justificatifs des professeurs iront dans un bucket privé, accessibles uniquement par
  URL signée générée pour un administrateur authentifié.
