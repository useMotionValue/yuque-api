import { MiniNoteDto } from "../dto/MiniNoteDto"

export default class MiniNotesVo {
  private MiniNotes: Array<MiniNoteDto>

  constructor(MiniNotes: Array<MiniNoteDto>) {
    this.MiniNotes = MiniNotes
  }
}
