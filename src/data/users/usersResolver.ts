import { User } from '../../common/domain/entity/User';
import { UserModel } from './usersSchema';

export const usersResolver = async (accessTypes: string[] | undefined | any): Promise<User[]> => {
  console.log('RRR', accessTypes);

  if (accessTypes) {
    return await UserModel.find();
  }
  return [];
};
