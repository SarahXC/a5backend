import type {NextFunction, Request, Response} from 'express';
import express from 'express';
import LikeCollection from '../like/collection';
import UserCollection from '../user/collection';
import FreetCollection from 'freet/collection';
import * as userValidator from '../user/middleware';
import * as likeValidator from '../like/middleware';
import * as util from './util';

const router = express.Router();

/**
 * Create a new like
 */

 router.post(
  '/',
  [
    userValidator.isUserLoggedIn,
    likeValidator.isPostExist,
    likeValidator.isPostNotSelf,
    likeValidator.isLikeNotExists,
  ],
  async (req: Request, res: Response) => {
    const userId = (req.session.userId as string) ?? ''; 
    const like = await LikeCollection.addOne(req.body.freetId, userId); //TODO check this
    res.status(201).json({
      message: 'You successfully liked the post.',
      like: util.constructLikeResponse(like)
    });
  }
);

/**
 * Delete a like
 */

 router.delete(
  '/',
  [
    userValidator.isUserLoggedIn,
    likeValidator.isPostExist,
    likeValidator.isPostNotSelf,
    likeValidator.isLikeNotExists,
  ],
  async (req: Request, res: Response) => {
    const userId = (req.session.userId as string) ?? ''; 
    const like = await LikeCollection.findOneByPostAndUserId(req.body.freetId, userId);
    const unlike = await LikeCollection.deleteOne(like._id); 
    res.status(201).json({
      message: 'You successfully unliked the post.',
    });
  }
);

export {router as likeRouter};
