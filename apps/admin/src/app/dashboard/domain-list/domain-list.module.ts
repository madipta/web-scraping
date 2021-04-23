import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { DomainListComponent } from "./domain-list.component";
import { DomainNamePipe } from './domain-name.pipe';

const routes: Routes = [
  {
    path: "",
    component: DomainListComponent,
  },
];

@NgModule({
  declarations: [DomainListComponent, DomainNamePipe],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class DomainListModule {}
