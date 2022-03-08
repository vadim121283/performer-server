import { Request, Response, NextFunction } from 'express';

/**
 * resolve all CORS problems
 */
export const corsServer = () => async (req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
};
