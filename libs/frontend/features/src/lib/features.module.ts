import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkoutDetailComponent } from './workout/workout-detail/workout-detail.component';
import { WorkoutListComponent } from './workout/workout-list/workout-list.component';
import { RouterModule } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { WorkoutService } from './workout/workout.service';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [WorkoutDetailComponent, WorkoutListComponent],
  providers: [WorkoutService, provideHttpClient()],
})
export class FeaturesModule {}
