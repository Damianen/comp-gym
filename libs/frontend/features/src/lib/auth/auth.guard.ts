import { Injectable, OnDestroy } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { IUserIdentity } from '@comp-gym/shared/api';

@Injectable()
export class LoggedInAuthGuard implements CanActivate, CanActivateChild {
	constructor(
		private authService: AuthService,
		private router: Router
	) {}

	canActivate(): Observable<boolean> {
		return this.authService.currentUser$.pipe(
			map((user: IUserIdentity | undefined) => {
				if (user && user.token) {
					return true;
				} else {
					this.router.navigate(['/login']);
					return false;
				}
			})
		);
	}

	canActivateChild(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean> | Promise<boolean> | boolean {
		return this.canActivate();
	}
}

@Injectable()
export class UserEditOwnDataAuthGuard implements CanActivate, OnDestroy {
	constructor(
		private authService: AuthService,
		private router: Router
	) {}

	subs!: Subscription;
	userId?: string;

	canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
		const userId = route.paramMap.get('id');
		return this.authService.currentUser$.pipe(
			map((user: IUserIdentity | undefined) => {
				if (user && userId != null && userId == user._id) {
					return true;
				} else {
					this.router.navigate(['/']);
					return false;
				}
			})
		);
	}

	ngOnDestroy(): void {
		this.subs.unsubscribe();
	}
}
