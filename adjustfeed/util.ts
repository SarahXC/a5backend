import type {HydratedDocument} from 'mongoose';
import moment from 'moment';
import type {Adjustfeed} from '../adjustfeed/model';

// Update this if you add a property to the Freet type!
type AdjustfeedResponse = {
  user: string;
  liberal: number;
  conservative: number;
  entertainment: number;
  sports: number;
  news: number;
};

/**
 * @param {HydratedDocument<Adjustfeed>} Adjustfeed - A Adjustfeed
 * @returns {AdjustfeedResponse} - The Adjustfeed object formatted for the frontend
 */
const constructAdjustfeedResponse = (adjustfeed: HydratedDocument<Adjustfeed>): AdjustfeedResponse => {
  const adjustfeedCopy: Adjustfeed = {
    ...adjustfeed.toObject({
      versionKey: false // Cosmetics; prevents returning of __v property
    })
  };
  console.log(adjustfeedCopy);
  return {
    user: adjustfeedCopy.user.username,
    liberal: adjustfeedCopy.liberalPolitics,
    conservative: adjustfeedCopy.conservativePolitics,
    entertainment: adjustfeedCopy.entertainment,
    sports: adjustfeedCopy.sports,
    news: adjustfeedCopy.news,
  };
};

export {
  constructAdjustfeedResponse
};
