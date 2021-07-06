import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { formatReportsForDataTable } from '../../helpers/format-list-of-reports-for-datatable.helper';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { UploadReportComponent } from '../upload-report/upload-report.component';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { SharingSettingsComponent } from 'src/app/shared/components/sharing-settings/sharing-settings.component';

@Component({
  selector: 'app-reports-list',
  templateUrl: './reports-list.component.html',
  styleUrls: ['./reports-list.component.css'],
})
export class ReportsListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @Input() reports: Array<any>;
  @Input() currentUser: any;
  @Input() reportGroup: any;
  @Input() userGroups: any[];
  page: number = 1;
  itemsPerPage: number = 10;
  searchingItem: string = '';
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private httpClient: NgxDhis2HttpClientService
  ) {}

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

  onAddNewReport(e, reportGroup) {
    e.stopPropagation();
    this.dialog.open(UploadReportComponent, {
      width: '40%',
      height: '270px',
      disableClose: true,
      data: { reportGroup: reportGroup, report: null },
      panelClass: 'custom-dialog-container',
    });
  }

  onEdit(e, report, reportGroup) {
    e.stopPropagation();
    this.dialog.open(UploadReportComponent, {
      width: '40%',
      height: '270px',
      disableClose: true,
      data: { reportGroup: reportGroup, report: report },
      panelClass: 'custom-dialog-container',
    });
  }

  onOpenSharingSettings(e, item) {
    e.stopPropagation();
    this.dialog.open(SharingSettingsComponent, {
      width: '50%',
      height: '570px',
      disableClose: true,
      data: {
        resource: item,
        groups: this.userGroups,
        resourceUrl: 'reports/' + item?.id,
        sharingSettingsUrl: 'sharing?type=report&id=' + item?.id,
      },
      panelClass: 'custom-dialog-container',
    });
  }
}
