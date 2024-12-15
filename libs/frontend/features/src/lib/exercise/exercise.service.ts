import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, delay, map, Subscription } from 'rxjs';
import {
	ApiResponse,
	IUpdateExercise,
	IExercise,
	ExerciseType,
	IWorkout,
	IUserIdentity,
	INeo4jExercise,
	ISetAmount,
} from '@comp-gym/shared/api';
import { HttpClient } from '@angular/common/http';
import { environment } from '@comp-gym/shared/util-env';
import { AuthService } from '../auth/auth.service';
import { response } from 'express';

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
			.get<ApiResponse<any>>(environment.API_URL + 'exercise', {
				headers: {
					authorization: `Bearer ${this.user?.token as string}`,
				},
			})
			.pipe(map((response) => response.results));
	}

	getExerciseById(_id: string): Observable<IExercise> {
		return this.http
			.get<ApiResponse<any>>(environment.API_URL + 'exercise/' + _id, {
				headers: {
					authorization: `Bearer ${this.user?.token as string}`,
				},
			})
			.pipe(map((response) => response.results));
	}

	createExercise(exercise: IExercise): Observable<IExercise> {
		return this.http
			.post<ApiResponse<any>>(environment.API_URL + 'exercise', exercise, {
				headers: {
					authorization: `Bearer ${this.user?.token as string}`,
				},
			})
			.pipe(map((response) => response.results));
	}

	deleteExercise(_id: string): Observable<IExercise> {
		return this.http
			.delete<ApiResponse<any>>(environment.API_URL + 'exercise/' + _id, {
				headers: {
					authorization: `Bearer ${this.user?.token as string}`,
				},
			})
			.pipe(map((response) => response.results));
	}

	updateExercise(_id: string, exercise: IUpdateExercise): Observable<IExercise> {
		return this.http
			.put<ApiResponse<any>>(environment.API_URL + 'exercise/' + _id, exercise, {
				headers: {
					authorization: `Bearer ${this.user?.token as string}`,
				},
			})
			.pipe(map((response) => response.results));
	}

	addExerciseToWorkout(_id: string, workoutId: string): Observable<IWorkout> {
		return this.http
			.put<ApiResponse<any>>(environment.API_URL + 'workout/' + workoutId + '/exercise/' + _id, null, {
				headers: {
					authorization: `Bearer ${this.user?.token as string}`,
				},
			})
			.pipe(map((response) => response.results));
	}

	createNeo4jExercise(Exercise: INeo4jExercise): Observable<any> {
		return this.http.post<ApiResponse<any>>(environment.RCMD_API_URL + 'neo4j/exercise', Exercise, {
			headers: {
				authorization: `Bearer ${this.user?.token as string}`,
			},
		});
	}

	deleteNeo4jExercise(id: string): Observable<any> {
		return this.http.delete<ApiResponse<any>>(environment.RCMD_API_URL + 'neo4j/exercise/' + id, {
			headers: {
				authorization: `Bearer ${this.user?.token as string}`,
			},
		});
	}

	getRecommendedExerciseIdsForUser(id: string): Observable<Array<string>> {
		return this.http
			.get<ApiResponse<any>>(environment.RCMD_API_URL + `neo4j/user/${id}/recommend`, {
				headers: {
					authorization: `Bearer ${this.user?.token as string}`,
				},
			})
			.pipe(map((response) => response.results));
	}

	getExercisesFromIdArray(ids: Array<string>): Observable<IExercise[]> {
		const body = {
			ids: ids,
		};

		return this.http
			.post<ApiResponse<any>>(environment.API_URL + 'exercise/ids', ids, {
				headers: {
					authorization: `Bearer ${this.user?.token as string}`,
				},
			})
			.pipe(map((response) => response.results));
	}

	addSetToNeo4jExercise(setAmount: ISetAmount): Observable<any> {
		return this.http.post<ApiResponse<any>>(environment.RCMD_API_URL + 'neo4j/exercise/amount/add', setAmount, {
			headers: {
				authorization: `Bearer ${this.user?.token as string}`,
			},
		});
	}

	removeSetToNeo4jExercise(setAmount: ISetAmount): Observable<any> {
		return this.http.post<ApiResponse<any>>(environment.RCMD_API_URL + 'neo4j/exercise/amount/remove', setAmount, {
			headers: {
				authorization: `Bearer ${this.user?.token as string}`,
			},
		});
	}

	removeSetsToNeo4jExercise(setAmount: ISetAmount, amount: number): Observable<any> {
		return this.http.post<ApiResponse<any>>(
			environment.RCMD_API_URL + 'neo4j/exercise/amount/remove/' + amount,
			setAmount,
			{
				headers: {
					authorization: `Bearer ${this.user?.token as string}`,
				},
			}
		);
	}
}
