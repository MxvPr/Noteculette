# Backend Documentation

Ce projet est une application de calculatrice et de gestion de notes, construite avec Node.js pour le backend et React pour le frontend.

## Structure du projet

Le backend est organisé comme suit :

- **src/** : Contient le code source de l'application.
  - **config/** : Contient les fichiers de configuration.
    - `db.js` : Configuration de la connexion à MongoDB.
  - **controllers/** : Contient les contrôleurs qui gèrent la logique des opérations.
    - `calculatriceController.js` : Gère les opérations de calcul.
    - `notesController.js` : Gère les opérations liées aux notes.
  - **models/** : Définit les modèles de données.
    - `calculatriceModel.js` : Modèle pour les opérations de calcul.
    - `noteModel.js` : Modèle Mongoose pour les notes.
  - **routes/** : Définit les routes de l'application.
    - `calculatriceRoutes.js` : Routes pour les opérations de calcul.
    - `notesRoutes.js` : Routes pour les opérations sur les notes.
  - **services/** : Contient la logique métier.
    - `calculatriceService.js` : Logique pour les opérations de calcul.
    - `notesService.js` : Logique pour la gestion des notes.
  - `app.js` : Point d'entrée de l'application, configure le serveur et les routes.

## Installation

1. Clonez le dépôt :
   ```
   git clone <URL_DU_DEPOT>
   cd calculatrice-notes-app/backend
   ```

2. Installez les dépendances :
   ```
   npm install
   ```

3. Configurez les variables d'environnement :
   - Créez un fichier `.env` à la racine du projet
   - Ajoutez les variables nécessaires (PORT, MONGO_URI, etc.)

## Configuration de la base de données

L'application utilise MongoDB comme base de données. Assurez-vous d'avoir MongoDB installé localement ou utilisez un service cloud comme MongoDB Atlas.

Exemple de configuration dans le fichier `.env` :
```
NODE_ENV=development
PORT=5001
MONGO_URI=mongodb://localhost:27017/noteculette
```

### Permissions MongoDB

Assurez-vous que votre utilisateur MongoDB dispose des droits nécessaires pour effectuer les opérations CRUD (Create, Read, Update, Delete) sur votre base de données :

```javascript
// Exemple d'attribution de permissions dans MongoDB
db.createUser({
  user: "noteculetteUser",
  pwd: "password",
  roles: [{ role: "readWrite", db: "noteculette" }]
})
```

## Démarrage

Pour démarrer le serveur, exécutez la commande suivante :
```
npm start
```

Le serveur sera accessible à l'adresse `http://localhost:5001`.

## API

### Calculatrice

- **POST /api/calculatrice/addition** : Effectue une addition.
- **POST /api/calculatrice/soustraction** : Effectue une soustraction.
- **POST /api/calculatrice/multiplication** : Effectue une multiplication.
- **POST /api/calculatrice/division** : Effectue une division.

### Notes

- **POST /api/notes** : Crée une nouvelle note.
- **GET /api/notes** : Récupère toutes les notes.
- **GET /api/notes/:id** : Récupère une note spécifique.
- **PUT /api/notes/:id** : Met à jour une note existante.
- **DELETE /api/notes/:id** : Supprime une note.

## Dépannage

### Problèmes avec les opérations de mise à jour et suppression

Si vous rencontrez des problèmes pour mettre à jour ou supprimer des notes, vérifiez les points suivants :

1. **ID de document valide** : Assurez-vous que l'ID fourni dans l'URL est un ObjectId MongoDB valide.

2. **Autorisations MongoDB** : Vérifiez que votre utilisateur MongoDB possède les droits suffisants.

3. **Validation du corps de requête** :
   - Pour les requêtes PUT, assurez-vous que le corps contient des données valides.
   - Exemple de requête valide pour mettre à jour une note :
     ```json
     {
       "title": "Nouveau titre",
       "content": "Nouveau contenu"
     }
     ```

4. **Vérification des logs** : Consultez les logs du serveur pour identifier les erreurs spécifiques.

5. **Test avec Postman ou curl** : Testez directement les routes avec un outil comme Postman ou curl :
   ```bash
   # Mise à jour d'une note
   curl -X PUT http://localhost:5001/api/notes/60d21b4667d0d8992e610c85 -H "Content-Type: application/json" -d '{"title": "Titre mis à jour", "content": "Contenu mis à jour"}'
   
   # Suppression d'une note
   curl -X DELETE http://localhost:5001/api/notes/60d21b4667d0d8992e610c85
   ```

## Tests Unitaires et d'Intégration

Le projet inclut une suite complète de tests unitaires et d'intégration pour assurer la qualité du code et le bon fonctionnement des fonctionnalités.

### Structure des tests

- **tests/** : Contient tous les tests de l'application.
  - **unit/** : Tests unitaires isolés pour chaque composant.
    - **controllers/** : Tests des contrôleurs.
    - **models/** : Tests des modèles de données.
    - **services/** : Tests des services.
  - **integration/** : Tests d'intégration qui vérifient l'interaction entre composants.
    - **notesRoutes.test.js** : Tests des routes de l'API notes.
    - **calculatriceRoutes.test.js** : Tests des routes de l'API calculatrice.

### Exécution des tests

Pour exécuter tous les tests :

```bash
npm test
```

Pour exécuter les tests en mode watch (utile pendant le développement) :

```bash
npm run test:watch
```

Pour générer un rapport de couverture de code :

```bash
npm run test:coverage
```

### Frameworks et outils de test

- **Jest** : Framework de test principal
- **Supertest** : Pour tester les requêtes HTTP
- **MongoDB Memory Server** : Pour exécuter les tests avec une base de données MongoDB en mémoire

### Bonnes pratiques de test

1. **Tests isolés** : Chaque test doit être indépendant des autres.
2. **Mocks et stubs** : Utiliser des mocks pour simuler les dépendances.
3. **Nettoyage entre tests** : Réinitialiser l'état entre les tests.
4. **Tests lisibles** : Utiliser des noms de tests descriptifs.

## Contribuer

Les contributions sont les bienvenues ! Veuillez soumettre une demande de tirage pour toute modification ou amélioration.

## License

Ce projet est sous licence MIT.