import { ServerConfig } from '../domain/entity/ServerConfig';

export const config: ServerConfig = {
  apiPort: '4000',
  mongo: {
    host: 'localhost:27017',
    db: 'performer',
    dbuser: 'admin',
    dbpasswd: 'password',
  },
};
