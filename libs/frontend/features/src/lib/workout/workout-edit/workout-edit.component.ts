import { Component, OnDestroy, OnInit } from '@angular/core';
import { IWorkoutInfo, WorkoutType } from '@comp-gym/shared/api';
import { Subscription, switchMap, of } from 'rxjs';
import { WorkoutService } from '../workout.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NotificationService } from '../../feedback/notifications/notification.service';

@Component({
	selector: 'lib-workout-edit',
	templateUrl: './workout-edit.component.html',
})
export class WorkoutEditComponent implements OnInit, OnDestroy {
	workoutId?: string;
	workout?: IWorkoutInfo;
	sub?: Subscription;
	workoutTypeList: {
		key: string;
		value: string;
	}[] = Object.entries(WorkoutType).map(([key, value]) => ({ key, value }));

	constructor(
		private workoutService: WorkoutService,
		private route: ActivatedRoute,
		private router: Router,
		private notificationService: NotificationService
	) {}

	ngOnInit(): void {
		this.sub = this.route.paramMap
			.pipe(
				switchMap((params: ParamMap) => {
					if (!params.get('id')) {
						return of({
							name: '',
							description: '',
							duration: 0,
							type: WorkoutType.WeightLifting,
						});
					} else {
						this.workoutId = String(params.get('id'));
						return this.workoutService.getWorkoutById(String(params.get('id')));
					}
				})
			)
			.subscribe(
				(workout) => {
					this.workout = workout;
				},
				(err: any) => {
					this.notificationService.error(err.error.message, 6000);
				}
			);
	}

	ngOnDestroy(): void {
		if (this.sub) {
			this.sub.unsubscribe();
		}
	}

	onSubmit(workoutInfo: IWorkoutInfo, valid: boolean): void {
		if (!valid) {
			this.notificationService.error('One of the fields is missing!', 6000);
			return;
		}

		const workout = {
			...workoutInfo,
			number: Math.random() * 10000000,
			date: new Date(),
			favorite: false,
			exercises: [],
		};

		if (this.workoutId) {
			this.sub?.add(
				this.workoutService.updateWorkout(this.workoutId, workout).subscribe(
					() => {
						this.router.navigate(['../../' + this.workoutId], {
							relativeTo: this.route,
						});
						this.notificationService.success('Workout successfully updated!', 3000);
					},
					(err: any) => {
						this.notificationService.error(err.message, 6000);
					}
				)
			);
		} else {
			this.sub?.add(
				this.workoutService.createWorkout({ ...workout, user: null, _id: null }).subscribe(
					() => {
						this.router.navigate(['../../workouts'], {
							relativeTo: this.route,
						});
						this.notificationService.success('Workout successfully created!', 3000);
					},
					(err: any) => {
						this.notificationService.error(err.message, 6000);
					}
				)
			);
		}
	}
}
