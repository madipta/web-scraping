import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { JobsSettingsComponent } from './jobs-settings.component';

const routes: Routes = [
  {
    path: "",
    component: JobsSettingsComponent,
  },
];

@NgModule({
  declarations: [
    JobsSettingsComponent
  ],
  imports: [
    CommonModule, RouterModule.forChild(routes)
  ]
})
export class JobsSettingsModule { }
