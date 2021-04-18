import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { ContentListComponent } from "./content-list.component";

const routes: Routes = [
  {
    path: "",
    component: ContentListComponent,
  },
];

@NgModule({
  declarations: [ContentListComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ContentListModule {}
