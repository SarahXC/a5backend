import type {HydratedDocument} from 'mongoose';
import moment from 'moment';
import type {Tag} from './model';
import { Freet } from '../freet/model';

// Update this if you add a property to the Freet type!
type TagResponse = {
  post: Freet;
  category: string;
};

/**
 * @param {HydratedDocument<Tag>} tag - A Tag
 * @returns {TagResponse} - The Credibility object formatted for the frontend
 */
const constructTagResponse = (tag: HydratedDocument<Tag>): TagResponse => {
  const tagCopy: Tag = {
    ...tag.toObject({
      versionKey: false // Cosmetics; prevents returning of __v property
    })
  };
  console.log(tagCopy);
  return {
    post: tagCopy.freetId.toString(), 
    category: tagCopy.category,
  };
};

export {
  constructTagResponse
};
