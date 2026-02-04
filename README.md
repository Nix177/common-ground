# Common Ground : Le Github des Passions

## Architecture d'un écosystème de construction collaborative

Dans un paysage numérique saturé par le "personal branding" de LinkedIn et le chaos informationnel de Discord, Common Ground se positionne comme une plateforme de mobilisation plutôt que de transaction. L'objectif est de passer du "réseautage passif" à la "co-construction active" en utilisant des outils de gouvernance et de gestion de projet simplifiés pour les non-professionnels.

## Vision

L'opportunité réside dans la "Nécessité Collaborative" : un utilisateur ne peut pas faire progresser son projet seul s'il manque des rôles clés dans son "Stack".

---

## Architecture Technique

### 1. Structure de Données (ProjectBlueprint.json)
Le "Blueprint" est un fichier de configuration standardisé qui définit l'ADN du projet. Il permet d'éviter les étapes préliminaires fastidieuses de mise en place.

### 2. Algorithme de Matching (AvailabilityMatcher.ts)
Priorise le Temps Disponible (T) et la Compatibilité des Compétences (S).
Score = α * S(V,T) + β * A(V,T).

### 3. Gestion Simplifiée (MicroKanban.js)
- **Next Up**: Les 3 prochaines tâches critiques.
- **In Progress**: Qui fait quoi.
- **Done**: Les succès récents.

---

## Déploiement & GitHub Pages

Pour rendre ce projet accessible via GitHub Pages :

1.  **Publier sur GitHub** : Utilisez GitHub Desktop pour publier ce dépôt local. Donnez-lui le nom `common-ground`.
2.  **Activer Pages** :
    *   Allez sur la page de votre dépôt sur GitHub.com.
    *   Cliquez sur **Settings** (Paramètres) > **Pages**.
    *   Sous "Build and deployment", sélectionnez la source **Deploy from a branch**.
    *   Sélectionnez la branche `main` (ou `master`) et le dossier `/ (root)`.
    *   Cliquez sur **Save**.

Votre lien sera accessible à l'adresse suivante (après quelques minutes) :
`https://<votre-nom-d-utilisateur>.github.io/common-ground/`
