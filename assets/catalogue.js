/* =========================================================
   CATALOGUE — source unique du site.
   Après modification : `node scripts/build.cjs` régénère les pages.
   Prix, délais et conditions : valeurs provisoires à confirmer.
   ========================================================= */
const CATALOGUE = {
  marque: "Latitude",
  config: {
    devise: "EUR",
    livraisonOfferteDes: 80,      // € — seuil de livraison offerte
    fraisLivraison: 6.9,          // € — sous le seuil
    checkoutUrl: "",              // lien Stripe / Shopify quand la boutique ouvre ; vide = mode précommande
    formEndpoint: "",             // ex. https://formspree.io/f/XXXX ; vide = formulaires simulés
  },
  formats: {
    "200": { label: "Bougie 200 g", detail: "env. 45 h", prix: 58 },
    "70": { label: "Mini 70 g", detail: "env. 15 h", prix: 24 },
  },
  coffret: {
    id: "coffret-atlas", nom: "Coffret Atlas", prix: 119,
    detail: "Les six lieux · 6 × 70 g",
  },
  lieux: [
    {
      id: "fregeneuil", nom: "FRÉGENEUIL", titre: "Frégeneuil", region: "Angoulême, Charente",
      moment: "Matin", heure: "7 h", couleur: "#8FA89A", lot: "004",
      coords: "45°38′N · 0°10′E", note: "Coordonnées approximatives",
      phrase: "La brume sur la Charente, avant tout le monde.",
      accroche: "Herbe des berges, saule, iris. Une bougie fraîche et verte pour les premières heures.",
      histoire: [
        "Au bord de la Charente, à Angoulême, le parc de Frégeneuil s’étire entre l’eau et les grands arbres. Un logis ancien, des saules, des prairies au ras de la rivière.",
        "Le matin, la brume reste accrochée à l’eau. L’herbe est mouillée, les iris s’ouvrent sur la berge. Plus loin, les chais du pays de Cognac laissent dans l’air une note boisée.",
        "Nous avons voulu garder cette heure où personne n’est encore levé. Une bougie fraîche, verte, pour commencer la journée en douceur.",
      ],
      tete: "Herbe coupée, menthe", coeur: "Iris, saule", fond: "Chêne de fût, accord cognac",
      matiere: "Bois flotté, eau de la Charente",
    },
    {
      id: "anafi", nom: "ANAFI", titre: "Anafi", region: "Cyclades, Grèce",
      moment: "Midi", heure: "12 h", couleur: "#2F5D8A", lot: "001",
      coords: "36°21′N · 25°46′E",
      phrase: "Le blanc des murs, le bleu partout ailleurs.",
      accroche: "Sel marin, figuier, thym sauvage. La lumière de midi sur une île des Cyclades.",
      histoire: [
        "Anafi est l’île où le ferry s’arrête en dernier. Après Santorin, la mer s’élargit et l’on voit apparaître un rocher posé sur l’eau.",
        "Le village tient sur une crête. Des maisons passées à la chaux, des portes bleues, des ruelles où l’on croise plus de chats que de voitures. À midi, tout se tait. La pierre chauffe, le thym sauvage libère son odeur, le vent apporte le sel.",
        "Nous avons voulu enfermer cette heure-là. La lumière qui efface les ombres, la fraîcheur d’un figuier contre un mur blanc, et le bleu, partout ailleurs.",
      ],
      tete: "Sel marin, bergamote", coeur: "Feuille de figuier, thym sauvage", fond: "Pierre chaude, musc blanc",
      matiere: "Pierre blanche, lumière de midi",
    },
    {
      id: "moux", nom: "MOUX", titre: "Moux", region: "Corbières, Aude",
      moment: "Fin d’après-midi", heure: "17 h", couleur: "#6B6B3A", lot: "003",
      coords: "43°10′53″N · 2°39′08″E",
      phrase: "La garrigue a gardé la chaleur.",
      accroche: "Ciste, olivier, cyprès. La garrigue des Corbières quand la lumière devient dorée.",
      histoire: [
        "Moux est un village des Corbières, dans l’Aude, au pied de la montagne d’Alaric. Autour, des vignes à perte de vue, des oliviers, des cyprès plantés en bord de chemin.",
        "En fin d’après-midi, la garrigue rend la chaleur accumulée dans la journée. Le ciste colle aux doigts, le romarin parfume les talus, la terre sent la pierre sèche.",
        "C’est le parfum des retours de promenade, quand la lumière devient dorée et que l’on se dit qu’on restera bien un jour de plus.",
      ],
      tete: "Ciste, romarin", coeur: "Feuille de vigne, olivier", fond: "Cyprès, cèdre",
      matiere: "Schiste et feuille de vigne",
    },
    {
      id: "saarah", nom: "SAARAH", titre: "Saarah", region: "Le désert, au crépuscule",
      moment: "Crépuscule", heure: "20 h", couleur: "#C98B4E", lot: "002",
      coords: "Coordonnées à venir", note: "Lieu à préciser",
      phrase: "L’heure où la dune devient rose.",
      accroche: "Cardamome, ambre, santal. La chaleur du sable quand le soleil disparaît.",
      histoire: [
        "Saarah, c’est une heure plus qu’un lieu. Le moment où le soleil touche l’horizon et où le sable passe de l’or au rose.",
        "La chaleur remonte de la dune, l’air se charge d’épices. Un thé à la cardamome chauffe quelque part. On attend la nuit sans rien dire.",
        "Une bougie ambrée et enveloppante, pour les soirs où l’on a besoin de chaleur.",
      ],
      tete: "Cardamome, datte", coeur: "Encens, rose sèche", fond: "Ambre, santal",
      matiere: "Sable fin, lumière rasante",
    },
    {
      id: "paris", nom: "PARIS", titre: "Paris", region: "Un dimanche d’hiver",
      moment: "Soirée d’hiver", heure: "21 h", couleur: "#5E6166", lot: "005",
      coords: "48°51′N · 2°21′E",
      phrase: "Un dimanche de novembre, la lumière aux fenêtres.",
      accroche: "Iris poudré, thé noir, parquet ciré. Un appartement haussmannien quand il fait froid dehors.",
      histoire: [
        "Un appartement haussmannien, un dimanche de novembre. Des moulures au plafond, un parquet en point de Hongrie, de grandes fenêtres sur les toits en zinc.",
        "Dehors, il fait gris et froid. Dedans, le thé noir infuse, un bouquet de roses commence à faner sur la cheminée, un livre est resté ouvert.",
        "Paris est la bougie des intérieurs. Poudrée, boisée, rassurante. Celle qu’on allume quand on ne sortira pas.",
      ],
      tete: "Thé noir, poivre rose", coeur: "Iris poudré, rose", fond: "Parquet ciré, tabac blond",
      matiere: "Parquet en point de Hongrie",
    },
    {
      id: "costa-rica", nom: "COSTA RICA", titre: "Costa Rica", region: "Forêt de nuages",
      moment: "Après la pluie", heure: "Nuit", couleur: "#2E4A32", lot: "006",
      coords: "≈ 10°N · 84°W", note: "Position indicative",
      phrase: "La forêt respire enfin.",
      accroche: "Feuilles mouillées, café, cacao. La forêt tropicale juste après l’averse.",
      histoire: [
        "Dans les forêts de nuages du Costa Rica, la pluie arrive presque chaque après-midi, puis s’arrête d’un coup.",
        "Alors tout ruisselle. Les feuilles immenses s’égouttent, la terre fume, les oiseaux reprennent. Dans les fermes voisines, on fait sécher le café et le cacao.",
        "Une bougie profonde et gourmande, pour faire entrer la forêt dans la maison.",
      ],
      tete: "Fruit de la passion, feuilles mouillées", coeur: "Café, fleur de frangipanier", fond: "Cacao, vanille, vétiver",
      matiere: "Feuilles tropicales mouillées",
    },
  ],
};
if (typeof module !== "undefined") module.exports = CATALOGUE;
