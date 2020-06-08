import {
  Component,
  OnInit,
  Input,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import * as _ from 'lodash';
import { tap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { formatResourcesForDataTable } from '../../helpers/format-resources-for-datatable.helper';

@Component({
  selector: 'app-resources-list',
  templateUrl: './resources-list.component.html',
  styleUrls: ['./resources-list.component.css']
})
export class ResourcesListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @Input() resources: Array<any>;
  @Input() currentUser: any;
  displayedColumns: string[] = ['position', 'name', 'type', 'action'];
  dataSource: any;

  constructor() {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(
      formatResourcesForDataTable(this.resources)
    );
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openResource(url) {
    window.open(url, '_blank');
  }
}
