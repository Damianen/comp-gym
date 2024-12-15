import { Injectable } from '@angular/core';
import { Observable, of, delay, map, Subscription } from 'rxjs';
import { ApiResponse, IUpdateWorkout, IUserIdentity, IWorkout, WorkoutType } from '@comp-gym/shared/api';
import { IUpdateSet, ISet, SetType } from '@comp-gym/shared/api';
import { HttpClient } from '@angular/common/http';
import { environment } from '@comp-gym/shared/util-env';
import { AuthService } from '../auth/auth.service';
import { Result } from 'nest-neo4j/dist';

@Injectable({
	providedIn: 'root',
})
export class WorkoutService {
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

	getWorkoutsAsync(): Observable<IWorkout[]> {
		return this.http
			.get<ApiResponse<any>>(environment.API_URL + 'workout', {
				headers: {
					authorization: `Bearer ${this.user?.token as string}`,
				},
			})
			.pipe(map((response) => response.results));
	}

	getWorkoutById(_id: string): Observable<IWorkout> {
		return this.http
			.get<ApiResponse<any>>(environment.API_URL + 'workout/' + _id, {
				headers: {
					authorization: `Bearer ${this.user?.token as string}`,
				},
			})
			.pipe(map((response) => response.results));
	}

	createWorkout(workout: IWorkout): Observable<IWorkout> {
		return this.http
			.post<ApiResponse<any>>(environment.API_URL + 'workout', workout, {
				headers: {
					authorization: `Bearer ${this.user?.token as string}`,
				},
			})
			.pipe(map((response) => response.results));
	}

	deleteWorkout(_id: string): Observable<IWorkout> {
		return this.http
			.delete<ApiResponse<any>>(environment.API_URL + 'workout/' + _id, {
				headers: {
					authorization: `Bearer ${this.user?.token as string}`,
				},
			})
			.pipe(map((response) => response.results));
	}

	updateWorkout(_id: string, workout: IUpdateWorkout): Observable<IWorkout> {
		return this.http
			.put<ApiResponse<any>>(environment.API_URL + 'workout/' + _id, workout, {
				headers: {
					authorization: `Bearer ${this.user?.token as string}`,
				},
			})
			.pipe(map((response) => response.results));
	}

	deleteExerciseFromWorkout(_id: string, exerciseIndex: number): Observable<IWorkout> {
		return this.http
			.delete<ApiResponse<any>>(environment.API_URL + 'workout/' + _id + '/exercise/' + exerciseIndex, {
				headers: {
					authorization: `Bearer ${this.user?.token as string}`,
				},
			})
			.pipe(map((response) => response.results));
	}

	addSetToWorkout(_id: string, set: ISet, exerciseIndex: number): Observable<IWorkout> {
		return this.http
			.put<ApiResponse<any>>(environment.API_URL + 'workout/' + _id + '/set/' + exerciseIndex, set, {
				headers: {
					authorization: `Bearer ${this.user?.token as string}`,
				},
			})
			.pipe(map((response) => response.results));
	}

	deleteSetFromWorkout(_id: string, exerciseIndex: number, setIndex: number): Observable<IWorkout> {
		return this.http
			.delete<ApiResponse<any>>(
				environment.API_URL + 'workout/' + _id + '/set/' + exerciseIndex + '/' + setIndex,
				{
					headers: {
						authorization: `Bearer ${this.user?.token as string}`,
					},
				}
			)
			.pipe(map((response) => response.results));
	}

	deleteWorkouts(ids: Array<string>): Observable<any> {
		return this.http
			.post<ApiResponse<any>>(
				environment.API_URL + 'workout/delete',
				{ ids: ids },
				{
					headers: {
						authorization: `Bearer ${this.user?.token as string}`,
					},
				}
			)
			.pipe(map((response) => response.results));
	}
}
