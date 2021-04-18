import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { LinkUpdateComponent } from "./link-update.component";

const routes: Routes = [
  {
    path: "",
    component: LinkUpdateComponent,
  },
];

@NgModule({
  declarations: [LinkUpdateComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class LinkUpdateModule {}
