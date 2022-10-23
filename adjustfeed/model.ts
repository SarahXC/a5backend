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
  percents: Array<number>; //TODO: check if this is allowed
};

const Adjustfeed = new Schema<Adjustfeed>({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  percents: {
    type: Schema.Types.Array<Number>,
    required: true
  },
});

const CredibilityModel = model<Credibility>('Credibility', CredibilitySchema);
export default CredibilityModel;
