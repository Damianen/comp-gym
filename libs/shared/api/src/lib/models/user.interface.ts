export interface IUser {
    id: string;
    firstName: string;
    lastName: string;
    doesCardio: boolean;
    birthdate: Date;
}

export type ICreateUser = Pick<
    IUser,
    'firstName' | 'lastName'
>;
export type IUpdateUser = Partial<Omit<IUser, 'id'>>;
export type IUpsertUser = IUser;