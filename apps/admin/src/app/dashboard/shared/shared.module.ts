import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NzPageHeaderModule } from "ng-zorro-antd/page-header";
import { NzTableModule } from "ng-zorro-antd/table";
import { NzDividerModule } from "ng-zorro-antd/divider";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzSelectModule } from "ng-zorro-antd/select";
import { NzPopconfirmModule } from "ng-zorro-antd/popconfirm";

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NzTableModule,
    NzDividerModule,
    NzPageHeaderModule,
    NzFormModule,
    NzButtonModule,
    NzInputModule,
    NzSelectModule,
    NzPopconfirmModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    NzTableModule,
    NzDividerModule,
    NzPageHeaderModule,
    NzFormModule,
    NzButtonModule,
    NzInputModule,
    NzSelectModule,
    NzPopconfirmModule,
  ],
})
export class SharedModule {}
