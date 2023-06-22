// src/lists/schemas/list.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Note } from './note.schema';
export type ListDocument = List & Document;
@Schema()
export class List {
  @Prop({ required: true })
  listTitle: string;
  @Prop([Note])
  notes: Note[];
  @Prop({ required: true, default: Date.now })
  createdOn: Date;

  @Prop({ required: true, default: Date.now })
  updatedOn: Date;
}
export const ListSchema = SchemaFactory.createForClass(List);
