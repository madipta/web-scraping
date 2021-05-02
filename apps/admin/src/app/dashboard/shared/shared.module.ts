import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NzPageHeaderModule } from "ng-zorro-antd/page-header";
import { NzMenuModule } from "ng-zorro-antd/menu";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzTableModule } from "ng-zorro-antd/table";
import { NzDividerModule } from "ng-zorro-antd/divider";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzCheckboxModule } from "ng-zorro-antd/checkbox";
import { NzSelectModule } from "ng-zorro-antd/select";
import { NzMessageModule } from "ng-zorro-antd/message";
import { NzPopconfirmModule } from "ng-zorro-antd/popconfirm";
import { NzToolTipModule } from "ng-zorro-antd/tooltip";
import { DomainNamePipe } from "./pipes/domain-name.pipe";
import { ChecklistComponent } from "./components/checklist/checklist.component";
import { CommonModule } from "@angular/common";
import { UrlPathPipe } from "./pipes/url-path.pipe";

const modules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  NzPageHeaderModule,
  NzMenuModule,
  NzIconModule,
  NzTableModule,
  NzDividerModule,
  NzFormModule,
  NzButtonModule,
  NzInputModule,
  NzCheckboxModule,
  NzSelectModule,
  NzMessageModule,
  NzPopconfirmModule,
  NzToolTipModule,
];

const declarations = [DomainNamePipe, ChecklistComponent, UrlPathPipe];

@NgModule({
  declarations: [...declarations],
  imports: [...modules],
  exports: [...modules, ...declarations],
})
export class SharedModule {}
