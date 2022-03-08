import { usersResolver } from '../users/usersResolver';

export const resolvers = {
  Query: {
    users: (parent: any, args: any, ctx: any) => usersResolver({ parent, args, ctx }),
  },
};
