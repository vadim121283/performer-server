import { connect } from 'mongoose';
import { config } from '../../config';

export async function dbConnect(): Promise<void> {
  const { dbuser, dbpasswd, host, db } = config.mongo;
  await connect(`mongodb://${dbuser}:${dbpasswd}@${host}/${db}`);
}
