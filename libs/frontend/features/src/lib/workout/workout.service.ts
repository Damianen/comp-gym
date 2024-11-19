import { Injectable } from "@angular/core";
import { Observable, of, delay } from "rxjs";
import { IWorkoutIdentity, WorkoutType } from "@comp-gym/shared/api";

@Injectable({
    providedIn: 'root',
})
export class WorkoutService {
    workouts: IWorkoutIdentity[] = [
        {
            _id: '0',
            name: 'Pull',
            duration: 60,
            date: new Date(),
            type: WorkoutType.WeightLifting
        },
        {
            _id: '1',
            name: 'Push',
            duration: 45,
            date: new Date(),
            type: WorkoutType.WeightLifting
        },
        {
            _id: '2',
            name: 'Legs',
            duration: 90,
            date: new Date(),
            type: WorkoutType.WeightLifting
        },
        {
            _id: '2',
            name: 'Running',
            duration: 90,
            date: new Date(),
            type: WorkoutType.Cardio
        },
    ]

    getWorkouts(): IWorkoutIdentity[] {
        return this.workouts;
    }

    getWorkoutsAsObservable(): Observable<IWorkoutIdentity[]> {
        return of(this.workouts);
    }

    getWorkoutsAsync(): Observable<IWorkoutIdentity[]> {
        return of(this.workouts).pipe(delay(2000));
    }

    getWorkoutById(_id: string): IWorkoutIdentity {
        return this.workouts.filter((workout) => workout._id === _id)[0];
    }
}