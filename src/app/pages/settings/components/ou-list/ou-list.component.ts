import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { formatClubsForDatatableList } from '../../helpers';

@Component({
  selector: 'app-ou-list',
  templateUrl: './ou-list.component.html',
  styleUrls: ['./ou-list.component.css']
})
export class OuListComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @Input() ous: any;
  @Input() categories: any;
  displayedColumns: string[] = [
    'position',
    'region',
    'council',
    'name',
    'action',
  ];
  dataSource: any;
  constructor() { }

  
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(
      formatClubsForDatatableList(this.ous)
    );
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onEditOu(e, ou) {
    e.stopPropagation()
    
  }

}
