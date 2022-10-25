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
  politics: boolean;
  entertainment: boolean;
  sports: boolean;
  news: boolean;
};

const AdjustfeedSchema = new Schema<Adjustfeed>({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  politics: {
    type: Schema.Types.Boolean,
    required: true
  },
  entertainment: {
    type: Schema.Types.Boolean,
    required: true
  },
  sports: {
    type: Schema.Types.Boolean,
    required: true
  },
  news: {
    type: Schema.Types.Boolean,
    required: true
  },
});

const AdjustfeedModel = model<Adjustfeed>('Adjustfeed', AdjustfeedSchema);
export default AdjustfeedModel;
