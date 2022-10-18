import type {Request, Response, NextFunction} from 'express';
import {Types} from 'mongoose';
import UserCollection from '../user/collection';
import FollowCollection from './collection';

/**
 * Checks if a follow with followId is req.params exists
 */
const isFollowExists = async (req: Request, res: Response, next: NextFunction) => {
  const currentUser = await UserCollection.findOneByUserId(req.session.userId);
  const followedUser = await UserCollection.findOneByUsername(req.body.username);
  const follow = await FollowCollection.findOne(currentUser._id, followedUser._id);
  if (!follow) {
    res.status(404).json({
      error: {
        followNotFound: `You are not following this user. You cannot unfollow.`
      }
    });
    return;
  }

  next();
};


/**
 * Checks that the follow does not exist
 */
const isFollowNotExists = async (req: Request, res: Response, next: NextFunction) => {
  const currentUser = await UserCollection.findOneByUserId(req.session.userId);
  const followedUser = await UserCollection.findOneByUsername(req.body.username);
  const follow = await FollowCollection.findOne(currentUser._id, followedUser._id);
  if (follow) {
    res.status(404).json({
      error: {
        followNotFound: `You are already following this user. You cannot follow.`
      }
    });
    return;
  }

  next();
};

/**
 * Checks that the user they are trying to follow exists
 */
 const isFollowedUserExists = async (req: Request, res: Response, next: NextFunction) => {
  const follow = await UserCollection.findOneByUsername(req.body.username as string); //TODO: should this be by ID or username
  if (!follow) {
    res.status(404).json({
      error: {
        followNotFound: `The user you are trying to follow does not exist.`
      }
    });
    return;
  }

  next();
};

export {
  isFollowExists,
  isFollowNotExists,
  isFollowedUserExists,
};
