import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Entry } from './entry.model';

@Injectable()
export class EntryService {
  constructor(@InjectModel('Entry') private readonly entryModel: Model<Entry>) {};

  async insertEntry(title: string, para: string, sub: string, tags: string[]) {
    const newEntry = new this.entryModel({title, paragraphs: para, submited: sub});
    const res = await newEntry.save();
    return res.id as string;
  }
}