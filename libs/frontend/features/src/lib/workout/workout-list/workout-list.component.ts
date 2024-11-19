import { Component, OnDestroy, OnInit } from '@angular/core';
import { IWorkoutIdentity } from '@comp-gym/shared/api';
import { Subscription } from 'rxjs';
import { WorkoutService } from '../workout.service';


@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
})
export class WorkoutListComponent implements OnInit, OnDestroy {
  workouts?: IWorkoutIdentity[];
  subscription?: Subscription;
  constructor(private workoutService: WorkoutService) {}

  ngOnInit(): void {
      this.subscription = this.workoutService.getWorkoutsAsync().subscribe((workouts) => {
        this.workouts = workouts;
      })
  }

  ngOnDestroy(): void {
      this.subscription?.unsubscribe();
  }
}
