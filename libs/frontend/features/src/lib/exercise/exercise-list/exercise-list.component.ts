import { Component, OnDestroy, OnInit } from '@angular/core';
import { IExercise, IUserIdentity } from '@comp-gym/shared/api';
import { map, Subscription, switchMap } from 'rxjs';
import { ExerciseService } from '../exercise.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NotificationService } from '../../feedback/notifications/notification.service';
import { AuthService } from '../../auth/auth.service';

@Component({
	selector: 'lib-exercise-list',
	templateUrl: './exercise-list.component.html',
})
export class ExerciseListComponent implements OnInit, OnDestroy {
	exercises?: IExercise[];
	recommendedExercises?: IExercise[];
	subscription?: Subscription;
	workoutId?: string;
	constructor(
		private exerciseService: ExerciseService,
		private route: ActivatedRoute,
		private router: Router,
		private notificationService: NotificationService,
		private authService: AuthService
	) {}

	ngOnInit(): void {
		this.subscription = this.exerciseService.getExercisesAsync().subscribe((exercises) => {
			this.exercises = exercises;
		});

		this.subscription = this.authService.currentUser$.subscribe((currentUser?: IUserIdentity) => {
			if (currentUser) {
				this.subscription = this.exerciseService
					.getRecommendedExerciseIdsForUser(currentUser._id as string)
					.subscribe((exerciseIds) => {
						this.subscription = this.exerciseService
							.getExercisesFromIdArray(exerciseIds)
							.subscribe((exercises) => {
								this.recommendedExercises = exercises;
							});
					});
			}
		});

		this.subscription = this.route.paramMap
			.pipe(
				switchMap((params: ParamMap) => {
					return (this.workoutId = params.get('id') as string);
				})
			)
			.subscribe();
	}

	ngOnDestroy(): void {
		this.subscription?.unsubscribe();
	}

	deleteExercise(id: string | null): void {
		this.subscription = this.exerciseService.deleteExercise(String(id)).subscribe({
			next: () => {
				this.ngOnInit();
				this.notificationService.success('Successfully deleted exercise!', 3000);
			},
			error: (err: any) => {
				this.notificationService.error(err.message, 6000);
			},
		});
	}

	addExerciseToWorkout(id: string | null): void {
		this.subscription = this.exerciseService
			.addExerciseToWorkout(id as string, this.workoutId as string)
			.subscribe({
				next: () => {
					this.router.navigate(['../../'], { relativeTo: this.route });
					this.notificationService.success('Successfully added exercise to workout!', 3000);
				},
				error: (err: any) => {
					this.notificationService.error(err.message, 6000);
				},
			});
	}
}
