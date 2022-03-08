import { User } from '../../common/domain/entity/User';
import { UserModel } from './usersSchema';

/**
 * Auto create authenticated users
 */
export async function createUser(user: User) {
  const docFind = await UserModel.findOne({ guid: user.guid });
  if (docFind) return;

  const doc = new UserModel({
    guid: user.guid,
    login: user.login,
  });
  await doc.save();
  console.log('Created new user: ', doc.login);
}
