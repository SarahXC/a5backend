import { Freet } from 'freet/model';
import type {Types, PopulatedDoc, Document} from 'mongoose';
import {Schema, model} from 'mongoose';
import type {User} from '../user/model';

/**
 * This file defines the properties stored in a Freet
 * DO NOT implement operations here ---> use collection file
 */

// Type definition for Freet on the backend
export type Tag = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  post: Freet;
  category: string;
};

const TagSchema = new Schema<Tag>({
  post: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Freet'
  },
  category: {
    type: Schema.Types.String,
    required: true
  },
});

const TagModel = model<Tag>('Tag', TagSchema);
export default TagModel;
