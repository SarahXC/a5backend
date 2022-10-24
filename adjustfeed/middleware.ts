import type {Request, Response, NextFunction} from 'express';
import {Types} from 'mongoose';
import FreetCollection from '../freet/collection';

/**
 * Checks that the user submited the right number of parameters
 */
 const isValidLength = async (req: Request, res: Response, next: NextFunction) => {
  const numPercents = req.params.percents.length;
  if (numPercents != 5) {
    res.status(404).json({
      error: {
        freetNotFound: `You cannot set your feed to ${req.params.percents}. There must be exactly 5 percents.`
      }
    });
    return;
  }

  next();
};

/**
 * Checks that the %'s sum to 100
 */
 const isSum100 = async (req: Request, res: Response, next: NextFunction) => {
  // const percents: number[] = req.params.percents;
  const percents = [1,2,3,4]
  const percentSum = percents.reduce((accumulator, current) => {
    return accumulator + current;
  }, 0);
  if (percentSum != 100) {
    res.status(404).json({
      error: {
        freetNotFound: `Freet with freet ID ${req.params.freetId} does not exist.`
      }
    });
    return;
  }

  next();
};
export {
  isValidLength, //ensures they submited the right number of parameters
  isSum100, //ensures the %'s sum to 100
};
