import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type User {
    guid: String
    login: String
  }
`;
