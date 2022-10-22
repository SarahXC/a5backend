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

const CredibilitySchema = new Schema<Credibility>({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  score: {
    type: Schema.Types.Number,
    required: true
  },
  canPost: {
    type: Schema.Types.Boolean,
    required: true
  },
});

const CredibilityModel = model<Credibility>('Credibility', CredibilitySchema);
export default CredibilityModel;
