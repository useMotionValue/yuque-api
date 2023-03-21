import MiniNotesPojo from "../pojo/MiniNotesPojo"

export default class MiniNotesVo {
  private data: Array<MiniNotesPojo>
  private userId: string

  constructor(userId: string, data: Array<MiniNotesPojo>) {
    this.userId = userId
    this.data = data
  }
}
