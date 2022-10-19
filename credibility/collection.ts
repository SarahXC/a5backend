import type {HydratedDocument, Types} from 'mongoose';
import type {Credibility} from './model';
import CredibilityModel from './model';
import UserCollection from '../user/collection';
import e from 'express';

class CredibilityCollection {

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
    const credibility = new CredibilityModel({
      user: user,
      score: 0,
      canPost: false, 
    });
    await credibility.save(); 
    return credibility.populate('userId');
  }


  /**
   * Update a Credibility by userId
   *
   * @param {string} userId - The id of the user to find
   * @return {Promise<HydratedDocument<Credibility>> | Promise<null> } - The Credibility with the given userId, if any
   */
  static async updateOneByUserId(userId: Types.ObjectId | string, score: number): Promise<HydratedDocument<Credibility>> {
    const credibility = await CredibilityCollection.findOneByUserId(userId);
    credibility.score = score;
    if (score > 10){ //TODO: can you do this in one line
      credibility.canPost = true; 
    }
    else{
      credibility.canPost = false; 
    }
    await credibility.save();
    return credibility.populate('userId');
  }

  /**
   * Get a user's Credibility by userId
   *
   * @param {string} userId - The id of the user to find
   * @return {Promise<HydratedDocument<Credibility>> | Promise<null> }
   */
   static async findOneByUserId(userId: Types.ObjectId | string): Promise<HydratedDocument<Credibility>> {
    const user = await UserCollection.findOneByUserId(userId);
    return CredibilityModel.findOne({user: user}).populate('user');
  }

  /**
   * Delete a user's Credibility by userId
   *
   * @param {string} userId - The id of the user to find
   * @return {Promise<HydratedDocument<Credibility>> | Promise<null> }
   */
   static async deleteOneByUserId(userId: Types.ObjectId | string) {
    const user = await UserCollection.findOneByUserId(userId);
    const credibility = await CredibilityModel.deleteOne({user: user});
    return credibility != null; 
  }

}

export default CredibilityCollection;
