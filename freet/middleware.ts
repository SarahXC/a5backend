import type {Request, Response, NextFunction} from 'express';
import {Types} from 'mongoose';
import FreetCollection from '../freet/collection';
import UserCollection from '../user/collection';
import CredibilityCollection from '../credibility/collection';

/**
 * Checks that the user has enough credibility to post
 */
 const isEnoughCredibility = async (req: Request, res: Response, next: NextFunction) => {
  const currentUser = await UserCollection.findOneByUserId(req.session.userId);
  const credibility = await CredibilityCollection.findOneByUserId(req.session.userId);
  if (!credibility.canPost) { //if not enough credibility
    res.status(405).json({
      error: {
        freetNotFound: `You do not have enough credibility points to post.`
      }
    });
    return;
  }

  next();
};

/**
 * Checks that the tag is correct
 */
 const isValidTag = async (req: Request, res: Response, next: NextFunction) => {
  const categories = ['politics', 'sports', 'entertainment', 'news'];

  if(categories.indexOf(req.body.category) < 0) {
    res.status(404).json({
      error: {
        userNotFound: `${req.body.category} is not a valid tag. The valid tags are politics, sports, entertainment, and news.`
      }
    });
    return;
  } 

  next();
};


/**
 * Checks if a freet with freetId is req.params exists
 */
const isFreetExists = async (req: Request, res: Response, next: NextFunction) => {
  const validFormat = Types.ObjectId.isValid(req.params.freetId);
  const freet = validFormat ? await FreetCollection.findOne(req.params.freetId) : '';
  if (!freet) {
    res.status(404).json({
      error: {
        freetNotFound: `Freet with freet ID ${req.params.freetId} does not exist.`
      }
    });
    return;
  }

  next();
};

/**
 * Checks if the content of the freet in req.body is valid, i.e not a stream of empty
 * spaces and not more than 140 characters
 */
const isValidFreetContent = (req: Request, res: Response, next: NextFunction) => {
  const {content} = req.body as {content: string};
  if (!content.trim()) {
    res.status(400).json({
      error: 'Freet content must be at least one character long.'
    });
    return;
  }

  if (content.length > 140) {
    res.status(413).json({
      error: 'Freet content must be no more than 140 characters.'
    });
    return;
  }

  next();
};

/**
 * Checks if the current user is the author of the freet whose freetId is in req.params
 */
const isValidFreetModifier = async (req: Request, res: Response, next: NextFunction) => {
  const freet = await FreetCollection.findOne(req.params.freetId);
  const userId = freet.authorId._id;
  if (req.session.userId !== userId.toString()) {
    res.status(403).json({
      error: 'Cannot modify other users\' freets.'
    });
    return;
  }

  next();
};

export {
  isEnoughCredibility,
  isValidTag,
  isValidFreetContent,
  isFreetExists,
  isValidFreetModifier
};
