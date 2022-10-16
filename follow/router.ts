import type {NextFunction, Request, Response} from 'express';
import express from 'express';
import FollowCollection from '../follow/collection';
import UserCollection from '../user/collection';
import * as userValidator from '../user/middleware';
import * as followValidator from '../follow/middleware';
import * as util from './util';

const router = express.Router();

/**
 * Get all the follows
 *
 * @name GET /api/follows
 *
 * @return {FollowResponse[]} - A list of all the follows sorted in descending
 *                      order by date created
 */

router.get(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    // Check if a follower and following query parameter was supplied
    if (req.query.userId !== undefined) {
      next();
      return;
    }

    const allFollows = await FollowCollection.findAll();
    const response = allFollows.map(util.constructFollowResponse);
    res.status(200).json(response);
  },
);

/**
 * Get all the user's follows
 *
 * @name GET /api/follows/following?userId=id
 *
 * @return {FollowResponse[]} - An array of follows that the user is following
 * @throws {400} - If userId is not given
 * @throws {404} - If no user has given userId
 *
 */

router.get(
  '/following', //TODO 
  [
    userValidator.isAuthorExists
  ], 
  async (req: Request, res: Response, next: NextFunction) => {

    if (req.query.userId !== undefined) {
      next();
      return;
    }
    const user = await FollowCollection.findAllFollowingsByUsername(req.query.userId as string);
    const response = user.map(util.constructFollowResponse);
    res.status(200).json(response);
  }
);

/**
 * Gets all the follows that follow a user
 *
 * @name GET /api/follows/followers?userId=id
 *
 * @return {FollowResponse[]} - An array of follows that follow a user
 * @throws {400} - If userId is not given
 * @throws {404} - If no user has given userId
 *
 */

 router.get(
  '/followers', //TODO 
  [
    userValidator.isAuthorExists
  ], 
  async (req: Request, res: Response, next: NextFunction) => {

    if (req.query.userId !== undefined) {
      next();
      return;
    }
    const user = await FollowCollection.findAllFollowersByUsername(req.query.userId as string);
    const response = user.map(util.constructFollowResponse);
    res.status(200).json(response);
  }
);

/**
 * Create a new follow.
 *
 * @name POST /api/follows
 *
 * @param {string} followed - who the current user wants to follow
 * @return {FollowResponse} - The created follow
 * @throws {403} - If the user is not logged in
 * @throws {400} - If the follow already exists
 * @throws {413} - If the followed user does not exist
 */
router.post(
  '/', //TODO: check this
  [
    userValidator.isUserLoggedIn,
    followValidator.isFollowedUserExists,
    followValidator.isFollowExists,
  ],
  async (req: Request, res: Response) => {
    const followed = await UserCollection.findOneByUsername(req.params.followed);//get the Id of the username
    const follow = await FollowCollection.followOne(req.session.userId, followed._id); //TODO: req.body or req.params
    res.status(201).json({
      message: 'You successfully followed the user.',
      follow: util.constructFollowResponse(follow)
    });
  }
);

/**
 * Delete a follow
 *
 * @name DELETE /api/follows/:id
 *
 * @return {string} - A success message
 * @throws {403} - If the user is not logged in
 * @throws {400} - If the follow doesn't already exist
 */

router.delete(
  '/:followedUsername?', // the username of the user to unfollow TODO: check this
  [
    userValidator.isUserLoggedIn,
    followValidator.isFollowExists, //TODO: check this, how do I pass anything in?
  ],
  async (req: Request, res: Response) => {
    const followed = await UserCollection.findOneByUsername(req.params.followedUsername); //user object of the person to unfollow
    await FollowCollection.unfollowOne(req.session.userId, followed._id); //TODO: req.body or req.params
    res.status(200).json({
      message: 'You successfully unfollowed the user.'
    });
  }
);

export {router as followRouter};
