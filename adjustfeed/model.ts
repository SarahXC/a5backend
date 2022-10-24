import type {Types, PopulatedDoc, Document} from 'mongoose';
import {Schema, model} from 'mongoose';
import type {User} from '../user/model';

/**
 * This file defines the properties stored in a Freet
 * DO NOT implement operations here ---> use collection file
 */

// Type definition for Freet on the backend
export type Adjustfeed = {
  _id: Types.ObjectId; 
  user: User;
  liberalPolitics: number;
  conservativePolitics: number;
  entertainment: number;
  sports: number;
  news: number;
};

const AdjustfeedSchema = new Schema<Adjustfeed>({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  liberalPolitics: {
    type: Schema.Types.Number,
    required: true
  },
  conservativePolitics: {
    type: Schema.Types.Number,
    required: true
  },
  entertainment: {
    type: Schema.Types.Number,
    required: true
  },
  sports: {
    type: Schema.Types.Number,
    required: true
  },
  news: {
    type: Schema.Types.Number,
    required: true
  },
});

const AdjustfeedModel = model<Adjustfeed>('Adjustfeed', AdjustfeedSchema);
export default AdjustfeedModel;
