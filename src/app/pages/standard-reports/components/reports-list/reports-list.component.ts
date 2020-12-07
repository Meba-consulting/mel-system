import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { formatReportsForDataTable } from '../../helpers/format-list-of-reports-for-datatable.helper';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-reports-list',
  templateUrl: './reports-list.component.html',
  styleUrls: ['./reports-list.component.css']
})
export class ReportsListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @Input() reports: Array<any>;
  @Input() currentUser: any;
  @Input() reportGroup: any;
  page: number = 1;
  itemsPerPage: number = 10;
  searchingItem: string = '';
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(
      formatReportsForDataTable(this.reports, this.reportGroup)
    );
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  displayedColumns: string[] = ['position', 'name', 'action'];
  dataSource: any;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
