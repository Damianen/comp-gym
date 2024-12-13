import { Route } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import {
	WorkoutDetailComponent,
	WorkoutListComponent,
	WorkoutEditComponent,
	ExerciseEditComponent,
	ExerciseListComponent,
	LoginComponent,
	SignupComponent,
	UserEditComponent,
	UserDetailComponent,
} from '@comp-gym/frontend/features';

export const appRoutes: Route[] = [
	{ path: '', component: HomeComponent },
	{ path: 'about', component: AboutComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'signup', component: SignupComponent },
	{ path: 'account', component: UserDetailComponent },
	{ path: 'account/edit', component: UserEditComponent },
	{ path: 'workouts', component: WorkoutListComponent },
	{ path: 'workout/new', component: WorkoutEditComponent },
	{ path: 'workout/edit/:id', component: WorkoutEditComponent },
	{ path: 'workout/:id', component: WorkoutDetailComponent },
	{ path: 'workout/:id/exercise/add', component: ExerciseListComponent },
	{ path: 'workout/:id/exercise/new', component: ExerciseEditComponent },
	{
		path: 'workout/:id/exercise/edit/:exerciseId',
		component: ExerciseEditComponent,
	},

	{ path: '**', redirectTo: '' },
];
