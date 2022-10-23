import type {HydratedDocument, Types} from 'mongoose';
import type {Adjustfeed} from './model';
import AdjustfeedModel from './model';
import UserCollection from '../user/collection';
import e from 'express';

/**
 * addOneByUserId
 * updateOneByUserId
 * findOneByUserId
 * deleteOneByUserId
 */


 class AdjustfeedCollection {

  /**
   * Add a Credibility to the collection
   *
   * @param {string} userId - The id of user
   * @param {number} score - their credibility score
   * @param {boolean} canPost - whether they have enough fritters to post 
   * @return {Promise<HydratedDocument<Credibility>>} - The newly created credibility 
   */
  static async addOneByUserId(userId: Types.ObjectId | string, content: string): Promise<HydratedDocument<Credibility>> {
    const user = await UserCollection.findOneByUserId(userId);
    const credibility = new AdjustfeedModel({
      user: user,
      score: 0,
      canPost: false, 
    });
    await credibility.save(); 
    return credibility.populate('user'); 
  }


  /**
   * Update a Credibility by userId
   *
   * @param {string} userId - The id of the user to find
   * @return {Promise<HydratedDocument<Credibility>> | Promise<null> } - The Credibility with the given userId, if any
   */
  static async updateOneByUserId(userId: Types.ObjectId): Promise<HydratedDocument<Credibility>> {
    const credibility = await CredibilityCollection.findOneByUserId(userId);
    const likes = await LikeCollection.findAllLikesRecieved(userId);
    const numLikes = likes.length;
    const followers = await FollowCollection.findAllFollowersByID(userId);
    const numFollowers = followers.length; //TODO: check

    credibility.score =  numLikes + 2* numFollowers; //TODO: can add comments
    credibility.canPost = credibility.score > 10 ? true : false;
    await credibility.save();
    return credibility.populate('user'); //populate for things with Schema.Type and objects 
  }

  /**
   * Get a user's Credibility by userId
   *
   * @param {string} userId - The id of the user to find
   * @return {Promise<HydratedDocument<Credibility>> | Promise<null> }
   */
   static async findOneByUserId(userId: Types.ObjectId | string): Promise<HydratedDocument<Credibility>> {
    // const user = await UserCollection.findOneByUserId(userId);
    // return CredibilityModel.findOne({user: user}).populate('user');
    //make sure it's updated
    const credibility = await CredibilityCollection.updateOneByUserId(userId as Types.ObjectId); //TODO: check can I do this
    return credibility.populate('user');
  }

  /**
   * Delete a user's Credibility by userId
   *
   * @param {string} userId - The id of the user to find
   * @return {Promise<HydratedDocument<Credibility>> | Promise<null> }
   */
   static async deleteOneByUserId(userId: Types.ObjectId | string): Promise<boolean>  {
    const user = await UserCollection.findOneByUserId(userId);
    const credibility = await CredibilityModel.deleteOne({user: user});
    return credibility != null; 
  }

}

export default AdjustfeedCollection;
