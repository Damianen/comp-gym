export interface IUserCredentials {
	email: string;
	password: string;
}

export interface IUserRegistration extends IUserCredentials {
	firstName: string;
	lastName: string;
	birthdate: Date;
	height: number;
	weight: number;
	email: string;
}

export interface IToken {
	token?: string;
}
