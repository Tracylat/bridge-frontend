# TODO

## Completed: none yet

## 1) Corriger le placement des images (éviter répétitions / mêmes endroits)
- [ ] Analyser où les carrousels/rotateurs d’images se chevauchent.
- [ ] Normaliser la logique de transition (opacity/keys/interval) pour que seul le slide courant soit visible.

## 2) Enlever la couleur dorée
- [ ] Remplacer toutes les occurrences du gold (ex: `#c9a84c`, `#f0d896`, classes `bp-eyebrow`, `bp-gold-line`, etc.) par une couleur bleue/neutral.
- [ ] Ajuster les SVG/dividers qui utilisent explicitement `#c9a84c`.

## 3) Augmenter légèrement la taille de la police
- [ ] Augmenter la taille des titres et/ou textes clés (ex: `bp-eyebrow`, texte hero, paragraphes).
- [ ] Mettre à jour `src/index.css` (styles système) plutôt que toucher partout.

## 4) Tester
- [ ] Lancer `npm run dev` et vérifier visuellement.
- [ ] Lancer `npm run build` (et/ou `npm test` si dispo).

