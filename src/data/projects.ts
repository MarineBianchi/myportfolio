export type MediaItem = { type: "video" | "image"; src: string };

export type Project = {
  id: string;
  slug: string;
  title: string;
  category: string;
  year: string;
  image?: string;
  images?: string[];
  video?: string;
  // Video width / height when it isn't 16:9 - the home page panel widens
  // (same height) to fit it instead of cropping the sides.
  videoAspect?: number;
  // Height cap for videos on the project page (default 70svh) - raise it
  // for square/portrait videos that read too small at the default.
  detailVideoMaxHeight?: string;
  // Home page panel backdrop behind the video. Falls back to the shared
  // brand texture when absent; `blurBackdrop` softens it into ambiance.
  backdrop?: string;
  blurBackdrop?: boolean;
  // Explicit gallery order - set this when a project's video doesn't belong
  // first (e.g. it sits between two photos in the numbered files). When
  // absent, the gallery falls back to video-first, then `image` + `images`.
  media?: MediaItem[];
  tint: string;
  tagline: string;
  // Exhaustive list of what was made - shown under the title on the
  // project page. Descriptive sentences belong in `description` only.
  deliverables?: string[];
  // Technologies used - shown on its own line under the deliverables.
  stack?: string[];
  description: string;
  // Document shown at the very bottom of the project page (e.g. a
  // brand guidelines PDF), embedded with a link to open it full screen.
  pdf?: { src: string; label: string };
  comingSoon?: boolean;
  // Live site, shown with a link icon under the deliverables list.
  url?: string;
};

export type GalleryItem = {
  id: string;
  title: string;
  image: string;
  // Crop anchor in the 3:2 mobile card (CSS object-position) - for wide
  // images whose main subject isn't centered.
  mobilePosition?: string;
};

// Selected work - sticky video panels on the home page (Projects.tsx)
export const featuredProjects: Project[] = [
  {
    id: "01",
    slug: "domoun",
    title: "DOMOUN",
    category: "Conseil RH",
    year: "2026",
    image: "/img/DOMOUN-01.webp",
    images: [
      "/img/DOMOUN-02png.webp",
      "/img/DOMOUN-03.webp",
      "/img/DOMOUN-04.webp",
    ],
    video: "/videos/DOMOUN.mp4",
    videoAspect: 1368 / 672,
    backdrop: "/img/domoun-fond.webp",
    url: "https://www.domoun.fr/",
    tint: "rgba(80,80,80,0.4)",
    tagline: "Un site et un média sur mesure pour une entreprise réunionnaise de conseil et formation en RH, tournée vers l'emploi local.",
    deliverables: [
      "Design du site",
      "Développement Webflow",
      "Blog / média (CMS)",
      "Animations (GSAP)",
      "Responsive",
      "SEO",
    ],
    description:
      "Conception et développement du site sur Webflow : animations au scroll, illustrations dans la charte de marque, et un espace média géré via le CMS pour que la fondatrice publie ses contenus en autonomie.",
    comingSoon: false,
  },
  {
    id: "02",
    slug: "apihive",
    title: "APIHIVE",
    category: "Développement Web",
    year: "2025",
    image: "/img/Apihive-01.webp",
    images: [
      "/img/Apihive-02.webp",
      "/img/Apihive-03.webp",
      "/img/Apihive-04.webp",
      "/img/Apihive-05.webp",
    ],
    video: "/videos/APIHIVE.mp4",
    videoAspect: 2048 / 1080,
    backdrop: "/img/apihive-fond.webp",
    url: "http://apihive.fr/",
    tint: "rgba(40,70,100,0.35)",
    tagline: "Un site e-commerce et un dashboard pour rendre lisible, d'un coup d'œil, la vie d'une ruche connectée.",
    deliverables: [
      "Dashboard de suivi des ruches connectées",
      "Site e-commerce",
    ],
    stack: [
      "React",
      "Tremor",
      "Tailwind CSS",
      "Stripe",
      "Node.js / Express",
      "Swagger",
      "Postman",
      "Docker",
    ],
    description:
      "Un dashboard interactif pour suivre les données des ruches connectées en temps réel.",
  },
  {
    id: "03",
    slug: "e-d",
    title: "Eau et développement",
    category: "Social",
    year: "2023",
    image: "/img/E&D_mockup-01.webp",
    images: ["/img/E&D_site-02.webp"],
    video: "/videos/E&D-video.mp4",
    detailVideoMaxHeight: "88svh",
    backdrop: "/img/E&D-fond.webp",
    url: "https://eauetdeveloppement.org/",
    tint: "rgba(60,110,160,0.35)",
    tagline: "Un site vitrine pour l'accès à l'eau au Togo.",
    deliverables: [
      "Site vitrine",
      "Développement WordPress",
    ],
    description:
      "Site vitrine réalisé pour une association engagée pour l'accès à l'eau au Togo.",
  },
];

