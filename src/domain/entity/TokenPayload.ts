export interface TokenPayload {
  guid: UniqueId;
  login: string;
  role: string;
  team: string;
  accessTypes: string[];
  iat: Timestamp;
  exp: Timestamp;
}
