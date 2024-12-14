import { Injectable, OnDestroy } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { IUserIdentity } from '@comp-gym/shared/api';
import { NotificationService } from '../feedback/notifications/notification.service';

@Injectable()
export class LoggedInAuthGuard implements CanActivate, CanActivateChild {
	constructor(
		private authService: AuthService,
		private router: Router,
		private notificationService: NotificationService
	) {}

	canActivate(): Observable<boolean> {
		return this.authService.currentUser$.pipe(
			map((user: IUserIdentity | undefined) => {
				if (user && user.token) {
					return true;
				} else {
					this.router.navigate(['/login']);
					this.notificationService.error('Login first!', 4000);
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
