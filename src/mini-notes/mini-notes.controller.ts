import { Controller, Get, Post, Body, Patch, Param, Delete, Headers } from "@nestjs/common"
import { MiniNotesService } from "./mini-notes.service"
import { MiniNoteDto } from "./dto/MiniNoteDto"

@Controller("mininotes")
export class MiniNotesController {
  constructor(private readonly miniNotesService: MiniNotesService) {}

  @Post()
  async addMiniNote(@Body() MiniNoteDto: MiniNoteDto, @Headers() headers: Record<string, string>) {
    return this.miniNotesService.addMiniNote(MiniNoteDto, headers)
  }

  @Get()
  async getAllMiniNotes(@Headers() headers: Record<string, string>) {
    return this.miniNotesService.getAllMiniNotes(headers)
  }

  @Patch()
  async updateMiniNotes(
    @Body() MiniNoteDto: MiniNoteDto,
    @Headers() headers: Record<string, string>
  ) {
    return this.miniNotesService.updateMiniNotes(MiniNoteDto, headers)
  }

  @Delete(":notesId")
  async removeMiniNotes(
    @Param("notesId") notesId: number,
    @Headers() headers: Record<string, string>
  ) {
    return this.miniNotesService.removeMiniNotes(Math.floor(Number(notesId)), headers)
  }
}
