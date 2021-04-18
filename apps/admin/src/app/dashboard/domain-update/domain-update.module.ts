import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { DomainUpdateComponent } from "./domain-update.component";

const routes: Routes = [
  {
    path: "",
    component: DomainUpdateComponent,
  },
];

@NgModule({
  declarations: [DomainUpdateComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class DomainUpdateModule {}
