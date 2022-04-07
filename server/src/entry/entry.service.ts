import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Entry } from './entry.model';

@Injectable()
export class EntryService {

  constructor(@InjectModel('Entry') private readonly entryModel: Model<Entry>) {};

  async insertEntry(title: string, para: string, sub: string, tags: string[]) {
    const newEntry = new this.entryModel({title, paragraphs: para, submited: sub, tags: tags});
    const res = await newEntry.save();
    return res.id as string;
  }

  async getEntries() {
    const entries = await this.entryModel.find().exec();
    return entries.map(this.entryFormat) as Entry[];
  }

  async findEntry(entryId: string) {
    try {
      const entry = await this.entryModel.findById(entryId);
      if (!entry) throw new NotFoundException('Entry not found.');
      return entry;
    } catch(error) {
      throw new NotFoundException('Entry not found.');
    } 
  }

  async updateEntry(entryId: string, title: string, para: string, sub: string) {
    let entry = await this.findEntry(entryId);
    if (title) entry.title = title;
    if (para) entry.paragraphs = para;
    if (sub) entry.submited = sub;
    await entry.save();
    return;
  }

  async addTag(entryId: string, tag: string) {
    let entry = await this.findEntry(entryId);
    entry.tags.push(tag);
    await entry.save();
    return;
  }

  async removeTag(entryId: string, rtag: string) {
    let entry = await this.findEntry(entryId);
    if (!entry.tags.includes(rtag)) throw new NotFoundException('Tag not fount in entry.');
    entry.tags = entry.tags.filter((tag) => tag !== rtag);
    await entry.save();
    return;
  }

  async clearTags(entryId: string) {
    let entry = await this.findEntry(entryId);
    entry.tags = [];
    await entry.save();
    return;
  }

  entryFormat(entry: any) {
    return {id: entry.id, 
      title: entry.title, 
      paragraphs: entry.paragraphs, 
      tags: entry.tags, 
      submited: entry.submited} as Entry;
  }
}