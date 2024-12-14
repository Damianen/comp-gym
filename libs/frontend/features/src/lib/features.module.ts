import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WorkoutDetailComponent } from './workout/workout-detail/workout-detail.component';
import { WorkoutListComponent } from './workout/workout-list/workout-list.component';
import { RouterModule } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { WorkoutService } from './workout/workout.service';
import { WorkoutEditComponent } from './workout/workout-edit/workout-edit.component';
import { ExerciseEditComponent } from './exercise/exercise-edit/exercise-edit.component';
import { ExerciseService } from './exercise/exercise.service';
import { ExerciseListComponent } from './exercise/exercise-list/exercise-list.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthService } from './auth/auth.service';
import { UserDetailComponent } from './user/user-details/user-detail.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { LoggedInAuthGuard } from './auth/auth.guard';
import { LoadingScreenComponent } from './feedback/loading-screen/loading-screen.component';
import { NotificationService } from './feedback/notifications/notification.service';

@NgModule({
	imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
	declarations: [
		WorkoutDetailComponent,
		WorkoutListComponent,
		WorkoutEditComponent,
		ExerciseEditComponent,
		ExerciseListComponent,
		LoginComponent,
		SignupComponent,
		UserDetailComponent,
		UserEditComponent,
		LoadingScreenComponent,
	],
	providers: [
		WorkoutService,
		ExerciseService,
		provideHttpClient(),
		AuthService,
		LoggedInAuthGuard,
		NotificationService,
	],
})
export class FeaturesModule {}
