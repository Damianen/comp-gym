import { Injectable } from '@angular/core';
import { Observable, of, delay, map } from 'rxjs';
import {
  ApiResponse,
  IWorkout,
  WorkoutType,
} from '@comp-gym/shared/api';
import { HttpClient } from '@angular/common/http';
import { environment } from '@comp-gym/shared/util-env';

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  constructor(private http: HttpClient) {}

  getWorkoutsAsync(): Observable<IWorkout[]> {
    return this.http
      .get<ApiResponse<any>>(environment.API_URL + 'workout')
      .pipe(map((response) => response.results));
  }

  getWorkoutById(_id: string): Observable<IWorkout> {
    return this.http
      .get<ApiResponse<any>>(environment.API_URL + 'workout/' + _id)
      .pipe(map((response) => response.results[0]));
  }
}
