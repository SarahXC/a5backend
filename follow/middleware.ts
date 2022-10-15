import type {Request, Response, NextFunction} from 'express';
import {Types} from 'mongoose';
import UserCollection from 'user/collection';
import FollowCollection from '../follow/collection';

/**
 * Checks if a follow with followId is req.params exists
 */
const isFollowExists = async (req: Request, res: Response, next: NextFunction) => {
  const follow = await FollowCollection.findOne(req.params.followId);
  if (!follow) {
    res.status(404).json({
      error: {
        freetNotFound: `You are not following this user. You cannot unfollow.`
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
  const follow = await FollowCollection.findOne(req.params.followId);
  if (!follow) {
    res.status(404).json({
      error: {
        freetNotFound: `You are not following this user. You cannot unfollow.`
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
  const follow = await UserCollection.findOneByUserId(req.params.userId); //TODO: should this be by ID or username
  if (!follow) {
    res.status(404).json({
      error: {
        freetNotFound: `The user you are trying to follow does not exist.`
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