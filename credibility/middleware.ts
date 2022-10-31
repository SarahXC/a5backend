import type {Request, Response, NextFunction} from 'express';
import {Types} from 'mongoose';
import UserCollection from '../user/collection';
import CredibilityCollection from './collection';
import CredibilityModel from './model';

/**
 * Checks that the user submited the right number of parameters
 */
 const isValidUsername = async (req: Request, res: Response, next: NextFunction) => {
  const user = await UserCollection.findOneByUsername(req.query.username as string);
  if (!user) {
    res.status(404).json({
      error: {
        userNotFound: `User with username ${req.query.username as string} does not exist.`
      }
    });
    return;
  }

  next();
};

/**
 * Checks if a follow with followId is req.params exists
 */
 const hasCredibilityScore = async (req: Request, res: Response, next: NextFunction) => {
  const user = await UserCollection.findOneByUsername(req.query.username as string);
  const credibility = await CredibilityModel.findOne({user: user});
  if (!credibility) {
    res.status(405).json({
      error: {
        followNotFound: `This person does not have a credibility score.`
      }
    });
    return;
  }

  next();
};

export {
  isValidUsername, //ensures they username exists
  hasCredibilityScore,
};
