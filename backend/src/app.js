import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import calculatriceRoutes from './routes/calculatriceRoutes.js';
import notesRoutes from './routes/notesRoutes.js';

// Charger les variables d'environnement
dotenv.config();

// Connexion à la base de données seulement si ce n'est pas un test
if (process.env.NODE_ENV !== 'test') {
  connectDB();
}

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json());
app.use(cors());

// Ajouter un middleware pour faciliter les tests
if (process.env.NODE_ENV === 'test') {
  app.use((req, res, next) => {
    // Log simplifié des requêtes pour débogage pendant les tests
    console.debug(`${req.method} ${req.path}`);
    next();
  });
}

// Routes
app.use('/api/calculatrice', calculatriceRoutes);
app.use('/api/notes', notesRoutes);

// Route de base
app.get('/', (req, res) => {
  res.send('API Noteculette est en ligne!');
});

// Démarrer le serveur seulement si ce n'est pas importé pour un test
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
  });
}

export default app;