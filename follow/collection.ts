import type {HydratedDocument, Types} from 'mongoose';
import type {Follow} from './model';
import FollowModel from './model';

import type {User} from '../user/model'; 
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
  
  static async followOne(followerId: Types.ObjectId | string, followedId: Types.ObjectId | string): Promise<HydratedDocument<Follow>> {
    const dateFollowed = new Date();
    const follower = await UserCollection.findOneByUserId(followerId);
    const followed = await UserCollection.findOneByUserId(followedId);

    const follow = new FollowModel({follower, followed, dateFollowed});
    await follow.save(); // Saves user to MongoDB
    return follow.populate(['follower','followed']);
  }

  /**
   * Find a follow by followerId and followedId
   *
   * @param {string} followId - The id of the freet to find
   * @return {Promise<HydratedDocument<Freet>> | Promise<null> } - The freet with the given freetId, if any
   */
   static async findOne(followerId: Types.ObjectId | string, followedId: Types.ObjectId | string): Promise<HydratedDocument<Follow>> {
    const follower = await UserCollection.findOneByUserId(followerId);
    const followed = await UserCollection.findOneByUserId(followedId);
    return (await FollowModel.findOne({follower: follower, followed: followed}));
  }

  /**
   * Get all the follows in the database
   *
   * @return {Promise<HydratedDocument<Follow>[]>} - An array of all of the freets
   */
   static async findAll(): Promise<Array<HydratedDocument<Follow>>> {
    // Retrieves freets and sorts them from most to least recent
    return FollowModel.find({}).sort({dateFollowed: -1}); 
  }

  /**
   * Unfollow a user with given userId
   *
   * @param {string} followerId - The ID of the user following 
   * @param {string} followedId - The ID of user getting unfollowed
   * @return {Promise<HydratedDocument<User>> | Promise<null>} - The user with the given username, if any
   */

   static async unfollowOne(followerId: Types.ObjectId | string, followedId: Types.ObjectId | string): Promise<boolean> {
    const follower = await UserCollection.findOneByUserId(followerId);
    const followed = await UserCollection.findOneByUserId(followedId);
    
    const unfollow = await FollowModel.deleteOne({follower: follower, followed: followed});
    return unfollow !== null;
  }


  /**
   * Unfollow everyone user is following 
   *
   * @param {string} userId - The user who unfollowers everyone they are following
   * @return {Promise<Boolean>} - true if the user has unfollowed everyone, false otherwise
   */

   static async unfollowAllbyId(userId: Types.ObjectId | string): Promise<void> {
    const user = await UserCollection.findOneByUserId(userId);
    await FollowModel.deleteMany({follower: user}); //TODO
  }

  /**
   * Everyone unfollow this user
   *
   * @param {string} userId - The user who unfollowers everyone they are following
   * @return {Promise<Boolean>} - true if the user has unfollowed everyone, false otherwise
   */

   static async unfollowUserbyId(userId: Types.ObjectId | string): Promise<void> {
    const user = await UserCollection.findOneByUserId(userId);
    await FollowModel.deleteMany({followed: user}); //TODO
  }

  /**
   * Get all the user's followers 
   *
   * @param {string} userId - The ID of the user 
   * @return {Promise<HydratedDocument<User>[]>} - An array of all of the users following them
   */
   static async findAllFollowersByID(userId: Types.ObjectId | string): Promise<Array<HydratedDocument<Follow>>> {
    const user = await UserCollection.findOneByUserId(userId); //TODO
    return FollowModel.find({followed: user}).populate('follower');
  }
  
  /**
   * Get everyone the user follows
   *
   * @param {string} userId - The ID of the user 
   * @return {Promise<HydratedDocument<User>[]>} - An array of all of the users following them
   */
   static async findAllFollowingsByID(userId: Types.ObjectId | string): Promise<Array<HydratedDocument<Follow>>> {
    const user = await UserCollection.findOneByUserId(userId); //TODO
    return FollowModel.find({follower: user}).populate('followed');
  }

}

export default FollowCollection;
