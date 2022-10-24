import type {NextFunction, Request, Response} from 'express';
import express from 'express';
import * as userValidator from '../user/middleware';
import * as util from './util';
import UserCollection from '../user/collection';
import AdjustfeedCollection from './collection';
import { Adjustfeed } from './model';

const router = express.Router();

/**
 * Get the feed breakdown by username
 *
 * @name GET /api/adjustfeed?userid=id
 *
 * @return {[AdjustfeedResponse]} - A list of all the freets sorted in descending
 *                      order by date modified
 */
router.get(
  '/',
  [
    userValidator.isUserLoggedIn,
    //TODO maybe: ensure they have an adjustfeed
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserCollection.findOneByUsername(req.body.username as string);
    const adjustfeed = await AdjustfeedCollection.findOneByUserId(user._id);
    const response = util.constructAdjustfeedResponse(adjustfeed); 
    res.status(200).json(response); 
  }
);

export {router as credibilityRouter};