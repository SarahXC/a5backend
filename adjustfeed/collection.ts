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
   * Add an Adjustfeed to the collection
   *
   * @param {string} userId - The id of user
   * @param {number} numCategories - numberOfCurrentCategories
   * @return {Promise<HydratedDocument<Adjustfeed>>} - The newly created credibility 
   */
  static async addOneByUserId(userId: Types.ObjectId | string, content: string): Promise<HydratedDocument<Adjustfeed>> {
    const user = await UserCollection.findOneByUserId(userId);
    const credibility = new AdjustfeedModel({
      user: user,
      percents: [20,20,20,20,20], //initialize to equal weights 
    });
    await credibility.save(); 
    return credibility.populate('user'); 
  }


  /**
   * Update a feed by userId
   *
   * @param {string} userId - The id of the user to find
   * @return {Promise<HydratedDocument<Adjustfeed>> | Promise<null> } - The Adjustfeed with the given userId, if any
   */
  static async updateOneByUserId(userId: Types.ObjectId, percents: Array<number>): Promise<HydratedDocument<Adjustfeed>> {
    const adjustfeed = await AdjustfeedCollection.findOneByUserId(userId);
    adjustfeed.liberalPolitics = percents[0];
    adjustfeed.conservativePolitics = percents[1];
    adjustfeed.entertainment = percents[2];
    adjustfeed.sports = percents[3];
    adjustfeed.news = percents[4];

    await adjustfeed.save();
    return adjustfeed.populate('user'); 
  }

  /**
   * Get a user's Credibility by userId
   *
   * @param {string} userId - The id of the user to find
   * @return {Promise<HydratedDocument<Credibility>> | Promise<null> }
   */
   static async findOneByUserId(userId: Types.ObjectId | string): Promise<HydratedDocument<Adjustfeed>> {
    const user = await UserCollection.findOneByUserId(userId);
    return AdjustfeedModel.findOne({user: user}).populate('user');
  }

  /**
   * Delete a user's Credibility by userId
   *
   * @param {string} userId - The id of the user to find
   * @return {Promise<HydratedDocument<Credibility>> | Promise<null> }
   */
   static async deleteOneByUserId(userId: Types.ObjectId | string): Promise<boolean>  {
    const user = await UserCollection.findOneByUserId(userId);
    const adjustfeed = await AdjustfeedModel.deleteOne({user: user});
    return adjustfeed != null; 
  }

}

export default AdjustfeedCollection;
