import type {Request, Response, NextFunction} from 'express';
import {Types} from 'mongoose';
import UserCollection from '../user/collection';
import TagCollection from './collection';
import TagModel from './model';

/**
 * Checks that the user submited the right number of parameters
 */
 const isValidTag = async (req: Request, res: Response, next: NextFunction) => {
  const categories = ['politics', 'sports', 'entertainment', 'news'];

  if(categories.indexOf(req.query.category as string) < 0) {
    res.status(404).json({
      error: {
        userNotFound: `${req.query.category as string} is not a valid tag.`
      }
    });
    return;
  } 

  next();
};


export {
  isValidTag
};
