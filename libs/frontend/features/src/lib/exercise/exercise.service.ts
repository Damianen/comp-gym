import { Injectable } from '@angular/core';
import { Observable, of, delay, map } from 'rxjs';
import {
  ApiResponse,
  IUpdateExercise,
  IExercise,
  ExerciseType,
  IWorkout,
} from '@comp-gym/shared/api';
import { HttpClient } from '@angular/common/http';
import { environment } from '@comp-gym/shared/util-env';

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  constructor(private http: HttpClient) {}

  getExercisesAsync(): Observable<IExercise[]> {
    return this.http
      .get<ApiResponse<any>>(environment.API_URL + 'exercise')
      .pipe(map((response) => response.results));
  }

  getExerciseById(_id: string): Observable<IExercise> {
    return this.http
      .get<ApiResponse<any>>(environment.API_URL + 'exercise/' + _id)
      .pipe(map((response) =>  response.results));
  }

  createExercise(exercise: IExercise): Observable<IExercise> {
    return this.http.post<ApiResponse<any>>(environment.API_URL + 'exercise', exercise)
      .pipe(map((response) => response.results));
  }

  deleteExercise(_id: string): Observable<IExercise> {
    return this.http.delete<ApiResponse<any>>(environment.API_URL + 'exercise/' + _id)
      .pipe(map((response) => response.results));
  }

  updateExercise(_id: string, exercise: IUpdateExercise): Observable<IExercise> {
    return this.http.put<ApiResponse<any>>(environment.API_URL + 'exercise/' + _id, exercise)
      .pipe(map((response) => response.results));
  }

  addExerciseToWorkout(_id: string, workoutId: string): Observable<IWorkout> {
    return this.http.put<ApiResponse<any>>(environment.API_URL + 'workout/' + workoutId + '/exercise/' + _id, null)
      .pipe(map((response) => response.results));
  }
}