import type {HydratedDocument} from 'mongoose';
import moment from 'moment';
import type {Adjustfeed} from '../adjustfeed/model';

// Update this if you add a property to the Freet type!
type AdjustfeedResponse = {
  user: string;
  categories: Array<string>;
  // politics: string;
  // entertainment: string;
  // sports: string;
  // news: string;
};

/**
 * @param {HydratedDocument<Adjustfeed>} Adjustfeed - A Adjustfeed
 * @returns {AdjustfeedResponse} - The Adjustfeed object formatted for the frontend
 */
const constructAdjustfeedResponse = (adjustfeed: HydratedDocument<Adjustfeed>): AdjustfeedResponse => {
  const adjustfeedCopy: Adjustfeed = {
    ...adjustfeed.toObject({
      versionKey: false 
    })
  };
  let categories = new Array<string>();
  if (adjustfeedCopy.politics){categories.push('politics')};
  if (adjustfeedCopy.entertainment){categories.push('entertainment')};
  if (adjustfeedCopy.sports){categories.push('sports')};
  if (adjustfeedCopy.news){categories.push('news')};

  return {
    user: adjustfeedCopy.user.username,
    categories: categories,
  };
};

export {
  constructAdjustfeedResponse
};
