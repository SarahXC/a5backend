import type {NextFunction, Request, Response} from 'express';
import express from 'express';
import LikeCollection from '../like/collection';
import UserCollection from '../user/collection';
import FreetCollection from '../freet/collection';
import * as userValidator from '../user/middleware';
import * as likeValidator from './middleware';
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
    console.log('here3');
    const userId = (req.session.userId as string) ?? ''; 
    const like = await LikeCollection.addOne(req.body.postId, userId); //TODO check this
    console.log('here4');
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
    likeValidator.isLikeExists,
  ],
  async (req: Request, res: Response) => {
    const userId = (req.session.userId as string) ?? ''; 
    console.log(req.body.postId as string);
    const like = await LikeCollection.findOneByPostAndUserId(req.body.postId, userId);
    const unlike = await LikeCollection.deleteOne(like._id); 
    res.status(201).json({
      message: 'You successfully unliked the post.',
    });
  }
);

export {router as likeRouter};
