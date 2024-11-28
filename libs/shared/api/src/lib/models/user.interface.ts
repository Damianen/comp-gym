import { IEntity } from "./Entity.interface";

export interface IUser extends IEntity {
    firstName: string;
    lastName: string;
    email: string;
    height: number;
    weight: number;
    birthdate: Date;
    doesCardio: boolean;
    password: string;
}

export type ICreateUser = Pick<
    IUser,
    'firstName' | 'lastName'
>;
export type IUpdateUser = Partial<Omit<IUser, 'id'>>;
export type IUpsertUser = IUser;