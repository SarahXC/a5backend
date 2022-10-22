import type {Types} from 'mongoose';
import {Schema, model} from 'mongoose';
import type {User} from '../user/model';
import type {Freet} from '../freet/model';

/**
 * This file defines the properties stored in a User
 * DO NOT implement operations here ---> use collection file
 */

// Type definition for User on the backend
export type Like = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  post: Freet
  userPost: User;
  userLike: User;
  dateLiked: Date;
};

// Mongoose schema definition for interfacing with a MongoDB table
// Users stored in this table will have these fields, with the
// type given by the type property, inside MongoDB
const LikeSchema  = new Schema<Like>({
  post: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  userPost: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
    
  },
  userLike: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  dateLiked: {
    type: Date,
    required: true,
  }
});

const LikeModel = model<Like>('Like', LikeSchema);
export default LikeModel;
