import NoteRepository from '../../domain/repositories/NoteRepository.js';
import Note from '../../domain/entities/Note.js';

export default class ApiNoteRepository extends NoteRepository {
  constructor(notesApi) {
    super();
    this.notesApi = notesApi;
  }
  
  async getAll() {
    const notes = await this.notesApi.getAllNotes();
    return notes.map(note => new Note(
      note.id,
      note.title,
      note.content,
      new Date(note.createdAt),
      new Date(note.updatedAt)
    ));
  }
  
  async getById(id) {
    const note = await this.notesApi.getNoteById(id);
    return new Note(
      note.id,
      note.title,
      note.content,
      new Date(note.createdAt),
      new Date(note.updatedAt)
    );
  }
  
  async save(note) {
    const savedNote = await this.notesApi.createNote(note);
    return new Note(
      savedNote.id,
      savedNote.title,
      savedNote.content,
      new Date(savedNote.createdAt),
      new Date(savedNote.updatedAt)
    );
  }
  
  async update(id, noteData) {
    const updatedNote = await this.notesApi.updateNote(id, noteData);
    return new Note(
      updatedNote.id,
      updatedNote.title,
      updatedNote.content,
      new Date(updatedNote.createdAt),
      new Date(updatedNote.updatedAt)
    );
  }
  
  async delete(id) {
    return await this.notesApi.deleteNote(id);
  }
}