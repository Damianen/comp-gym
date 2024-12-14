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
	LoggedInAuthGuard,
} from '@comp-gym/frontend/features';

export const appRoutes: Route[] = [
	{ path: '', component: HomeComponent },
	{ path: 'about', component: AboutComponent },

	{ path: 'login', component: LoginComponent },
	{ path: 'signup', component: SignupComponent },
	{ path: 'account', component: UserDetailComponent, canActivate: [LoggedInAuthGuard] },
	{ path: 'account/edit', component: UserEditComponent, canActivate: [LoggedInAuthGuard] },

	{ path: 'workouts', component: WorkoutListComponent, canActivate: [LoggedInAuthGuard] },
	{ path: 'workout/new', component: WorkoutEditComponent, canActivate: [LoggedInAuthGuard] },
	{ path: 'workout/edit/:id', component: WorkoutEditComponent, canActivate: [LoggedInAuthGuard] },
	{ path: 'workout/:id', component: WorkoutDetailComponent, canActivate: [LoggedInAuthGuard] },
	{ path: 'workout/:id/exercise/add', component: ExerciseListComponent, canActivate: [LoggedInAuthGuard] },
	{ path: 'workout/:id/exercise/new', component: ExerciseEditComponent, canActivate: [LoggedInAuthGuard] },
	{
		path: 'workout/:id/exercise/edit/:exerciseId',
		component: ExerciseEditComponent,
		canActivate: [LoggedInAuthGuard],
	},

	{ path: '**', redirectTo: '' },
];
