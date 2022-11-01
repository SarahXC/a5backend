import type {Types, PopulatedDoc, Document} from 'mongoose';
import {Schema, model} from 'mongoose';
import type {User} from '../user/model';

/**
 * This file defines the properties stored in a Freet
 * DO NOT implement operations here ---> use collection file
 */

// Type definition for Freet on the backend
export type Freet = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  authorId: Types.ObjectId;
  dateCreated: Date;
  content: string;
  dateModified: Date;
  category: string;
  // numLikes: number; 
};

export type PopulatedFreet = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  authorId: User;
  dateCreated: Date;
  content: string;
  dateModified: Date;
  category: string;
  // numLikes: number; 
};

// Mongoose schema definition for interfacing with a MongoDB table
// Freets stored in this table will have these fields, with the
// type given by the type property, inside MongoDB
const FreetSchema = new Schema<Freet>({
  // The author userId
  authorId: {
    // Use Types.ObjectId outside of the schema
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  // The date the freet was created
  dateCreated: {
    type: Schema.Types.Date,
    required: true
  },
  // The content of the freet
  content: {
    type: Schema.Types.String,
    required: true
  },
  // The date the freet was modified
  dateModified: {
    type: Schema.Types.Date,
    required: true
  },
  category: {
    type: Schema.Types.String,
    required: true
  }
});

const FreetModel = model<Freet>('Freet', FreetSchema);
export default FreetModel;
