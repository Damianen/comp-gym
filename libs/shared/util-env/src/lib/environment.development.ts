import { IEnvironment } from './environment.interface';

export const environment: IEnvironment = {
	production: false,

	ROOT_DOMAIN_URL: 'http://localhost:3000',
	API_URL: 'https://comp-gym-api-h3azbjbcemhnftcb.westeurope-01.azurewebsites.net/',

	RCMD_API_URL: 'https://comp-gym-api-h3azbjbcemhnftcb.westeurope-01.azurewebsites.net/',

	MONGO_DB_CONNECTION_STRING: 'mongodb://localhost:27017/shareameal',
};
