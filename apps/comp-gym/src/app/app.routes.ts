import { Route } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { WorkoutDetailComponent, WorkoutListComponent, WorkoutEditComponent, ExerciseEditComponent } from '@comp-gym/frontend/features';

export const appRoutes: Route[] = [
    { path: '', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'workouts', component: WorkoutListComponent },
    { path: 'workout/new', component: WorkoutEditComponent },
    { path: 'workout/edit/:id', component: WorkoutEditComponent },
    { path: 'workout/:id', component: WorkoutDetailComponent },
    { path: 'exercise/new', component: ExerciseEditComponent },
    { path: 'exercise/edit/:id', component: ExerciseEditComponent },
    
    

    { path: '**', redirectTo: '' }
];
