import { Component, OnDestroy, OnInit } from '@angular/core';
import { IExercise, ExerciseType } from '@comp-gym/shared/api';
import { Subscription, switchMap, of } from 'rxjs';
import { ExerciseService } from '../exercise.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

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
  }[] = Object.entries(ExerciseType).map(([key, value]) => ({ key, value}));

  constructor(private exerciseService: ExerciseService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.sub = this.route.paramMap.pipe(switchMap((params: ParamMap) => {
      if (!params.get('id')) {
        return of({
          _id: null,
          name: '',
          description: '',
          number: 0,
          exerciseType: ExerciseType.Other,
        })
      } else {
        this.exerciseId = String(params.get('id'));
        return this.exerciseService.getExerciseById(String(params.get('id')));
      }
    })).subscribe((exercise) => {
      this.exercise = exercise;
    })
  }

  ngOnDestroy(): void {
      if (this.sub) {
        this.sub.unsubscribe();
      }
  }

  onSubmit(ExerciseInfo: IExercise): void {
    const Exercise = {
      ...ExerciseInfo,
      number: Math.random() * 10000000,
      date: new Date(),
      favorite: false,
      user: null,
      sets: null,
    }

    if (this.exerciseId) {
      this.sub?.add(this.exerciseService.updateExercise(this.exerciseId, Exercise).subscribe(() => {
        this.router.navigate(['../../' + this.exerciseId], { relativeTo: this.route });
      }))
    } else {
      this.sub?.add(this.exerciseService.createExercise({...Exercise, _id: null}).subscribe(() => {
        this.router.navigate(['../../Exercises'], { relativeTo: this.route });
      }))
    }
  }

  deleteExercise() {
    this.sub?.add(this.exerciseService.deleteExercise(String(this.exerciseId)).subscribe(() => {
      this.router.navigate(['../../../workouts'], { relativeTo: this.route })
    }))
  }
}