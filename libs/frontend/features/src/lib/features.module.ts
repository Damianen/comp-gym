import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WorkoutDetailComponent } from './workout/workout-detail/workout-detail.component';
import { WorkoutListComponent } from './workout/workout-list/workout-list.component';
import { RouterModule } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { WorkoutService } from './workout/workout.service';
import { WorkoutEditComponent } from './workout/workout-edit/workout-edit.component';
import { ExerciseEditComponent } from './exercise/exercise-edit/exercise-edit.component';
import { ExerciseService } from './exercise/exercise.service';
import { ExerciseListComponent } from './exercise/exercise-list/exercise-list.component';

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  declarations: [WorkoutDetailComponent, WorkoutListComponent, WorkoutEditComponent, ExerciseEditComponent, ExerciseListComponent],
  providers: [WorkoutService, ExerciseService, provideHttpClient()],
})
export class FeaturesModule {}
