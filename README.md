# Latitude — maison de bougies

Site vitrine et boutique de la collection Latitude : six bougies, six lieux.
Site statique (HTML, CSS, JavaScript), sans dépendance, déployé sur Vercel à chaque envoi sur `main`.

## Structure

| Chemin | Rôle |
|---|---|
| `assets/catalogue.js` | **Source unique** : marque, prix, formats, livraison, et les six lieux (textes, notes, coordonnées, couleurs). |
| `assets/style.css` | Styles du site (thème clair et sombre). |
| `assets/app.js` | Panier, galerie, formulaires, chargement des photos. |
| `assets/scenes.js` | Illustrations des lieux, affichées tant qu'il n'y a pas de photo. |
| `images/<lieu>/` | Photos des lieux : `lieu.jpg`, `bougie.jpg`, `detail.jpg`, `histoire.jpg` (voir `images/LISEZMOI.md`). |
| `scripts/build.cjs` | Génère `index.html` et `bougies/<lieu>.html` à partir du catalogue. |
| `index.html`, `bougies/` | Pages générées : ne pas modifier à la main. |
| `vercel.json` | Adresses propres (`/bougies/anafi` au lieu de `/bougies/anafi.html`). |

## Modifier le site

1. Modifier `assets/catalogue.js` (ou ajouter des photos dans `images/<lieu>/`).
2. Régénérer les pages :

   ```bash
   node scripts/build.cjs
   ```

3. Envoyer sur GitHub (`main`) : Vercel met le site à jour automatiquement.

## Avant le lancement

- `config.formEndpoint` dans le catalogue : brancher les formulaires (Formspree, Brevo…). Vide = envoi simulé, rien n'est enregistré.
- `config.checkoutUrl` : lien de paiement (Stripe, Shopify). Vide = mode précommande.
- Prix, frais de livraison et conditions de retour : valeurs provisoires à confirmer.
