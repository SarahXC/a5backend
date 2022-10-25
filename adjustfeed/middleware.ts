import type {Request, Response, NextFunction} from 'express';
import {Types} from 'mongoose';
import FreetCollection from '../freet/collection';
import UserCollection from '../user/collection';

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

export {
  isValidUsername,
};
