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
 * Get all the users who have liked the post
 *
 */

router.get(
  '/post',
  [
    likeValidator.isPostExist
  ], 
  async (req: Request, res: Response, next: NextFunction) => {
    const allUsers = await LikeCollection.findAllByFreet(req.params.freedId);
    const response = allUsers.map(util.constructLikeResponse);
    res.status(200).json({
      message: 'These users have liked the post:',
      followings: response
    });
  },
);

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
