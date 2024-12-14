import { Component, OnDestroy, OnInit } from '@angular/core';
import { IUser, IUserIdentity } from '@comp-gym/shared/api';
import { of, Subscription, switchMap, tap } from 'rxjs';
import { UserService } from '../user-service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { NotificationService } from '../../feedback/notifications/notification.service';

@Component({
	selector: 'lib-user-edit',
	templateUrl: './user-edit.component.html',
})
export class UserEditComponent implements OnInit, OnDestroy {
	user!: IUser;
	subscription?: Subscription;
	loggedInUser?: IUserIdentity;

	constructor(
		private userService: UserService,
		private route: ActivatedRoute,
		private router: Router,
		private authService: AuthService,
		private notificationService: NotificationService
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

	onSubmit(user: IUser, valid: boolean): void {
		if (!valid) {
			this.notificationService.error('One of the fields is incorrect or missing!', 6000);
			return;
		}

		this.subscription = this.userService.updateUser(user).subscribe({
			next: () => {
				this.subscription = this.authService.currentUser$.subscribe((currentUser?: IUserIdentity) => {
					const updatedUser: IUserIdentity = {
						_id: user._id,
						firstName: user.firstName,
						email: user.email,
						token: currentUser?.token,
					};

					this.authService.saveUserToLocalStorage(updatedUser);
					this.router.navigate(['../'], { relativeTo: this.route });
					this.notificationService.success('Successfully updated your account!', 3000);
				});
			},
			error: (err: any) => {
				this.notificationService.error(err.error.message, 6000);
			},
		});
	}
}
