import { Component, OnDestroy, OnInit } from '@angular/core';
import { IWorkout } from '@comp-gym/shared/api';
import { WorkoutService } from '../workout.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'lib-workout-detail',
  templateUrl: './workout-detail.component.html',
})
export class WorkoutDetailComponent implements OnInit, OnDestroy {
  workout?: IWorkout;
  subscription?: Subscription;
  constructor(private workoutService: WorkoutService, private route: ActivatedRoute) {}

  ngOnInit(): void {
      this.route.paramMap.subscribe((params) => {
        const workoutId = params.get('id');
        this.subscription = this.workoutService.getWorkoutById(String(workoutId)).subscribe((workout) => {
          this.workout = workout;
        })
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
