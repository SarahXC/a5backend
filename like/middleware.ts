import type {Request, Response, NextFunction} from 'express';
import {Types} from 'mongoose';
import UserCollection from '../user/collection';
import FreetCollection from '../freet/collection';
import LikeCollection from './collection';

/**
 * Checks that the post you're trying to like exists, by postId
 */
 const isPostExist = async (req: Request, res: Response, next: NextFunction) => {
  const post = await FreetCollection.findOne(req.body.postId);
  if (!post) {
    res.status(404).json({
      error: {
        followNotFound: `You cannot like this post. This post does not exist.`
      }
    });
    return;
  }

  next();
};

/**
 * Checks that you are not liking your own post
 */
 const isPostNotSelf = async (req: Request, res: Response, next: NextFunction) => {
  const post = await FreetCollection.findOne(req.body.postId);
  const postUser = await UserCollection.findOneByUserId(post.authorId);
  const currentUser = await UserCollection.findOneByUserId(req.session.userId);
  if (currentUser.username == postUser.username) {
    res.status(405).json({
      error: {
        followNotFound: `You cannot like your own post, silly!`
      }
    });
    return;
  }

  next();
};

/**
 * Checks that you haven't already liked the post
 */
 const isLikeExists = async (req: Request, res: Response, next: NextFunction) => {
  const currentUser = await UserCollection.findOneByUserId(req.session.userId);
  const post = await FreetCollection.findOne(req.body.postId);
  const like = await LikeCollection.findOneByPostAndUserId(post._id, currentUser._id); 
  if (!like) {
    res.status(404).json({
      error: {
        followNotFound: `You already liked this post. You cannot like it again.`
      }
    });
    return;
  }

  next();
};

/**
 * Checks that you haven't already liked the post
 */
 const isLikeNotExists = async (req: Request, res: Response, next: NextFunction) => {
  const currentUser = await UserCollection.findOneByUserId(req.session.userId);
  const post = await FreetCollection.findOne(req.body.postId);
  const like = await LikeCollection.findOneByPostAndUserId(post._id, currentUser._id); 
  if (like) {
    res.status(404).json({
      error: {
        followNotFound: `You can't unlike this post. You never liked it.`
      }
    });
    return;
  }

  next();
};

export {
  isPostExist,
  isPostNotSelf, //cannot like your own posts
  isLikeExists,
  isLikeNotExists,
};
