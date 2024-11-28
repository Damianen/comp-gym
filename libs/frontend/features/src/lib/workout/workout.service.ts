import { Injectable } from '@angular/core';
import { Observable, of, delay, map } from 'rxjs';
import {
  ApiResponse,
  IUpdateWorkout,
  IWorkout,
  WorkoutType,
} from '@comp-gym/shared/api';
import {
  IUpdateSet,
  ISet,
  SetType,
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
      .pipe(map((response) =>  response.results));
  }

  createWorkout(workout: IWorkout): Observable<IWorkout> {
    return this.http.post<ApiResponse<any>>(environment.API_URL + 'workout', workout)
      .pipe(map((response) => response.results));
  }

  deleteWorkout(_id: string): Observable<IWorkout> {
    return this.http.delete<ApiResponse<any>>(environment.API_URL + 'workout/' + _id)
      .pipe(map((response) => response.results))
  }

  updateWorkout(_id: string, workout: IUpdateWorkout): Observable<IWorkout> {
    return this.http.put<ApiResponse<any>>(environment.API_URL + 'workout/' + _id, workout)
      .pipe(map((response) => response.results))
  }

  createSet(Set: ISet): Observable<ISet> {
    return this.http.post<ApiResponse<any>>(environment.API_URL + 'set', Set)
      .pipe(map((response) => response.results));
  }

  deleteSet(_id: string): Observable<ISet> {
    return this.http.delete<ApiResponse<any>>(environment.API_URL + 'set/' + _id)
      .pipe(map((response) => response.results))
  }

  updateSet(_id: string, Set: IUpdateSet): Observable<ISet> {
    return this.http.put<ApiResponse<any>>(environment.API_URL + 'set/' + _id, Set)
      .pipe(map((response) => response.results))
  }
}
