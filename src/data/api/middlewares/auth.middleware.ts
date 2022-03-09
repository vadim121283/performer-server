import { Request, Response, NextFunction } from 'express';
import { createUser } from '../../users/createUser';
import { hasUserAccessToEndpoint } from '../utils/auth.utils';
import { validateToken } from '../utils/jwt.utils';

/**
 * middleware to check whether user has access to a specific endpoint
 *
 * @param allowedAccessTypes list of allowed access types of a specific endpoint
 */
export const authorize = (allowedAccessTypes: string[]) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    let jwt = req.headers.authorization;

    // verify request has token
    if (!jwt) {
      return res.status(401).json({ message: 'Invalid token ' });
    }

    // remove Bearer if using Bearer Authorization mechanism
    if (jwt.toLowerCase().startsWith('bearer')) {
      jwt = jwt.slice('bearer'.length).trim();
    }

    // verify token hasn't expired yet
    const decodedToken = await validateToken(jwt);

    // auto create user
    // FIXME: Many request to db
    createUser({ guid: decodedToken.guid, login: decodedToken.login });

    if (!hasUserAccessToEndpoint(allowedAccessTypes, decodedToken.accessTypes)) {
      return res.status(401).json({ message: 'No enough privileges to access endpoint' });
    }

    req.user = decodedToken;

    next();
  } catch (err) {
    console.log(err);

    if (err instanceof Error) {
      if (err.name === 'TokenExpiredError') {
        res.status(401).json({ message: 'Expired token' });
        return;
      }
    }

    res.status(500).json({ message: 'Failed to authenticate user' });
  }
};
