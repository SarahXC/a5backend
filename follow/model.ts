import type {Types} from 'mongoose';
import {Schema, model} from 'mongoose';
import type {User} from '../user/model';

/**
 * This file defines the properties stored in a User
 * DO NOT implement operations here ---> use collection file
 */

// Type definition for User on the backend
export type Follow = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  follower: Types.ObjectId;
  followed: Types.ObjectId;
  dateFollowed: Date;
};

export type PopulatedFollow = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  follower: User;
  followed: User;
  dateFollowed: Date;
};

// Mongoose schema definition for interfacing with a MongoDB table
// Users stored in this table will have these fields, with the
// type given by the type property, inside MongoDB
const FollowSchema = new Schema<Follow>({
  // The user's username
  follower: {
    type: Schema.Types.ObjectId,
    required: true
  },
  // The user's password
  followed: {
    type: Schema.Types.ObjectId,
    required: true
  },
  // The date the user joined
  dateFollowed: {
    type: Date,
    required: true
  }
});

const FollowModel = model<Follow>('Follow', FollowSchema);
export default FollowModel;
