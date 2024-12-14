import { Component, OnDestroy, OnInit } from '@angular/core';
import { IWorkout } from '@comp-gym/shared/api';
import { Subscription } from 'rxjs';
import { WorkoutService } from '../workout.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from '../../feedback/notifications/notification.service';

@Component({
	selector: 'lib-workout-list',
	templateUrl: './workout-list.component.html',
})
export class WorkoutListComponent implements OnInit, OnDestroy {
	workouts?: IWorkout[];
	subscription?: Subscription;
	constructor(
		private workoutService: WorkoutService,
		private route: ActivatedRoute,
		private router: Router,
		private notificationService: NotificationService
	) {}

	ngOnInit(): void {
		this.subscription = this.workoutService.getWorkoutsAsync().subscribe({
			next: (workouts) => {
				workouts.forEach((workout) => {
					workout.date = new Date(workout.date);
				});
				this.workouts = workouts;
			},
			error: (err: any) => {
				this.notificationService.error(err.error.message, 6000);
			},
		});
	}

	ngOnDestroy(): void {
		this.subscription?.unsubscribe();
	}

	deleteWorkout(id: string | null): void {
		this.subscription = this.workoutService.deleteWorkout(String(id)).subscribe({
			next: () => {
				this.ngOnInit();
				this.notificationService.success('Workout successfully deleted!', 3000);
			},
			error: (err: any) => {
				this.notificationService.error(err.error.message, 6000);
			},
		});
	}
}
