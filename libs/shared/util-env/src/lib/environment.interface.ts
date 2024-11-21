export interface IEnvironment {
  production: boolean;

  ROOT_DOMAIN_URL: string;
  API_URL: string;

  MONGO_DB_CONNECTION_STRING: string;
}
