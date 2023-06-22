import { Body, Controller, Post } from '@nestjs/common';
import { NoteService } from './note.service';

export interface CreateNoteDto {
  content: string;
  owner: string;
}

@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  async createNote(@Body() createNoteDto: CreateNoteDto) {
    return await this.noteService.createNote(createNoteDto);
  }
}
