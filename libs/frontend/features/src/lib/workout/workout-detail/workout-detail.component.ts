import { Component, OnDestroy, OnInit } from '@angular/core';
import { ISet, IWorkout, SetType } from '@comp-gym/shared/api';
import { WorkoutService } from '../workout.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ExerciseService } from '../../exercise/exercise.service';
import { NotificationService } from '../../feedback/notifications/notification.service';

@Component({
	selector: 'lib-workout-detail',
	templateUrl: './workout-detail.component.html',
})
export class WorkoutDetailComponent implements OnInit, OnDestroy {
	workout!: IWorkout;
	subscription?: Subscription;
	sets!: ISet[];
	setTypeList: {
		key: string;
		value: string;
	}[] = Object.entries(SetType).map(([key, value]) => ({ key, value }));

	constructor(
		private workoutService: WorkoutService,
		private route: ActivatedRoute,
		private router: Router,
		private exerciseService: ExerciseService,
		private notificationService: NotificationService
	) {
		this.sets = [];
	}

	ngOnInit(): void {
		this.route.paramMap.subscribe((params) => {
			const workoutId = params.get('id');
			this.subscription = this.workoutService.getWorkoutById(String(workoutId)).subscribe({
				next: (workout) => {
					workout.date = new Date(workout.date);
					this.workout = workout;
					this.workout.exercises.forEach(() => {
						this.sets.push({
							type: SetType.Normal,
							reps: 0,
							duration: 0,
							weight: 0,
						});
					});
				},
				error: (err: any) => {
					this.notificationService.error(err.error.message, 6000);
				},
			});
		});
	}

	ngOnDestroy(): void {
		this.subscription?.unsubscribe();
	}

	deleteExercise(exerciseIndex: number | undefined): void {
		this.subscription = this.workoutService
			.deleteExerciseFromWorkout(this.workout?._id as string, exerciseIndex as number)
			.subscribe({
				next: () => {
					this.ngOnInit();
					this.notificationService.success('Exercise successfully deleted!', 2000);
				},
				error: (err: any) => {
					this.notificationService.error(err.error.message, 6000);
				},
			});
	}

	createSet(exerciseIndex: number | undefined, valid: boolean): void {
		if (!valid) {
			this.notificationService.error('One of the fields is missing!', 6000);
			return;
		}

		this.subscription = this.workoutService
			.addSetToWorkout(this.workout?._id as string, this.sets[exerciseIndex as number], exerciseIndex as number)
			.subscribe({
				next: () => {
					this.ngOnInit();
					this.notificationService.success('set successfully created!', 2000);
				},
				error: (err: any) => {
					this.notificationService.error(err.error.message, 6000);
				},
			});
	}

	deleteSet(exerciseIndex: number | undefined, setIndex: number | undefined): void {
		this.subscription = this.workoutService
			.deleteSetFromWorkout(this.workout?._id as string, exerciseIndex as number, setIndex as number)
			.subscribe({
				next: () => {
					this.ngOnInit();
					this.notificationService.success('set successfully deleted!', 2000);
				},
				error: (err: any) => {
					this.notificationService.error(err.error.message, 6000);
				},
			});
	}
}
