import type {HydratedDocument, Types} from 'mongoose';
import type {Like} from './model';
import LikeModel from './model';

import type {User} from '../user/model'; 
import UserCollection from '../user/collection';
import FreetCollection from '../freet/collection';
import UserModel from '../user/model';
import FreetModel from 'freet/model';

/**
  * findOne: by likeId
  * findOneByPostAndUserId
  * addOne
  * deleteOne: by likeId
  * deleteMany: unlikes all of the likes by a user
  * findAllByFreet: gets all of the likes who have liked the freet
  * findAllByUser: gets all the likes that the user has liked
  * 
*/


class LikeCollection {
  /**
   * Find a like by likeId
   *
   * @param {string} likeId - The id of the freet to find
   * @return {Promise<HydratedDocument<Like>> | Promise<null> } - The freet with the given freetId, if any
   */
  static async findOne(likeId: Types.ObjectId | string): Promise<HydratedDocument<Like>> {
    return LikeModel.findOne({_id: likeId}).populate('post', 'userPost', 'userLike'); //TODO: how this work
  }

  /**
   * Find a like by post and userLike
   *
   * @param {string} likeId - The id of the freet to find
   * @return {Promise<HydratedDocument<Like>> | Promise<null> } - The freet with the given freetId, if any
   */
   static async findOneByPostAndUserId(postId: Types.ObjectId | string, userId: Types.ObjectId | string): Promise<HydratedDocument<Like>> {
    const post = FreetCollection.findOne(postId);
    const userLike = UserCollection.findOneByUserId(userId);
    return LikeModel.findOne({post: post, userLike: userLike}).populate('post', 'userPost', 'userLike'); //TODO: how this work
  }

  /**
   * Like a user's post
   *
   * @param {string} freetId - the freet being liked
   * @param {string} userId - The user liking the post
   * @return {Promise<HydratedDocument<Like>>} - The new follow
   */
  
  static async addOne(freetId: Types.ObjectId | string, userId: Types.ObjectId | string): Promise<HydratedDocument<Like>> {
    const dateLiked = new Date();
    const freetObject = await FreetCollection.findOne(freetId);
    const userPost = await UserCollection.findOneByUserId(freetObject.authorId);
    const userLike = await UserCollection.findOneByUserId(userId);

    const like = new LikeModel({freetObject, userPost, userLike, dateLiked});
    await like.save(); // Saves user to MongoDB
    return like.populate(['freetObject','userObject']); //TODO: help understanding this
  }

  /**
   * Unlike a user's post
   *
   * @param {string} likeId - The id of like to delete
   * @return {Promise<Boolean>} - true if the freet has been deleted, false otherwise
   */

  static async deleteOne(likeId: Types.ObjectId | string): Promise<boolean> {
    const like = await LikeModel.deleteOne({_id: likeId});
    return like !== null;
  }

  /**
   * Unlike a user's post
   *
   * @param {string} likeId - The id of like to delete
   * @return {Promise<Boolean>} - true if the freet has been deleted, false otherwise
   */

   static async deleteByPostId(userId: Types.ObjectId | string, postId: Types.ObjectId | string): Promise<boolean> {
    const post = await FreetModel.findOne({_id: postId});
    const userLike = await UserModel.findById(userId);
    const like = await LikeModel.deleteOne({post: post, userLike: userLike});
    return like !== null;
  }

  /**
   * Delete's all the likes from that user
   *
   * @param {string} userId - delete all the likes from this user
   * @return {Promise<Boolean>} - true if the freet has been deleted, false otherwise
   */

   static async deleteMany(userId: Types.ObjectId | string): Promise<boolean> {
    const user = await UserCollection.findOneByUserId(userId);
    const like = await LikeModel.deleteMany({userPost: user});
    return like !== null;
  }

  /**
   * Get all the likes for a freet 
   *
   * @param {string} freetId
   * @return {Promise<HydratedDocument<Freet>[]>} - An array of all of the freets
   */
   static async findAllByFreet(freetId: Types.ObjectId | string): Promise<Array<HydratedDocument<Like>>> {
    const post = await FreetCollection.findOne(freetId);
    return LikeModel.find({post: post}).populate('post'); //TODO: is this the right populate
  }

  /**
   * Get all the posts that a user has liked
   *
   * @param {string} userId
   * @return {Promise<HydratedDocument<Freet>[]>} - An array of all of the freets
   */
   static async findAllByUser(userId: Types.ObjectId | string): Promise<Array<HydratedDocument<Like>>> {
    const user = await UserCollection.findOneByUserId(userId);
    return LikeModel.find({userLike: user}).populate('userLike'); //TODO: is this the right populate
  }

}

export default LikeCollection;
