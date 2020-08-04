import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { formatFileResourcesForDataTable } from '../../helpers';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-file-resources-list',
  templateUrl: './file-resources-list.component.html',
  styleUrls: ['./file-resources-list.component.css']
})
export class FileResourcesListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @Input() fileResources: any;
  @Input() dataEntryFlow: any;
  @Input() status: string;
  @Input() currentUser: any;
  displayedColumns: string[] = [
    'created',
    'name',
    'status',
    'currentGroupActed'
  ];
  dataSource: any;
  constructor(
    private httpClient: NgxDhis2HttpClientService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(
      formatFileResourcesForDataTable(
        this.fileResources,
        this.status,
        this.dataEntryFlow,
        this.currentUser
      )
    );
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  downloadFile(file) {
    window.open('../../../api/' + file.downloadPath, '_blank');
  }
}
