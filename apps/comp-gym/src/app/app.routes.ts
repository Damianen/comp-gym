import { Route } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { WorkoutDetailComponent, WorkoutListComponent } from '@comp-gym/frontend/features';

export const appRoutes: Route[] = [
    { path: '', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'workouts', component: WorkoutListComponent },
    { path: 'workout/:id', component: WorkoutDetailComponent },

    { path: '**', redirectTo: '' }
];
