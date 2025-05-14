export default class NoteDto {
  constructor(id, title, content, createdAt, updatedAt) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromDomain(note) {
    return new NoteDto(
      note.id,
      note.title,
      note.content,
      note.createdAt,
      note.updatedAt
    );
  }

  static toDomain(dto) {
    return {
      id: dto.id,
      title: dto.title,
      content: dto.content,
      createdAt: dto.createdAt,
      updatedAt: dto.updatedAt
    };
  }
}