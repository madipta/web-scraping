import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { JobsListComponent } from "./jobs-list.component";

const routes: Routes = [
  {
    path: "",
    component: JobsListComponent,
  },
];

@NgModule({
  declarations: [JobsListComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class JobsListModule {}
