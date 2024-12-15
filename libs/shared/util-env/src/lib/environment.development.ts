import { IEnvironment } from './environment.interface';

export const environment: IEnvironment = {
	production: false,

	ROOT_DOMAIN_URL: 'http://localhost:3000',
	API_URL: 'http://localhost:3000/api/',

	RCMD_API_URL: 'http://localhost:3100/api/',

	MONGO_DB_CONNECTION_STRING: 'mongodb://localhost:27017/shareameal',
};
