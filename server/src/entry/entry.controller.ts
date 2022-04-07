import { Body, Controller, Post } from '@nestjs/common';
import { EntryService } from './entry.service';

@Controller('entry')
export class EntryController {
  constructor(private readonly entryService: EntryService){}

  @Post()
  async addEntry(@Body('title') title: string,
    @Body('paragraphs') paragraphs: string,
    @Body('submited') submited: string,
    @Body('tags') tags: string[]
  ){
    const generatedId = await this.entryService.insertEntry(title, paragraphs, submited, tags);
    return {id: generatedId};
  }

}
