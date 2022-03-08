import { gql } from 'apollo-server-express';
import { typeDefs as User } from '../users/usersTypeDefs';

const Query = gql`
  type Query {
    users: [User]
  }
`;

export const typeDefs = [Query, User];