// Tous les projets - mosaïque asymétrique (GridProjects.tsx), ordre fixé
export const gridRows: Project[] = [
  {
    id: "01",
    slug: "maje-avocat",
    title: "MAJE AVOCATE",
    category: "Justice",
    year: "2024",
    image: "/img/Maje-avocate-01.webp",
    video: "/img/Maje-avocate-02.mp4",
    media: [
      { type: "image", src: "/img/Maje-avocate-01.webp" },
      { type: "video", src: "/img/Maje-avocate-02.mp4" },
      { type: "image", src: "/img/Maje-avocate-03.webp" },
    ],
    tint: "rgba(50,50,70,0.4)",
    tagline: "Une identité pensée pour incarner la rigueur et la proximité d'une avocate.",
    deliverables: [
      "Branding",
      "Identité visuelle",
      "Logo",
      "Charte graphique",
    ],
    description:
      "Création de l'identité visuelle de Maje Avocate, un branding pensé pour refléter à la fois la rigueur juridique et la proximité humaine de son activité.",
  },
  {
    id: "02",
    slug: "urban-keratin",
    title: "Urban Keratin",
    category: "Cosmétique",
    year: "2023",
    image: "/img/Urban-Keratin-01.webp",
    images: [
      "/img/Urban-Keratin-02.webp",
      "/img/Urban-Keratin-03jpg.webp",
      "/img/Urban-Keratin-04.webp",
    ],
    tint: "rgba(200,150,170,0.35)",
    tagline: "Lancement d'une gamme de produits cosmétiques auprès du grand public.",
    deliverables: [
      "Étude de marché",
      "Plateforme de marque",
      "Stratégie marketing",
      "Conception et lancement de produits",
      "Conseil en branding",
      "Proposition de packagings",
    ],
    description:
      "Urban Keratin voulait ouvrir au grand public des soins jusque-là réservés aux professionnels. Étude de marché, plateforme de marque et stratégie marketing ont posé les bases du lancement, jusqu'aux premières pistes de packaging.",
  },
  {
    id: "03",
    slug: "lea-losteo",
    title: "Léa l'Ostéo",
    category: "Santé",
    year: "2024",
    image: "/img/LeaLosteo-01.webp",
    images: [
      "/img/LeaLosteo-02.webp",
      "/img/LeaLosteo-03.webp",
      "/img/LeaLosteo-04.webp",
      "/img/LeaLosteo-06.webp",
      "/img/LeaLosteo-07.webp",
    ],
    tint: "rgba(90,150,140,0.35)",
    tagline: "Une identité apaisante, du site aux murs du cabinet.",
    deliverables: [
      "Branding",
      "Logo",
      "Identité visuelle",
      "Site vitrine (Tailwind CSS)",
    ],
    description:
      "La palette reprend les couleurs du cabinet pour que le site et le lieu se répondent : le patient retrouve sur place l'univers découvert en ligne, jusqu'au logo posé sur la porte d'entrée.",
    pdf: { src: "/img/LeaLosteo-05.pdf", label: "Charte graphique" },
    url: "https://www.lealosteo.com/",
  },
  {
    id: "04",
    slug: "mountains-updates",
    title: "Mountain update",
    category: "Sport",
    year: "2023",
    image: "/img/mountains-updates-01.webp",
    images: [
      "/img/mountains-updates-02.webp",
      "/img/mountains-updates-03.webp",
      "/img/mountains-updates-04.webp",
      "/img/mountains-updates-05.webp",
      "/img/mountains-updates-06.webp",
    ],
    tint: "rgba(70,90,110,0.4)",
    tagline: "Un logo et des illustrations pour parler de la haute montagne.",
    deliverables: [
      "Logo",
      "Illustrations",
    ],
    description:
      "Création graphique du logo et d'illustrations pour Mountains Updates, média dédié à l'alpinisme.",
  },
  {
    id: "05",
    slug: "drawtattoo",
    title: "DrawTattoo",
    category: "Art",
    year: "2022",
    image: "/img/DrawTatoo-01.webp",
    images: ["/img/DrawTatoo-02.webp", "/img/DrawTatoo-03.webp"],
    tint: "rgba(30,30,50,0.4)",
    tagline: "Une identité street pour un salon de tatouage inclusif.",
    deliverables: [
      "Refonte de l'identité visuelle",
      "Affiches",
      "Plaquette commerciale",
      "Visuels réseaux sociaux",
    ],
    description:
      "Identité de marque pour un salon de tatouage street et inclusif : logotype et système graphique inspirés du tag urbain, pensés pour rester lisibles aussi bien sur peau que sur papier.",
  },
  {
    id: "06",
    slug: "taco-loco",
    title: "Taco Loco",
    category: "Food",
    year: "2022",
    image: "/img/taco-loco-01.webp",
    images: [
      "/img/taco_loco_02.webp",
      "/img/taco-loco-03.webp",
      "/img/taco-loco-04.webp",
      "/img/taco-loco-05.webp",
      "/img/taco-loco-07.webp",
      "/img/taco-loco-08.webp",
    ],
    tint: "rgba(180,80,60,0.35)",
    tagline: "Un univers pop et gourmand pour de la street food créole.",
    deliverables: [
      "Univers de marque",
      "Illustrations (Frida Kahlo)",
      "Étiquettes produits pour la livraison",
      "Flyer",
      "Dossier de presse",
      "Visuels réseaux sociaux",
    ],
    description:
      "Création d'une identité visuelle gourmande et pop pour ce concept de street food Créole : palette de couleurs vives et déclinaisons print pour le point de vente.",
  },
  {
    id: "07",
    slug: "jardins-de-nini",
    title: "Les Jardins de Nini",
    category: "Agriculture responsable",
    year: "2023",
    image: "/img/jardin-de-nini-01.webp",
    images: ["/img/jardin-de-nini-02.webp", "/img/jardin-de-nini-03.webp"],
    url: "https://lesjardinsdenini.com/",
    tint: "rgba(60,100,160,0.35)",
    tagline: "Une identité visuelle et une boutique en ligne qui accompagnent la vente de produits locaux.",
    deliverables: [
      "Identité visuelle",
      "Maquettes du site e-commerce",
      "Intégration WordPress",
      "Paramétrage WooCommerce",
    ],
    description:
      "Intégration d'un site e-commerce : parcours utilisateur clair, palette végétale et mise en page pensée pour mettre les produits en valeur.",
  },
  {
    id: "08",
    slug: "alo",
    title: "ALO",
    category: "Agence",
    year: "2023",
    image: "/img/ALO-01.webp",
    images: ["/img/ALO-02.webp", "/img/ALO-03.webp", "/img/ALO-04.webp"],
    tint: "rgba(120,110,90,0.4)",
    tagline: "Une identité commune pour un collectif de freelances.",
    deliverables: [
      "Logo",
      "Identité visuelle",
      "Charte graphique",
      "Flyer",
      "Plaquette commerciale",
    ],
    description:
      "Identité de marque sur mesure pour ALO, agence de communication : logo, charte graphique et déclinaisons d'outils de communication.",
  },
  {
    id: "09",
    slug: "illustrations-personnelles",
    title: "Illustrations personnelles",
    category: "Illustration",
    year: "2023",
    image: "/img/illustration-personnelles-01.webp",
    images: ["/img/illustration-personnelles-02.webp", "/img/illustration-personnelles-03.webp"],
    tint: "rgba(110,90,140,0.35)",
    tagline: "Dessiner pour soi, sans brief ni client.",
    deliverables: [
      "Illustrations numériques réalisées sur Illustrator et Procreate sur Ipad",
    ],
    description:
      "Un terrain d'expérimentation autour de la couleur et de la composition : des pistes testées librement, qui nourrissent ensuite le travail de commande.",
  },
];

// Autres projets - galerie horizontale non-cliquable (OtherProjects.tsx)
export const otherProjects: GalleryItem[] = [
   {
    id: "01",
    title: "Agathe Rastoul",
    image: "/img/projects/agathe-rastoul.webp",
  },
  {
    id: "02",
    title: "Arborescence Avocats",
    image: "/img/projects/Arborescence-avocats.webp",
    mobilePosition: "left center",
  },

    {
    id: "03",
    title: "Adhoc",
    image: "/img/projects/adhoc.webp",
  },
    {
    id: "04",
    title: "Socialter",
    image: "/img/projects/socialter.webp",
  },
    {
    id: "05",
    title: "Utopia56",
    image: "/img/projects/Utopia56.webp",
  },


 

];

// All routable projects, in display order - used for the project detail route
export const allProjects: Project[] = [...featuredProjects, ...gridRows];

export function getProjectBySlug(slug: string): Project | undefined {
  return allProjects.find((p) => p.slug === slug);
}
