import { Component, OnDestroy, OnInit } from '@angular/core';
import { IExercise, ExerciseType } from '@comp-gym/shared/api';
import { Subscription, switchMap, of } from 'rxjs';
import { ExerciseService } from '../exercise.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NotificationService } from '../../feedback/notifications/notification.service';

@Component({
	selector: 'lib-exercise-edit',
	templateUrl: './exercise-edit.component.html',
})
export class ExerciseEditComponent implements OnInit, OnDestroy {
	exerciseId?: string;
	exercise?: IExercise;
	sub?: Subscription;
	exerciseTypeList: {
		key: string;
		value: string;
	}[] = Object.entries(ExerciseType).map(([key, value]) => ({ key, value }));

	constructor(
		private exerciseService: ExerciseService,
		private route: ActivatedRoute,
		private router: Router,
		private notificationService: NotificationService
	) {}

	ngOnInit(): void {
		this.sub = this.route.paramMap
			.pipe(
				switchMap((params: ParamMap) => {
					if (!params.get('exerciseId')) {
						return of({
							_id: null,
							name: '',
							description: '',
							number: 0,
							exerciseType: ExerciseType.Other,
						});
					} else {
						this.exerciseId = String(params.get('exerciseId'));
						return this.exerciseService.getExerciseById(String(params.get('exerciseId')));
					}
				})
			)
			.subscribe({
				next: (exercise) => {
					this.exercise = exercise;
				},
				error: (err: any) => {
					this.notificationService.error(err.message, 6000);
				},
			});
	}

	ngOnDestroy(): void {
		if (this.sub) {
			this.sub.unsubscribe();
		}
	}

	onSubmit(ExerciseInfo: IExercise, valid: boolean): void {
		if (!valid) {
			this.notificationService.error('One of the fields is missing!', 6000);
			return;
		}

		const Exercise = {
			...ExerciseInfo,
			number: Math.random() * 10000000,
		};

		if (this.exerciseId) {
			this.sub?.add(
				this.exerciseService.updateExercise(this.exerciseId, Exercise).subscribe({
					next: () => {
						this.router.navigate(['../../add'], {
							relativeTo: this.route,
						});
						this.notificationService.success('Exercise successfully updated!', 3000);
					},
					error: (err: any) => {
						this.notificationService.error(err.message, 6000);
					},
				})
			);
		} else {
			this.sub?.add(
				this.exerciseService.createExercise({ ...Exercise, _id: null }).subscribe({
					next: () => {
						this.router.navigate(['../add'], {
							relativeTo: this.route,
						});
						this.notificationService.success('Exercise successfully created!', 3000);
					},
					error: (err: any) => {
						this.notificationService.error(err.message, 6000);
					},
				})
			);
		}
	}

	deleteExercise() {
		this.sub?.add(
			this.exerciseService.deleteExercise(String(this.exerciseId)).subscribe({
				next: () => {
					this.router.navigate(['../add'], {
						relativeTo: this.route,
					});
					this.notificationService.success('Exercise successfully deleted!', 3000);
				},
				error: (err: any) => {
					this.notificationService.error(err.message, 6000);
				},
			})
		);
	}
}
