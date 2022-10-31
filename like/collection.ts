import type {HydratedDocument, Types} from 'mongoose';
import type {Like} from './model';
import LikeModel from './model';
import FreetModel from '../freet/model';

import type {User} from '../user/model'; 
import UserCollection from '../user/collection';
import FreetCollection from '../freet/collection';
import UserModel from '../user/model';

/**
  * findOne: by likeId
  * findOneByPostAndUserId
  * addOne
  * deleteOne: by likeId
  * deleteMany: unlikes all of the likes by a user
  * findAllByFreet: gets all of the likes for a freet
  * findAllByUser: gets all the likes that the user has liked
  * findAllLikesRecieved: gets all the likes that the user has recieved
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
    return LikeModel.findOne({_id: likeId}).populate(['post', 'userPost', 'userLike']); //TODO: how this work
  }

  /**
   * Find a like by post and userLike
   *
   * @param {string} likeId - The id of the freet to find
   * @return {Promise<HydratedDocument<Like>> | Promise<null> } - The freet with the given freetId, if any
   */
   static async findOneByPostAndUserId(postId: Types.ObjectId | string, userId: Types.ObjectId | string): Promise<HydratedDocument<Like>> {
    const post = await FreetCollection.findOne(postId);
    const userLike = await UserCollection.findOneByUserId(userId);
    return LikeModel.findOne({post: post, userLike: userLike}).populate(['post', 'userPost', 'userLike']); //TODO: how this work
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
    console.log('addOne');
    // const freetObject = await FreetModel.findOne({_id: freetId});
    const freetObject = await FreetCollection.findOne(freetId);
    console.log('addOne2');
    console.log(freetObject.content);
    const userPost = await UserCollection.findOneByUserId(freetObject.authorId);
    console.log('addOne3');
    console.log(userPost.username as string);
    const userLike = await UserCollection.findOneByUserId(userId);
    console.log('addOne4');
    console.log(userLike.username as string);
    const like = new LikeModel({post: freetObject, userPost: userPost, userLike: userLike, dateLiked: dateLiked});
    console.log('addOne5');
    await like.save(); // Saves user to MongoDB
    console.log('addOne6');
    return like.populate(['post', 'userPost','userLike']); //TODO: help understanding this
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
    return LikeModel.find({post: post}).populate(['post', 'userPost','userLike']); //TODO: is this the right populate
  }

  /**
   * Get all the posts that a user has liked
   *
   * @param {string} userId
   * @return {Promise<HydratedDocument<Freet>[]>} - An array of all of the freets
   */
   static async findAllByUser(userId: Types.ObjectId | string): Promise<Array<HydratedDocument<Like>>> {
    const user = await UserCollection.findOneByUserId(userId);
    return LikeModel.find({userLike: user}).populate(['post, userPost,userLike']); 
  }

  /**
   * Get all the likes that the user has recieved
   *
   * @param {string} userId
   * @return {Promise<HydratedDocument<Freet>[]>} - An array of all of the freets
   */
   static async findAllLikesRecieved(userId: Types.ObjectId | string): Promise<Array<HydratedDocument<Like>>> {
    const user = await UserCollection.findOneByUserId(userId);
    const freets = await FreetCollection.findAllByUsername(user.username);
    return LikeModel.find({userPost: freets}).populate(['post', 'userPost','userLike']); //TODO: check if this is right
  }

}

export default LikeCollection;
