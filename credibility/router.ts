import type {NextFunction, Request, Response} from 'express';
import express from 'express';
import * as userValidator from '../user/middleware';
import * as util from './util';
import CredibilityCollection from './collection';

const router = express.Router();

/**
 * Get the user's Credibility Score 
 *
 * @name GET /api/credibility
 *
 * @return {[CredibilityResponse]} - A list of all the freets sorted in descending
 *                      order by date modified
 */
router.get(
  '/',
  [
    userValidator.isUserLoggedIn
  ],
  async (req: Request, res: Response) => {
    const userId = (req.session.userId as string) ?? '';
    const credibility = await CredibilityCollection.findOneByUserId(userId);
    // const response = credibility.map(util.constructCredibilityResponse);
    // res.status(200).json(response);
  }
);

export {router as credibilityRouter};