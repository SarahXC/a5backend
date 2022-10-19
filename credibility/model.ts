import type {Types, PopulatedDoc, Document} from 'mongoose';
import {Schema, model} from 'mongoose';
import type {User} from '../user/model';

/**
 * This file defines the properties stored in a Freet
 * DO NOT implement operations here ---> use collection file
 */

// Type definition for Freet on the backend
export type Credibility = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  user: User;
  score: number;
  canPost: boolean;
};

// Mongoose schema definition for interfacing with a MongoDB table
// Freets stored in this table will have these fields, with the
// type given by the type property, inside MongoDB
const CredibilitySchema = new Schema<Credibility>({
  // The author userId
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  // The date the freet was created
  score: {
    type: Number,
    required: true
  },
  // The content of the freet
  canPost: {
    type: Boolean,
    required: true
  },
  // The date the freet was modified
});

const CredibilityModel = model<Credibility>('Credibility', CredibilitySchema);
export default CredibilityModel;
