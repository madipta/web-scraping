import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { LinkListComponent } from "./link-list.component";

const routes: Routes = [
  {
    path: "",
    component: LinkListComponent,
  },
];

@NgModule({
  declarations: [LinkListComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class LinkListModule {}
