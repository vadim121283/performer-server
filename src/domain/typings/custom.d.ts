import { TokenPayload } from '../entity/TokenPayload';

declare global {
  namespace Express {
    export interface Request {
      user?: TokenPayload;
    }
  }
}
