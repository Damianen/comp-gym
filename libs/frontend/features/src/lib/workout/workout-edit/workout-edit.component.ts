import { Component, OnDestroy, OnInit } from '@angular/core';
import { IWorkoutInfo, WorkoutType } from '@comp-gym/shared/api';
import { Subscription, switchMap, of } from 'rxjs';
import { WorkoutService } from '../workout.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

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
		private router: Router
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
						return this.workoutService.getWorkoutById(
							String(params.get('id'))
						);
					}
				})
			)
			.subscribe((workout) => {
				this.workout = workout;
			});
	}

	ngOnDestroy(): void {
		if (this.sub) {
			this.sub.unsubscribe();
		}
	}

	onSubmit(workoutInfo: IWorkoutInfo): void {
		const workout = {
			...workoutInfo,
			number: Math.random() * 10000000,
			date: new Date(),
			favorite: false,
			user: null,
			exercises: [],
		};

		if (this.workoutId) {
			this.sub?.add(
				this.workoutService
					.updateWorkout(this.workoutId, workout)
					.subscribe(() => {
						this.router.navigate(['../../' + this.workoutId], {
							relativeTo: this.route,
						});
					})
			);
		} else {
			this.sub?.add(
				this.workoutService
					.createWorkout({ ...workout, _id: null })
					.subscribe(() => {
						this.router.navigate(['../../workouts'], {
							relativeTo: this.route,
						});
					})
			);
		}
	}
}
