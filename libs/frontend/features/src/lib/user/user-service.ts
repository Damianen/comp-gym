import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { map, Observable, tap, of, catchError, Subscription } from 'rxjs';
import { ApiResponse, IUser, IUserIdentity } from '@comp-gym/shared/api';
import { HttpClient } from '@angular/common/http';
import { environment } from '@comp-gym/shared/util-env';
import { AuthService } from '../auth/auth.service';

@Injectable({
	providedIn: 'root',
})
export class UserService implements OnDestroy {
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

	getUserByIdAsObservable(id: string): Observable<IUser> {
		return this.http
			.get<ApiResponse<any>>(environment.API_URL + 'user/' + id, {
				headers: {
					authorization: `Bearer ${this.user?.token as string}`,
				},
			})
			.pipe(map((response) => response.results));
	}

	createUser(user: IUser): Observable<IUser> {
		return this.http
			.post<ApiResponse<any>>(environment.API_URL + 'user', user)
			.pipe(map((response) => response.results));
	}

	deleteUser(id: string): Observable<IUser> {
		return this.http
			.delete<ApiResponse<any>>(environment.API_URL + 'user/' + id, {
				headers: {
					authorization: `Bearer ${this.user?.token as string}`,
				},
			})
			.pipe(map((response) => response.results));
	}

	updateUser(user: IUser): Observable<IUser> {
		return this.http
			.put<ApiResponse<any>>(environment.API_URL + 'user/' + user._id, user, {
				headers: {
					authorization: `Bearer ${this.user?.token as string}`,
				},
			})
			.pipe(map((response) => response.results));
	}
}
