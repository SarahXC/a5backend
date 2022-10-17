import type {HydratedDocument} from 'mongoose';
import moment from 'moment';
import type {Follow} from '../follow/model';

// Update this if you add a property to the Freet type!
type FollowResponse = {
  follower: string;
  followed: string;
};

/**
 * Encode a date as an unambiguous string
 *
 * @param {Date} date - A date object
 * @returns {string} - formatted date as string
 */
const formatDate = (date: Date): string => moment(date).format('MMMM Do YYYY, h:mm:ss a');

/**
 * Transform a raw Follow object from the database into an object
 * with all the information needed by the frontend
 *
 * @param {HydratedDocument<Follow>} follow - A follow
 * @returns {FollowResponse} - The follow object formatted for the frontend
 */
const constructFollowResponse = (follow: HydratedDocument<Follow>): FollowResponse => {
  const followCopy: Follow = {
    ...follow.toObject({
      versionKey: false // Cosmetics; prevents returning of __v property
    })
  };
  return {
    follower: followCopy.follower.username, 
    followed: followCopy.followed.username, 
  };
};

export {
  constructFollowResponse
};
