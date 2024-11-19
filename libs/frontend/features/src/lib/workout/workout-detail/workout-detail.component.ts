import { Component, OnDestroy, OnInit } from '@angular/core';
import { IWorkoutIdentity } from '@comp-gym/shared/api';
import { WorkoutService } from '../workout.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'lib-workout-detail',
  templateUrl: './workout-detail.component.html',
})
export class WorkoutDetailComponent implements OnInit, OnDestroy {
  workout?: IWorkoutIdentity;
  
  constructor(private workoutService: WorkoutService, private route: ActivatedRoute) {}

  ngOnInit(): void {
      this.route.paramMap.subscribe((params) => {
        var workoutId = params.get('id');
        this.workout = this.workoutService.getWorkoutById(String(workoutId));
      });
  }

  ngOnDestroy(): void {
      
  }

}
