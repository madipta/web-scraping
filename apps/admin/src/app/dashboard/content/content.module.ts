import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { ContentComponent } from "./content.component";

const routes: Routes = [
  {
    path: "",
    component: ContentComponent,
  },
];

@NgModule({
  declarations: [ContentComponent],
  imports: [RouterModule.forChild(routes), SharedModule],
})
export class ContentModule {}
