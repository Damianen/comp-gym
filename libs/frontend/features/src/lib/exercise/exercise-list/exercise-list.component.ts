import { Component, OnDestroy, OnInit } from '@angular/core';
import { IExercise } from '@comp-gym/shared/api';
import { map, Subscription, switchMap } from 'rxjs';
import { ExerciseService } from '../exercise.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'lib-exercise-list',
  templateUrl: './exercise-list.component.html',
})
export class ExerciseListComponent implements OnInit, OnDestroy {
  exercises?: IExercise[];
  subscription?: Subscription;
  workoutId?: string;
  constructor(private exerciseService: ExerciseService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.subscription = this.exerciseService.getExercisesAsync().subscribe((exercises) => {
      this.exercises = exercises;
    });

    this.subscription = this.route.paramMap.pipe(switchMap((params: ParamMap) => {
      return this.workoutId = params.get('id') as string;
    })).subscribe();
  }

  ngOnDestroy(): void {
      this.subscription?.unsubscribe();
  }

  deleteExercise(id: string | null): void {
    this.subscription = this.exerciseService.deleteExercise(String(id)).subscribe(() => {
      this.ngOnInit();
    }
    )
  }

  addExerciseToWorkout(id: string | null): void {
    this.subscription = this.exerciseService.addExerciseToWorkout(id as string, this.workoutId as string).subscribe(() => {
      this.router.navigate(['../../'], { relativeTo: this.route });
    })
  }
}
