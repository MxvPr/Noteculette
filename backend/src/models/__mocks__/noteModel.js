const mockNote = {
  find: jest.fn(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
  prototype: {
    save: jest.fn()
  }
};

// Constructeur
function Note(data) {
  return {
    ...data,
    save: mockNote.prototype.save
  };
}

// Assigner toutes les fonctions statiques
Object.assign(Note, mockNote);

export default Note;
