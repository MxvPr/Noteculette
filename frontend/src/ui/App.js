import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet, Link } from 'react-router-dom';

// Composants UI
import CalculatorPage from './components/Calculator/CalculatorPage';
import NotesPage from './components/Notes/NotesPage';

// Infrastructure
import NotesApi from '../infrastructure/api/NotesApi';
import CalculatorApi from '../infrastructure/api/CalculatorApi';
import ApiNoteRepository from '../infrastructure/repositories/ApiNoteRepository';
import ApiCalculatorRepository from '../infrastructure/repositories/ApiCalculatorRepository';

// Domain Services
import NoteService from '../domain/services/NoteService';
import CalculatorService from '../domain/services/CalculatorService';

// Use Cases
import GetAllNotesUseCase from '../application/useCases/notes/GetAllNotesUseCase';
import CreateNoteUseCase from '../application/useCases/notes/CreateNoteUseCase';
import UpdateNoteUseCase from '../application/useCases/notes/UpdateNoteUseCase';
import DeleteNoteUseCase from '../application/useCases/notes/DeleteNoteUseCase';
import PerformCalculationUseCase from '../application/useCases/calculator/PerformCalculationUseCase';
import GetCalculationHistoryUseCase from '../application/useCases/calculator/GetCalculationHistoryUseCase';

// Initialisation des dépendances
const notesApi = new NotesApi();
const calculatorApi = new CalculatorApi();

const noteRepository = new ApiNoteRepository(notesApi);
const calculatorRepository = new ApiCalculatorRepository(calculatorApi);

const noteService = new NoteService(noteRepository);
const calculatorService = new CalculatorService();

// Use Cases
const getAllNotesUseCase = new GetAllNotesUseCase(noteRepository);
const createNoteUseCase = new CreateNoteUseCase(noteRepository, noteService);
const updateNoteUseCase = new UpdateNoteUseCase(noteRepository, noteService);
const deleteNoteUseCase = new DeleteNoteUseCase(noteRepository);
const performCalculationUseCase = new PerformCalculationUseCase(
  calculatorRepository,
  calculatorService
);
const getCalculationHistoryUseCase = new GetCalculationHistoryUseCase(calculatorRepository);

// Layout component avec style glassmorphisme
const Layout = () => {
  return (
    <div className="min-h-screen py-8 px-4 bg-gradient-to-br from-apple-gray to-white">
      {/* Cercles décoratifs pour l'arrière-plan */}
      <div className="fixed -top-40 -right-40 w-96 h-96 bg-blue-100 rounded-full opacity-40 blur-3xl z-0"></div>
      <div className="fixed -bottom-40 -left-40 w-96 h-96 bg-purple-100 rounded-full opacity-40 blur-3xl z-0"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <h1 className="text-4xl font-bold text-center mb-8 text-apple-dark tracking-tight">
          Noteculette<span className="text-apple-blue">.</span>
        </h1>
        
        <nav className="glass mb-8 overflow-hidden">
          <div className="flex justify-center space-x-8 p-4">
            <Link 
              to="/" 
              className="text-lg font-medium text-gray-700 hover:text-apple-blue transition-colors px-4 py-2 rounded-lg"
            >
              Calculatrice
            </Link>
            <Link 
              to="/notes" 
              className="text-lg font-medium text-gray-700 hover:text-apple-blue transition-colors px-4 py-2 rounded-lg"
            >
              Notes
            </Link>
          </div>
        </nav>
        
        <div className="glass p-8">
          <Outlet />
        </div>
        
        <footer className="mt-8 text-center text-sm text-gray-500">
          <p>© 2025 Noteculette. Tous droits réservés.</p>
        </footer>
      </div>
    </div>
  );
};

// Router configuration
const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <CalculatorPage 
              performCalculationUseCase={performCalculationUseCase}
              getCalculationHistoryUseCase={getCalculationHistoryUseCase}
            />
          ),
        },
        {
          path: 'notes',
          element: (
            <NotesPage 
              getAllNotesUseCase={getAllNotesUseCase}
              createNoteUseCase={createNoteUseCase}
              updateNoteUseCase={updateNoteUseCase}
              deleteNoteUseCase={deleteNoteUseCase}
            />
          ),
        },
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  }
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;