import { Injectable } from '@angular/core';
import { Observable, of, delay, map } from 'rxjs';
import {
  ApiResponse,
  IWorkoutIdentity,
  WorkoutType,
} from '@comp-gym/shared/api';
import { HttpClient } from '@angular/common/http';
import { environment } from '@comp-gym/shared/util-env';

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  constructor(private http: HttpClient) {}

  workouts: IWorkoutIdentity[] = [];

  getWorkouts(): IWorkoutIdentity[] {
    return this.workouts;
  }

  getWorkoutsAsObservable(): Observable<IWorkoutIdentity[]> {
    return of(this.workouts);
  }

  getWorkoutsAsync(): Observable<IWorkoutIdentity[]> {
    return this.http
      .get<ApiResponse<any>>(environment.API_URL + 'workout')
      .pipe(map((response) => response.results));
  }

  getWorkoutById(_id: string): IWorkoutIdentity {
    return this.workouts.filter((workout) => workout._id === _id)[0];
  }
}
