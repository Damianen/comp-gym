import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { IUserIdentity } from '@comp-gym/shared/api';
import { Router } from '@angular/router';
import { environment } from '@comp-gym/shared/util-env';
import { map, catchError, switchMap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUserRegistration } from '@comp-gym/shared/api';
import { NotificationService } from '../feedback/notifications/notification.service';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	public currentUser$ = new BehaviorSubject<IUserIdentity | undefined>(undefined);
	private readonly CURRENT_USER = 'currentuser';
	private readonly headers = new HttpHeaders({
		'Content-Type': 'application/json',
	});

	constructor(
		private http: HttpClient,
		private router: Router,
		private notificationService: NotificationService
	) {
		this.getUserFromLocalStorage()
			.pipe(
				switchMap((user: IUserIdentity) => {
					if (user) {
						this.currentUser$.next(user);
						return of(user);
					} else {
						return of(undefined);
					}
				})
			)
			.subscribe();
	}

	login(email: string, password: string): Observable<IUserIdentity | undefined> {
		return this.http
			.post<{
				results: any;
			}>(
				`${environment.API_URL}auth/login`,
				{ emailAddress: email, password: password },
				{ headers: this.headers }
			)
			.pipe(
				map((response) => {
					if (response.results?.response?.error != undefined) {
						throw new Error(response.results.response.message);
					}
					const user = response.results;
					this.saveUserToLocalStorage(user);
					this.currentUser$.next(user);
					return user;
				}),
				catchError((error: any) => {
					return of(undefined);
				})
			);
	}

	register(userData: IUserRegistration): Observable<IUserIdentity | undefined> {
		return this.http
			.post<any>(`${environment.API_URL}user`, userData, {
				headers: this.headers,
			})
			.pipe(
				map((user) => {
					return user.results;
				}),
				catchError((error: any) => {
					return of(undefined);
				})
			);
	}

	validateToken(userData: IUserIdentity): Observable<IUserIdentity | undefined> {
		const url = `${environment}auth/profile`;
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + userData.token,
			}),
		};

		return this.http.get<any>(url, httpOptions).pipe(
			map((response) => {
				return response;
			}),
			catchError((error: any) => {
				this.logout();
				this.currentUser$.next(undefined);
				return of(undefined);
			})
		);
	}

	logout(): void {
		this.router
			.navigate(['/'])
			.then(() => {
				localStorage.removeItem(this.CURRENT_USER);
				this.currentUser$.next(undefined);
				this.notificationService.success('Successfully logged out!', 3000);
			})
			.catch((error) => {
				throw error;
			});
	}

	getUserFromLocalStorage(): Observable<IUserIdentity> {
		const localUser = JSON.parse(localStorage.getItem(this.CURRENT_USER)!);
		return of(localUser);
	}

	saveUserToLocalStorage(user: IUserIdentity): void {
		localStorage.setItem(this.CURRENT_USER, JSON.stringify(user));
	}

	userMayEdit(itemUserId: string): Observable<boolean> {
		return this.currentUser$.pipe(
			map((user: IUserIdentity | undefined) => (user ? user._id === itemUserId : false))
		);
	}
}
