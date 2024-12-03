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
  }[] = Object.entries(SetType).map(([key, value]) => ({ key, value}));

  constructor(private workoutService: WorkoutService, private route: ActivatedRoute, private router: Router, private exerciseService: ExerciseService) {}

  ngOnInit(): void {
      this.route.paramMap.subscribe((params) => {
        const workoutId = params.get('id');
        this.subscription = this.workoutService.getWorkoutById(String(workoutId)).subscribe((workout) => {
          workout.date = new Date(workout.date);
          this.workout = workout;
        })
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  createSet(set: ISet): void {
   return;
  }

}
