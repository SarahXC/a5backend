import type {NextFunction, Request, Response} from 'express';
import express from 'express';
import * as userValidator from '../user/middleware';
import * as freetValidator from '../freet/middleware';
import * as tagValidator from './middleware';

import * as util from './util';
import CredibilityCollection from './collection';
import UserCollection from '../user/collection';
import FreetCollection from '../freet/collection';
import TagCollection from './collection';

const router = express.Router();

/**
 * Get the post's tag by freetId
 *
 * @name GET /api/tags?postid=id
 *
 * @return {[TagResponse]} - A list of all the freets sorted in descending
 *                      order by date modified
 */
router.get(
  '/',
  [
    userValidator.isUserLoggedIn,
    freetValidator.isFreetExists,
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    const tag = await TagCollection.findOne(req.query.freetId as string);
    const response = util.constructTagResponse(tag); 
    res.status(200).json(response); //TODO 
  }
);

/**
 * Modify your tag
 *
 * @name PUT /api/tags/
 *
*/
router.put(
  '/',
  [
    userValidator.isUserLoggedIn,
    freetValidator.isFreetExists,
    tagValidator. 
  ],
  async (req: Request, res: Response) => {
    console.log('inside router');
    const userId = (req.session.userId as string) ?? '';
    console.log(req.body.politics);
    const politics = (req.body.politics.toLowerCase() as string == 'true') ? true : false;
    const entertainment = (req.body.entertainment.toLowerCase() as string == 'true') ? true : false;
    const sports = (req.body.sports.toLowerCase() as string == 'true') ? true : false;
    const news = (req.body.news.toLowerCase() as string == 'true') ? true : false;
    const adjustfeed = await AdjustfeedCollection.updateOneByUserId(userId, politics, entertainment, sports, news);
    res.status(200).json({
      message: 'Your feed was updated successfully.',
      freet: util.constructAdjustfeedResponse(adjustfeed)
    });
  }
);

export {router as tagRouter};