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
  static async addOneByUserId(userId: Types.ObjectId | string): Promise<HydratedDocument<Adjustfeed>> {
    const user = await UserCollection.findOneByUserId(userId);
    const adjustfeed = new AdjustfeedModel({
      user: user,
      politics: true,
      entertainment: true,
      sports: true, 
      news: true,
    });
    await adjustfeed.save(); 
    return adjustfeed.populate('user'); 
  }


  /**
   * Update a feed by userId
   *
   * @param {string} userId - The id of the user to find
   * @return {Promise<HydratedDocument<Adjustfeed>> | Promise<null> } - The Adjustfeed with the given userId, if any
   */
  static async updateOneByUserId(userId: Types.ObjectId | string, politics: boolean, entertainment: boolean, sports: boolean, news: boolean): Promise<HydratedDocument<Adjustfeed>> {
    console.log(politics.toString());
    const newFeed = await AdjustfeedCollection.findOneByUserId(userId);
    newFeed.politics = politics;
    newFeed.entertainment = entertainment;
    newFeed.sports = sports;
    newFeed.news = news;

    await newFeed.save();
    return newFeed.populate('user'); 
  }

  /**
   * Get a user's feed breakdown by userId
   *
   * @param {string} userId - The id of the user to find
   * @return {Promise<HydratedDocument<Adjustfeed>> | Promise<null> }
   */
   static async findOneByUserId(userId: Types.ObjectId | string): Promise<HydratedDocument<Adjustfeed>> {
    const user = await UserCollection.findOneByUserId(userId);
    return AdjustfeedModel.findOne({user: user}).populate('user');
  }

  /**
   * Delete a user's feed breakdown by userId
   *
   * @param {string} userId - The id of the user to find
   * @return {Promise<HydratedDocument<Adjustfeed>> | Promise<null> }
   */
   static async deleteOneByUserId(userId: Types.ObjectId | string): Promise<boolean>  {
    const user = await UserCollection.findOneByUserId(userId);
    const adjustfeed = await AdjustfeedModel.deleteOne({user: user});
    return adjustfeed != null; 
  }

}

export default AdjustfeedCollection;
