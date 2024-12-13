import { Component, OnDestroy, OnInit } from '@angular/core';
import { IExercise, ISet, IWorkout, SetType } from '@comp-gym/shared/api';
import { WorkoutService } from '../workout.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ExerciseService } from '../../exercise/exercise.service';

@Component({
	selector: 'lib-workout-detail',
	templateUrl: './workout-detail.component.html',
})
export class WorkoutDetailComponent implements OnInit, OnDestroy {
	workout?: IWorkout;
	subscription?: Subscription;
	set?: ISet;
	setTypeList: {
		key: string;
		value: string;
	}[] = Object.entries(SetType).map(([key, value]) => ({ key, value }));

	constructor(
		private workoutService: WorkoutService,
		private route: ActivatedRoute,
		private router: Router,
		private exerciseService: ExerciseService
	) {}

	ngOnInit(): void {
		this.route.paramMap.subscribe((params) => {
			const workoutId = params.get('id');
			this.subscription = this.workoutService
				.getWorkoutById(String(workoutId))
				.subscribe((workout) => {
					workout.date = new Date(workout.date);
					this.workout = workout;
					if (!this.set) {
						this.set = {
							type: SetType.Normal,
							reps: 0,
							duration: 0,
							weight: 0,
						};
					}
				});
		});
	}

	ngOnDestroy(): void {
		this.subscription?.unsubscribe();
	}

	deleteExercise(exerciseIndex: number | undefined): void {
		this.subscription = this.workoutService
			.deleteExerciseFromWorkout(
				this.workout?._id as string,
				exerciseIndex as number
			)
			.subscribe(() => {
				this.ngOnInit();
			});
	}

	createSet(set: ISet, exerciseIndex: number | undefined): void {
		this.subscription = this.workoutService
			.addSetToWorkout(
				this.workout?._id as string,
				set,
				exerciseIndex as number
			)
			.subscribe(() => {
				this.ngOnInit();
			});
	}

	deleteSet(
		exerciseIndex: number | undefined,
		setIndex: number | undefined
	): void {
		this.subscription = this.workoutService
			.deleteSetFromWorkout(
				this.workout?._id as string,
				exerciseIndex as number,
				setIndex as number
			)
			.subscribe(() => {
				this.ngOnInit();
			});
	}
}
