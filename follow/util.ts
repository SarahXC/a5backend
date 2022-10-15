import type {HydratedDocument} from 'mongoose';
import moment from 'moment';
import type {Follow, PopulatedFollow} from '../follow/model';

// Update this if you add a property to the Freet type!
type FollowResponse = {
  _id: string;
  follower: string;
  followed: string;
  dateFollowed: string;
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
  const followCopy: PopulatedFollow = {
    ...follow.toObject({
      versionKey: false // Cosmetics; prevents returning of __v property
    })
  };
  delete followCopy.follower;
  return {
    ...followCopy,
    _id: followCopy._id.toString(),
    follower: followCopy.follower.toString(), //TODO
    followed: followCopy.followed.toString(), //TODO
    dateFollowed: formatDate(follow.dateFollowed),
  };
};

export {
  constructFollowResponse
};
