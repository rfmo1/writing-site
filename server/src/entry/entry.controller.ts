import { Body, Controller, Get, Param, Post, Patch, UseGuards } from '@nestjs/common';
import { EntryService } from './entry.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('entry')
export class EntryController {
  constructor(private readonly entryService: EntryService){}

  
  @Post()
  @UseGuards(JwtAuthGuard)
  async addEntry(@Body('title') title: string,
    @Body('paragraphs') paragraphs: string,
    @Body('submited') submited: string,
    @Body('tags') tags: string[]) {
    const generatedId = await this.entryService.insertEntry(title, paragraphs, submited, tags);
    return {id: generatedId};
  }

  
  @Get()
  async getAllEntries() {
    const entries = await this.entryService.getEntries();
    return entries;
  }

  @Get(':id')
  async getEntry(@Param('id') entryId: string) {
    const entry = await this.entryService.findEntry(entryId);
    return this.entryService.entryFormat(entry);
  }

  
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  patchEntry(@Param('id') entryId: string,
    @Body('title') title: string,
    @Body('paragraphs') paragraphs: string,
    @Body('submited') submited: string) {
      this.entryService.updateEntry(entryId, title, paragraphs, submited);
      return;
  }

  
  @Patch(':id/addtag')
  @UseGuards(JwtAuthGuard)
  newTag(@Param('id') entryId: string, @Body('tag') tag: string) {
    this.entryService.addTag(entryId, tag);
    return;
  }

  
  @Patch(':id/untag')
  @UseGuards(JwtAuthGuard)
  untag(@Param('id') entryId: string, @Body('tag') tag: string) {
    this.entryService.removeTag(entryId, tag);
    return;
  }

  @Patch(':id/cleartags')
  @UseGuards(JwtAuthGuard)
  removeTags(@Param('id') entryId: string) {
    this.entryService.clearTags(entryId);
    return;
  }

}
