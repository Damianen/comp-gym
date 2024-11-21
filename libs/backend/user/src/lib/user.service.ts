import { Injectable, NotFoundException } from '@nestjs/common';
import { IUser } from '@comp-gym/shared/api';
import { BehaviorSubject } from 'rxjs';
import { Logger } from '@nestjs/common';

@Injectable()
export class UserService {
    TAG = 'UserService';

    private Users$ = new BehaviorSubject<IUser[]>([
        {
            id: '0',
            firstName: 'Spaghetti con funghi',
            lastName: 'Vega version of the famous spaghetti recipe.',
            doesCardio: true,
            birthdate: new Date(),
        },
    ]);

    getAll(): IUser[] {
        Logger.log('getAll', this.TAG);
        return this.Users$.value;
    }

    getOne(id: string): IUser {
        Logger.log(`getOne(${id})`, this.TAG);
        const User = this.Users$.value.find((td) => td.id === id);
        if (!User) {
            throw new NotFoundException(`User could not be found!`);
        }
        return User;
    }

    create(User: Pick<IUser, 'firstName' | 'lastName'>): IUser {
        Logger.log('create', this.TAG);
        const current = this.Users$.value;
        const newUser: IUser = {
            ...User,
            id: `User-${Math.floor(Math.random() * 10000)}`,
            doesCardio: false,
            birthdate: new Date(),
        };
        this.Users$.next([...current, newUser]);
        return newUser;
    }
}
