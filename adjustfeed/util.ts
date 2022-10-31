import type {HydratedDocument} from 'mongoose';
import moment from 'moment';
import type {Adjustfeed} from '../adjustfeed/model';

// Update this if you add a property to the Freet type!
type AdjustfeedResponse = {
  user: string;
  politics: string;
  entertainment: string;
  sports: string;
  news: string;
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
  return {
    user: adjustfeedCopy.user.username,
    politics: adjustfeedCopy.politics.toString(),
    entertainment: adjustfeedCopy.entertainment.toString(),
    sports: adjustfeedCopy.sports.toString(),
    news: adjustfeedCopy.news.toString(),
  };
};

export {
  constructAdjustfeedResponse
};
