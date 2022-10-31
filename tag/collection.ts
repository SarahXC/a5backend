import type {HydratedDocument, Types} from 'mongoose';
import type {Tag} from './model';
import TagModel from './model';
import e from 'express';
import FreetCollection from '../freet/collection';

/**
 * addOne
 * updateOne
 * findOne
 * deleteOne
 */

class TagCollection {

  /**
   * Add a Tag to the collection
   *
   * @param {string} postId - The id of post
   * @return {Promise<HydratedDocument<Credibility>>} - The newly created Tag 
   */
  static async addOne(postId: Types.ObjectId | string, category: string): Promise<HydratedDocument<Tag>> {
    const post = await FreetCollection.findOne(postId);
    const tag = new TagModel({
      post: post,
      category: category,
    });
    await tag.save(); 
    return tag.populate('post'); 
  }


  /**
   * Update a Tag by postId
   *
   * @param {string} postId - The id of the user to find
   * @return {Promise<HydratedDocument<Credibility>> | Promise<null> } - The Credibility with the given userId, if any
   */
  static async updateOne(postId: Types.ObjectId | string, newCategory: string): Promise<HydratedDocument<Tag>> {
    const tag = await TagCollection.findOne(postId);
    tag.category = newCategory; 

    await tag.save();
    return tag.populate('post'); //populate for things with Schema.Type and objects 
  }

  /**
   * Get a post's tag by postId
   *
   * @param {string} postId - The id of the user to find
   * @return {Promise<HydratedDocument<Credibility>> | Promise<null> }
   */
   static async findOne(postId: Types.ObjectId | string): Promise<HydratedDocument<Tag>> {
    const post = await FreetCollection.findOne(postId);
    const tag = await TagModel.findOne({post: post}); 
    return tag.populate('post');
  }

  /**
   * Delete a user's tag by postId
   *
   * @param {string} postId - The id of the post to find
   * @return {Promise<HydratedDocument<Tag>> | Promise<null> }
   */
   static async deleteOne(postId: Types.ObjectId | string): Promise<boolean>  {
    const post = await FreetCollection.findOne(postId);
    const tag = await TagModel.deleteOne({post: post});
    return tag != null; 
  }

}

export default TagCollection;
