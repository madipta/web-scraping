import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { LinkScrapComponent } from "./link-scrap.component";

const routes: Routes = [
  {
    path: "",
    component: LinkScrapComponent,
  },
];

@NgModule({
  declarations: [LinkScrapComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class LinkScrapModule {}
