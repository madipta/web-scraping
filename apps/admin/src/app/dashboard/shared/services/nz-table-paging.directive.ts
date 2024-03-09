import { Directive, Input, OnInit, Self } from '@angular/core';
import { NzTableComponent } from 'ng-zorro-antd/table';
import { NzTablePaging } from './nz-table-paging';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'nz-table[nzTablePaging]',
  standalone: true,
})
export class NzTablePagingDirective<T = unknown> implements OnInit {
  @Input() nzTablePaging!: NzTablePaging;

  constructor(@Self() private table: NzTableComponent<T>) {}

  ngOnInit(): void {
    this.nzTablePaging.pager$;
    this.table.nzLoading = this.nzTablePaging.loading();
  }
}
