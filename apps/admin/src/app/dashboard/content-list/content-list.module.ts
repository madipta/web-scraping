import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { ContentListComponent } from "./content-list.component";

const routes: Routes = [
  {
    path: "",
    component: ContentListComponent,
  },
];

@NgModule({
  declarations: [ContentListComponent],
  imports: [RouterModule.forChild(routes), SharedModule],
})
export class ContentListModule {}
