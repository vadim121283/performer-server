import { TokenPayload } from '../../domain/entity/TokenPayload';
import { usersResolver } from '../users/usersResolver';

export const resolvers = {
  Query: {
    user(parent: any, args: { guid: UniqueId }, ctx: { user: TokenPayload }) {
      return usersResolver(ctx.user, args.guid);
    },
    users: (parent: any, args: any, ctx: { user: TokenPayload }) => usersResolver(ctx.user),
  },
};
