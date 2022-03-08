import { Schema, model } from 'mongoose';
import { User } from '../../common/domain/entity/User';

const schema = new Schema<User>({
  guid: { type: String, required: true, unique: true },
  login: { type: String, required: true, unique: true },
});

export const UserModel = model<User>('User', schema);
