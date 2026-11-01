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
      id: "venise", nom: "VENISE", titre: "Venise", region: "Grand Canal, Venise",
      moment: "Matin d’hiver", heure: "10 h", couleur: "#3F6F73", lot: "006",
      coords: "45°26′N · 12°20′E",
      phrase: "Le sillage d’un bateau sur l’eau verte.",
      accroche: "Accord lagune, iris, bois verni. Le Grand Canal par un matin d’hiver, sous un ciel sans nuage.",
      histoire: [
        "Un matin d’hiver sur le Grand Canal. Le ciel est d’un bleu dur, l’air froid et clair. Les palais ont les pieds dans l’eau et la pierre blanche prend toute la lumière.",
        "Les bateaux-taxis passent en laissant un sillage d’écume. Leur coque en bois verni brille comme un meuble ancien. Les pieux rayés bleu et blanc se balancent à peine.",
        "Nous avons voulu garder cette fraîcheur iodée, l’odeur du bois ciré et de la pierre mouillée. Une bougie lumineuse pour les matins où l’on a envie de partir.",
      ],
      tete: "Accord lagune, bergamote", coeur: "Iris, fleur d’oranger", fond: "Bois verni, ambre, musc blanc",
      matiere: "Bois verni et pierre d’Istrie",
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
      id: "saarah", nom: "SAARAH", titre: "Saarah", region: "Erg Zahar, au crépuscule",
      moment: "Crépuscule", heure: "20 h", couleur: "#C98B4E", lot: "002",
      coords: "Coordonnées à venir", note: "Erg Zahar",
      phrase: "L’heure où la dune devient rose.",
      accroche: "Cardamome, ambre, santal. La chaleur des dunes de l’erg Zahar quand le soleil disparaît.",
      histoire: [
        "Dans l’erg Zahar, les dunes s’étendent jusqu’à l’horizon. Saarah, c’est l’heure où le soleil touche la dernière crête et où le sable passe de l’or au brun.",
        "La chaleur remonte de la dune, l’air se charge d’épices. Un thé à la cardamome chauffe quelque part. On attend la nuit sans rien dire.",
        "Une bougie ambrée et enveloppante, pour les soirs où l’on a besoin de chaleur.",
      ],
      tete: "Cardamome, datte", coeur: "Encens, rose sèche", fond: "Ambre, santal",
      matiere: "Sable fin, lumière rasante",
    },
    {
      id: "chamblac", nom: "CHAMBLAC", titre: "Chamblac", region: "Pays d’Ouche, Normandie",
      moment: "Soirée d’hiver", heure: "21 h", couleur: "#8A3E2F", lot: "005",
      coords: "≈ 48°58′N · 0°31′E", note: "Coordonnées approximatives",
      phrase: "La pluie sur les pommiers, le feu dans la cheminée.",
      accroche: "Pomme, feu de bois, calvados. Une maison normande un soir d’hiver, quand il pleut dehors.",
      histoire: [
        "Chamblac est un village de l’Eure, en Normandie. Autour, le bocage : des haies, des prés, des vergers, des maisons à colombages sous de grands toits.",
        "Le soir, en hiver, la pluie tombe doucement sur les pommiers. Dans la maison, le feu crépite. L’odeur du bois se mêle à celle des pommes qui cuisent, un verre de calvados attend sur la table.",
        "Une bougie chaude et boisée, pour les soirs où l’on rentre trempé et content d’être là.",
      ],
      tete: "Pomme reinette, herbe mouillée", coeur: "Feu de bois, foin", fond: "Calvados, cuir, chêne",
      matiere: "Bois de chêne et pommes du verger",
    },
  ],
};
if (typeof module !== "undefined") module.exports = CATALOGUE;
