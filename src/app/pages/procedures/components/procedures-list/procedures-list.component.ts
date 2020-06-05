import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { formatResourcesForDataTable } from '../../helpers/format-resources.helper';

@Component({
  selector: 'app-procedures-list',
  templateUrl: './procedures-list.component.html',
  styleUrls: ['./procedures-list.component.css']
})
export class ProceduresListComponent implements OnInit {
  @Input() procedures: Array<any>;
  @Input() currentUser: any;
  displayedColumns: string[] = ['position', 'name', 'type', 'action'];
  dataSource: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor() {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(
      formatResourcesForDataTable(this.procedures)
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
