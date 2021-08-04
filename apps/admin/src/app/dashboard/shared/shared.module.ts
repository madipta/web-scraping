import { CommonModule } from "@angular/common";
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
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzRadioModule } from "ng-zorro-antd/radio";
import { ChecklistComponent } from "./components/checklist/checklist.component";
import { DomainNamePipe } from "./pipes/domain-name.pipe";
import { UrlPathPipe } from "./pipes/url-path.pipe";
import { LinkPipe } from "./pipes/link.pipe";
import { TableSearchModule } from "./components/table-search/table-search.module";

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
  NzTypographyModule,
  NzRadioModule,
  TableSearchModule
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
