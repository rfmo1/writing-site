import * as mongoose from 'mongoose'


export const EntrySchema = new mongoose.Schema({
  title: {type: String, required: true},
  paragraphs: {type: String, required: true},
  tags: {type: [String], required: false},
  submited: {type: String, required: true}
})


export interface Entry {
  id: string,
  title: string,
  paragraphs: string,
  tags: string[],
  submited: string
}