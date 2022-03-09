import { ForbiddenError, UserInputError } from 'apollo-server-core';
import { User } from '../../common/domain/entity/User';
import { TokenPayload } from '../../domain/entity/TokenPayload';
import { hasUserAccessToEndpoint } from '../api/utils/auth.utils';
import { UserModel } from './usersSchema';

export const usersResolver = async (token: TokenPayload, guid?: UniqueId): Promise<User[] | User> => {
  if (token && hasUserAccessToEndpoint(['getUsers'], token.accessTypes)) {
    if (guid) {
      const user = await UserModel.findOne({ guid: guid }).exec();
      if (user) return user;
      throw new UserInputError('User not found');
    } else {
      return await UserModel.find();
    }
  } else {
    throw new ForbiddenError('No access to Endpoint');
  }
};
