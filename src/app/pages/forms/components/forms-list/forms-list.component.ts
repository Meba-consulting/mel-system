import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { formatResourcesForDataTable } from '../../helpers/format-resources.helper';

@Component({
  selector: 'app-forms-list',
  templateUrl: './forms-list.component.html',
  styleUrls: ['./forms-list.component.css']
})
export class FormsListComponent implements OnInit {
  @Input() forms: Array<any>;
  @Input() currentUser: any;
  displayedColumns: string[] = ['position', 'name', 'type', 'action'];
  dataSource: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor() {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(
      formatResourcesForDataTable(this.forms)
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
