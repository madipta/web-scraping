import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: "table-search",
  styleUrls: ["./table-search.component.scss"],
  template: `
    <div class="search-bar">
      <button (click)="refreshClick()" class="refresh-btn">
        <i nz-icon nzType="thunderbolt" nzTheme="fill"></i>
        Refresh
      </button>
      <div style="flex: 1 1 0%"></div>
      <div class="search-box">
        <input
          placeholder="min 3 chars"
          #txtSearch
          [value]="searchText"
          class="search-input"
        />
        <button (click)="resetClick()" class="reset-btn">
          <i nz-icon nzType="delete" nzTheme="fill"></i>
        </button>
      </div>
      <button (click)="searchClick(txtSearch.value)" class="search-btn">
        <i nz-icon nzType="search" nzTheme="outline"></i>
      </button>
    </div>
  `,
})
export class TableSearchComponent {
  @Input() searchText = "";
  @Output() table_search = new EventEmitter<string>();
  @Output() table_refresh = new EventEmitter();

  resetClick() {
    this.searchText = "";
    this.table_search.emit("");
  }

  searchClick(text) {
    this.table_search.emit(text);
  }

  refreshClick() {
    this.table_refresh.emit();
  }
}
