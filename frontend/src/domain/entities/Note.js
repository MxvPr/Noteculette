export default class Note {
  constructor(id, title, content, createdAt, updatedAt) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

  update(title, content) {
    this.title = title || this.title;
    this.content = content || this.content;
    this.updatedAt = new Date();
  }
}