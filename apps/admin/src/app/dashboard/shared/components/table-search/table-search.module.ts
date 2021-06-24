import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzInputModule } from "ng-zorro-antd/input";
import { TableSearchComponent } from "./table-search.component";

@NgModule({
  declarations: [TableSearchComponent],
  imports: [
    CommonModule,
    NzIconModule,
    NzButtonModule,
    NzInputModule,
  ],
  exports: [TableSearchComponent],
})
export class TableSearchModule {}
