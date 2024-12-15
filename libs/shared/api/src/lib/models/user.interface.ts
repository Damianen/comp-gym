import { IToken, IUserRegistration } from './auth.interface';
import { IEntity } from './entity.interface';

export interface IUserIdentity extends IEntity, IToken {
	firstName: string;
	email: string;
}

export interface IUser extends IUserRegistration, IEntity {}

export interface INeo4jUser {
	_id: string;
}

export type ICreateUser = Pick<IUser, 'firstName' | 'lastName'>;
export type IUpdateUser = Partial<Omit<IUser, 'id'>>;
export type IUpsertUser = IUser;
