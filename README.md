# Noteculette

Noteculette est une application combinant une calculatrice et un système de prise de notes, permettant aux utilisateurs de garder trace de leurs calculs et idées en un seul endroit.

## Fonctionnalités

- **Calculatrice** : Effectuez des calculs mathématiques simples ou complexes
- **Notes** : Créez, modifiez et supprimez vos notes personnelles
- **Interface utilisateur intuitive** : Navigation facile entre la calculatrice et les notes

## Installation

### Prérequis

- Node.js (v14 ou supérieur)
- npm ou yarn

### Étapes d'installation

1. Clonez le dépôt :
```bash
git clone [url-du-dépôt]
cd Noteculette
```

2. Installez les dépendances :
```bash
# Pour le frontend
cd frontend
npm install
# ou
yarn install

# Pour le backend (si applicable)
cd ../backend
npm install
# ou
yarn install
```

3. Lancez l'application :
```bash
# Pour le frontend
npm run dev
# ou
yarn dev

# Pour le backend (si applicable)
npm start
# ou
yarn start
```

## Utilisation

### Calculatrice
- Accédez à la calculatrice depuis la page d'accueil
- Utilisez le clavier numérique pour entrer des nombres
- Cliquez sur les opérateurs pour effectuer des calculs

### Notes
- Naviguez vers la section Notes depuis le menu principal
- Créez une nouvelle note en cliquant sur le bouton "Ajouter" ou "+"
- Remplissez le titre et le contenu de votre note
- Enregistrez la note en cliquant sur "Sauvegarder"
- Modifiez ou supprimez vos notes existantes à l'aide des boutons correspondants

## Structure du projet

Ce projet est organisé en deux parties principales :

### Frontend

Le frontend utilise Vue.js pour créer une interface utilisateur réactive et intuitive. Pour plus de détails spécifiques au frontend, consultez le [README du frontend](/frontend/README.md).

**Technologies principales :**
- Vue.js
- Tailwind CSS
- Axios pour les requêtes API

### Backend

Le backend fournit une API RESTful pour la gestion des notes. Pour plus de détails sur l'API et sa configuration, consultez le [README du backend](/backend/README.md).

**Technologies principales :**
- Express.js
- MongoDB/Mongoose
- JWT pour l'authentification (si implémenté)

## Tests

Le projet utilise Playwright pour les tests end-to-end.

### Exécution des tests

```bash
cd frontend
npm run test
# ou
yarn test
```

### Structure des tests

Les tests sont organisés dans le dossier `/frontend/tests` et couvrent principalement les fonctionnalités suivantes :

- Navigation dans l'application
- Création de notes
- Modification de notes
- Suppression de notes
- Affichage des notes existantes

### Captures d'écran des tests

Les tests génèrent automatiquement des captures d'écran dans le dossier `test-results` pour faciliter le débogage.

## Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Forkez le projet
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/amazing-feature`)
3. Committez vos changements (`git commit -m 'Add some amazing feature'`)
4. Poussez vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrez une Pull Request

## Licence

Ce projet est sous licence [MIT](LICENSE).
