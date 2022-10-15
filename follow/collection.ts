import type {HydratedDocument, Types} from 'mongoose';
import type {Follow} from './model';
import FollowModel from './model';

import type {User} from '../user/model'; //TODO: do I need this?
import UserCollection from '../user/collection';

/**
 * This file contains a class with functionality to interact with users stored
 * in MongoDB, including adding, finding, updating, and deleting. Feel free to add
 * additional operations in this file.
 *
 * Note: HydratedDocument<Following> is the output of the FollowingModel() constructor,
 * and contains all the information in User. https://mongoosejs.com/docs/typescript.html
 */
class FollowCollection {
  /**
   * Follow a user
   *
   * @param {string} followerId - The user following 
   * @param {string} followedId - The user getting followed
   * @return {Promise<HydratedDocument<Follow>>} - The new follow
   * 
   * functions: 
   * followOne
   * findOne
   * findAll - returns all follow relationships
   * unfollowOne
   * unfollowAll - unfollows everyone the user is following
   * unfollowUser - everyone unfollows the user
   * findAllFollowersbyUsername
   * findAllFollowingbyUsername
   */
  
  static async followOne(follower: Types.ObjectId | string, followed: Types.ObjectId | string): Promise<HydratedDocument<Follow>> {
    const dateFollowed = new Date();

    const follow = new FollowModel({follower, followed, dateFollowed});
    await follow.save(); // Saves user to MongoDB
    return follow;
  }

  /**
   * Find a follow by followId
   *
   * @param {string} followId - The id of the freet to find
   * @return {Promise<HydratedDocument<Freet>> | Promise<null> } - The freet with the given freetId, if any
   */
   static async findOne(followId: Types.ObjectId | string): Promise<HydratedDocument<Follow>> {
    return FollowModel.findOne({_id: followId}).populate('authorId');
  }

  /**
   * Get all the follows in the database
   *
   * @return {Promise<HydratedDocument<Follow>[]>} - An array of all of the freets
   */
   static async findAll(): Promise<Array<HydratedDocument<Follow>>> {
    // Retrieves freets and sorts them from most to least recent
    return FollowModel.find({}).sort({dateFollowed: -1}).populate('authorId'); //TODO: what does the populate authorId mean
  }

  /**
   * Unfollow a user with given userId
   *
   * @param {string} follower - The user following 
   * @param {string} followed - The user getting unfollowed
   * @return {Promise<HydratedDocument<User>> | Promise<null>} - The user with the given username, if any
   */

   static async unfollowOne(follower: Types.ObjectId | string, followed: Types.ObjectId | string): Promise<boolean> {
    const follow = await FollowModel.deleteOne({_follower: follower, _followed: followed});
    return follow !== null;
  }


  /**
   * Unfollow everyone user is following 
   *
   * @param {string} userId - The user who unfollowers everyone they are following
   * @return {Promise<Boolean>} - true if the user has unfollowed everyone, false otherwise
   */

   static async unfollowAll(userId: Types.ObjectId | string): Promise<void> {
    await FollowModel.deleteMany({_follower: userId}); //TODO
  }

  /**
   * Everyone unfollow this user
   *
   * @param {string} userId - The user who unfollowers everyone they are following
   * @return {Promise<Boolean>} - true if the user has unfollowed everyone, false otherwise
   */

   static async unfollowUser(userId: Types.ObjectId | string): Promise<void> {
    await FollowModel.deleteMany({_following: userId}); //TODO
  }

  /**
   * Get all the follows where the user is followed 
   *
   * @param {string} username - The username of the user 
   * @return {Promise<HydratedDocument<User>[]>} - An array of all of the users following them
   */
   static async findAllFollowersByUsername(username: string): Promise<Array<HydratedDocument<Follow>>> {
    const user = await UserCollection.findOneByUsername(username); //TODO
    return FollowModel.find({followedId: user._id}).populate('followedId');
  }
  
  /**
   * Getall the follows where the user is the follower
   *
   * @param {string} username - The username of the user 
   * @return {Promise<HydratedDocument<User>[]>} - An array of all of the users following them
   */
   static async findAllFollowingsByUsername(username: string): Promise<Array<HydratedDocument<Follow>>> {
    const user = await UserCollection.findOneByUsername(username); //TODO
    return FollowModel.find({followerId: user._id}).populate('followerId');
  }

}

export default FollowCollection;
