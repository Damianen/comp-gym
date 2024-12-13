import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, delay, map, Subscription } from 'rxjs';
import { ApiResponse, IUpdateExercise, IExercise, ExerciseType, IWorkout, IUserIdentity } from '@comp-gym/shared/api';
import { HttpClient } from '@angular/common/http';
import { environment } from '@comp-gym/shared/util-env';
import { AuthService } from '../auth/auth.service';

@Injectable({
	providedIn: 'root',
})
export class ExerciseService implements OnDestroy {
	subscription?: Subscription;
	user?: IUserIdentity;

	constructor(
		private http: HttpClient,
		private authService: AuthService
	) {
		this.subscription = this.authService.currentUser$.subscribe((currentUser?: IUserIdentity) => {
			if (currentUser) {
				this.user = currentUser;
			}
		});
	}

	ngOnDestroy(): void {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}

	getExercisesAsync(): Observable<IExercise[]> {
		return this.http
			.get<ApiResponse<any>>(environment.API_URL + 'exercise')
			.pipe(map((response) => response.results));
	}

	getExerciseById(_id: string): Observable<IExercise> {
		return this.http
			.get<ApiResponse<any>>(environment.API_URL + 'exercise/' + _id)
			.pipe(map((response) => response.results));
	}

	createExercise(exercise: IExercise): Observable<IExercise> {
		return this.http
			.post<ApiResponse<any>>(environment.API_URL + 'exercise', exercise)
			.pipe(map((response) => response.results));
	}

	deleteExercise(_id: string): Observable<IExercise> {
		return this.http
			.delete<ApiResponse<any>>(environment.API_URL + 'exercise/' + _id)
			.pipe(map((response) => response.results));
	}

	updateExercise(_id: string, exercise: IUpdateExercise): Observable<IExercise> {
		return this.http
			.put<ApiResponse<any>>(environment.API_URL + 'exercise/' + _id, exercise)
			.pipe(map((response) => response.results));
	}

	addExerciseToWorkout(_id: string, workoutId: string): Observable<IWorkout> {
		return this.http
			.put<ApiResponse<any>>(environment.API_URL + 'workout/' + workoutId + '/exercise/' + _id, null)
			.pipe(map((response) => response.results));
	}
}
