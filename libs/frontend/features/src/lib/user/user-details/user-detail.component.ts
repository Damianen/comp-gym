import { Component, OnDestroy, OnInit } from '@angular/core';
import { IUser, IUserIdentity } from '@comp-gym/shared/api';
import { Subscription, pipe } from 'rxjs';
import { UserService } from '../user-service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { NotificationService } from '../../feedback/notifications/notification.service';
import { WorkoutService } from '../../workout/workout.service';

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
		private authService: AuthService,
		private notificationService: NotificationService,
		private workoutService: WorkoutService
	) {}

	ngOnInit(): void {
		this.subscription = this.authService.currentUser$.subscribe({
			next: (loggedInUser?: IUserIdentity) => {
				this.loggedInUser = loggedInUser;
				this.subscription = this.userService
					.getUserByIdAsObservable(String(this.loggedInUser?._id))
					.subscribe((user) => {
						this.user = user;
						this.user.birthdate = new Date(this.user.birthdate);
					});
			},
			error: (err: any) => {
				this.notificationService.error(err.message, 6000);
			},
		});
	}

	ngOnDestroy(): void {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}

	deleteUser(id: string | null | undefined): void {
		this.subscription = this.workoutService.getWorkoutsAsync().subscribe((workouts) => {
			const ids: string[] = [];
			workouts.forEach((workout) => ids.push(workout._id as string));

			this.subscription = this.workoutService.deleteWorkouts(ids).subscribe(() => {
				this.userService.deleteUser(id as string).subscribe({
					next: () => {
						this.subscription = this.userService.deleteNeo4jUser(id as string).subscribe({
							next: () => {
								this.authService.logout();
								this.router.navigate(['../'], {
									relativeTo: this.route,
								});
								this.notificationService.success('Successfully deleted your account!', 3000);
							},
							error: (err: any) => {
								this.notificationService.error(err.message, 6000);
							},
						});
					},
					error: (err: any) => {
						this.notificationService.error(err.message, 6000);
					},
				});
			});
		});
	}
}
