import type {HydratedDocument} from 'mongoose';
import moment from 'moment';
import type {Credibility} from '../credibility/model';

// Update this if you add a property to the Freet type!
type CredibilityResponse = {
  user: string;
  score: number;
  canPost: string;
};

/**
 * @param {HydratedDocument<Credibility>} Credibility - A Credibility
 * @returns {CredibilityResponse} - The Credibility object formatted for the frontend
 */
const constructCredibilityResponse = (credibility: HydratedDocument<Credibility>): CredibilityResponse => {
  const credibilityCopy: Credibility = {
    ...credibility.toObject({
      versionKey: false // Cosmetics; prevents returning of __v property
    })
  };
  return {
    user: credibilityCopy.user.username, 
    score: credibilityCopy.score,
    canPost: credibilityCopy.canPost.toString()
  };
};

export {
  constructCredibilityResponse
};
