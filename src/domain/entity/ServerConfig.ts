export interface ServerConfig {
  apiPort: string;
  mongo: {
    host: string;
    db: string;
    dbuser: string;
    dbpasswd: string;
  };
}
