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
      .pipe(map((response) => response.results));
  }

  updateWorkout(_id: string, workout: IUpdateWorkout): Observable<IWorkout> {
    return this.http.put<ApiResponse<any>>(environment.API_URL + 'workout/' + _id, workout)
      .pipe(map((response) => response.results));
  }

  deleteExerciseFromWorkout(_id: string, exerciseIndex: number): Observable<IWorkout> {
    return this.http.delete<ApiResponse<any>>(environment.API_URL + 'workout/' + _id + '/exercise/' + exerciseIndex)
      .pipe(map((response) => response.results));
  }

  addSetToWorkout(_id: string, set: ISet, exerciseIndex: number): Observable<IWorkout> {
    return this.http.put<ApiResponse<any>>(environment.API_URL + 'workout/' + _id + '/set/' + exerciseIndex, set)
      .pipe(map((response) => response.results));
  }

  deleteSetFromWorkout(_id: string, exerciseIndex: number, setIndex: number): Observable<IWorkout> {
    return this.http.delete<ApiResponse<any>>(environment.API_URL + 'workout/' + _id + '/set/' + exerciseIndex + '/' + setIndex)
      .pipe(map((response) => response.results));
  }
}
