import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { WorkoutDetailComponent } from "./workout/workout-detail/workout-detail.component";
import { WorkoutListComponent } from "./workout/workout-list/workout-list.component";
import { RouterModule } from "@angular/router";

@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [WorkoutDetailComponent, WorkoutListComponent]
})
export class FeaturesModule {}