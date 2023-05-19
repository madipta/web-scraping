import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzCheckboxModule } from "ng-zorro-antd/checkbox";
import { NzDividerModule } from "ng-zorro-antd/divider";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzMenuModule } from "ng-zorro-antd/menu";
import { NzMessageModule } from "ng-zorro-antd/message";
import { NzPageHeaderModule } from "ng-zorro-antd/page-header";
import { NzPopconfirmModule } from "ng-zorro-antd/popconfirm";
import { NzRadioModule } from "ng-zorro-antd/radio";
import { NzSelectModule } from "ng-zorro-antd/select";
import { NzTableModule } from "ng-zorro-antd/table";
import { NzToolTipModule } from "ng-zorro-antd/tooltip";
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { ChecklistComponent } from "./components/checklist/checklist.component";
import { DomainNamePipe } from "./pipes/domain-name.pipe";
import { UrlPathPipe } from "./pipes/url-path.pipe";
import { LinkPipe } from "./pipes/link.pipe";

const modules = [
  CommonModule,
  FormsModule,
  NzButtonModule,
  NzCheckboxModule,
  NzDividerModule,
  NzFormModule,
  NzIconModule,
  NzInputModule,
  NzMenuModule,
  NzMessageModule,
  NzPageHeaderModule,
  NzPopconfirmModule,
  NzRadioModule,
  NzSelectModule,
  NzTableModule,
  NzToolTipModule,
  NzTypographyModule,
  ReactiveFormsModule,
];

const declarations = [
  DomainNamePipe,
  ChecklistComponent,
  LinkPipe,
  UrlPathPipe,
];

@NgModule({
  declarations: [...declarations],
  imports: [...modules],
  exports: [...modules, ...declarations],
})
export class SharedModule {}
