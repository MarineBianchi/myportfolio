# Marine Bianchi - Portfolio

Portfolio personnel de Marine Bianchi, développeuse full stack et designer graphique : présentation, projets et contact, avec des animations au scroll (GSAP) sur l'ensemble du site.

## Stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack) + [React 19](https://react.dev) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com) pour les utilitaires, complété par des media queries manuelles dans `globals.css` pour le responsive
- [GSAP](https://gsap.com) (`@gsap/react`, ScrollTrigger) pour les animations au scroll, et [Framer Motion](https://www.framer.com/motion/) pour la transition entre pages
- [Lenis](https://lenis.darkroom.engineering) pour le smooth scroll

## Démarrer en local

```bash
npm install
npm run dev
```

Le site tourne sur [http://localhost:3000](http://localhost:3000).

## Scripts disponibles

| Commande              | Description                                                          |
| ---------------------- | ---------------------------------------------------------------------- |
| `npm run dev`          | Serveur de développement (Turbopack, hot reload)                       |
| `npm run build`        | Build de production, export statique dans `out/`                       |
| `npm run start`        | Sert le build de production en local (Node.js)                         |
| `npm run lint`         | Vérifie le code avec ESLint                                            |
| `npm run deploy:zip`   | Build + génère `site.zip` prêt à uploader sur l'hébergement             |

## Structure du projet

```
src/
  app/                  Routes (App Router) : accueil, pages projets, sitemap, robots.txt
  components/
    sections/           Sections de la page d'accueil (Hero, Works, Capabilities, ...)
    project/            Composants de la page détail d'un projet
    ui/                 Composants transverses (Navbar, Footer, curseur, smooth scroll, ...)
  data/
    projects.ts         Contenu de tous les projets (titre, catégorie, médias, description, ...)
public/
  img/, videos/         Médias du site
scripts/
  fix-og-images.mjs     Corrige les images Open Graph après l'export statique (voir plus bas)
```

Pour ajouter un projet : l'ajouter dans `src/data/projects.ts` (`featuredProjects` pour la home, `gridRows` pour la grille "Tous les projets"), avec ses médias dans `public/img/`. Sa page `/projets/<slug>` ainsi que son image Open Graph sont générées automatiquement.

## SEO

- Métadonnées (titres, descriptions, Open Graph, Twitter Card), sitemap (`src/app/sitemap.ts`) et `robots.txt` (`src/app/robots.ts`) générés automatiquement
- Une image Open Graph est générée dynamiquement pour l'accueil et pour chaque page projet (`opengraph-image.tsx`)
- Données structurées JSON-LD (`Person` sur le site, `CreativeWork` sur chaque page projet)
- Le domaine de production (`https://marinebianchi.com`) est défini en dur dans `src/app/layout.tsx`, `src/app/sitemap.ts`, `src/app/robots.ts` et `src/app/projets/[slug]/page.tsx` - à mettre à jour si le domaine change

## Déploiement (hébergement statique, ex. Hostinger)

Le site est exporté en HTML/CSS/JS statique (`output: "export"` dans `next.config.ts`) : aucun serveur Node.js n'est nécessaire côté hébergeur.

```bash
npm run deploy:zip
```

Cette commande build le site et produit `site.zip` à la racine du projet. Dans le gestionnaire de fichiers de l'hébergeur, uploader ce zip à la racine du site (ex. `public_html`) puis l'extraire sur place.
