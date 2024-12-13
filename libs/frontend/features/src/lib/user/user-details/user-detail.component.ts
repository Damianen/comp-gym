import { Component, OnDestroy, OnInit } from '@angular/core';
import { IUser, IUserIdentity } from '@comp-gym/shared/api';
import { Subscription, pipe } from 'rxjs';
import { UserService } from '../user-service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
	selector: 'lib-user-detail',
	templateUrl: './user-detail.component.html',
})
export class UserDetailComponent implements OnInit, OnDestroy {
	userId: string | null = null;
	user?: IUser;
	subscription?: Subscription;
	loggedInUser?: IUserIdentity;

	constructor(
		private userService: UserService,
		private route: ActivatedRoute,
		private router: Router,
		private authService: AuthService
	) {}

	ngOnInit(): void {
		this.subscription = this.authService.currentUser$.subscribe((loggedInUser?: IUserIdentity) => {
			this.loggedInUser = loggedInUser;
			this.subscription = this.userService
				.getUserByIdAsObservable(String(this.loggedInUser?._id))
				.subscribe((user) => {
					this.user = user;
					this.user.birthdate = new Date(this.user.birthdate);
				});
		});
	}

	ngOnDestroy(): void {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}

	deleteUser(id: string | null | undefined): void {
		this.subscription?.add(
			this.userService.deleteUser(id as string).subscribe(() => {
				this.authService.logout();
				this.router.navigate(['../'], {
					relativeTo: this.route,
				});
			})
		);
	}
}
