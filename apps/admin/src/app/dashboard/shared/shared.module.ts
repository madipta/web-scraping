import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NzPageHeaderModule } from "ng-zorro-antd/page-header";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzSelectModule } from "ng-zorro-antd/select";

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NzPageHeaderModule,
    NzFormModule,
    NzButtonModule,
    NzInputModule,
    NzSelectModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    NzPageHeaderModule,
    NzFormModule,
    NzButtonModule,
    NzInputModule,
    NzSelectModule,
  ],
})
export class SharedModule {}
