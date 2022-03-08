import { verify, VerifyOptions } from 'jsonwebtoken';
import { TokenPayload } from '../../../domain/entity/TokenPayload';
import * as fs from 'fs';
import * as path from 'path';

/**
 * checks if JWT token is valid
 *
 * @param token the expected token payload
 */
export async function validateToken(token: string): Promise<TokenPayload> {
  const publicKey = fs.readFileSync(path.join(__dirname, '../../../../public.key'));

  const verifyOptions: VerifyOptions = {
    algorithms: ['RS256'],
  };

  return verify(token, publicKey, verifyOptions) as TokenPayload;
}
