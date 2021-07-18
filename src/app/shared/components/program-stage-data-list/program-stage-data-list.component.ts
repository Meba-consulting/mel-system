import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { keyBy } from 'lodash';
import { UpdateStatusModalComponent } from '../update-status-modal/update-status-modal.component';

@Component({
  selector: 'app-program-stage-data-list',
  templateUrl: './program-stage-data-list.component.html',
  styleUrls: ['./program-stage-data-list.component.css'],
})
export class ProgramStageDataListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @Input() dataElements: any[];
  @Input() data: any;
  @Input() programStage: any;
  @Input() program: any;
  @Input() programDataStoreConfigs: any;
  @Input() orgUnit: any;
  @Input() currentUser: any;
  @Input() category: string;
  displayedColumns: string[] = [];
  dataSource: any;
  keyedDataElements: any = {};
  @Output() delete = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();
  @Output() updated = new EventEmitter<any>();

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    if (this.dataElements) {
      this.displayedColumns = [
        'position',
        ...(this.dataElements.map((elem) => elem?.dataElement) || []),
        'reportedBy',
        'action',
      ];
      this.keyedDataElements = keyBy(this.dataElements, 'dataElement');

      this.dataSource = new MatTableDataSource(
        this.data
          .map((dataObject, index) => {
            let formattedData = {};
            if (
              !this.category ||
              this.category === 'all' ||
              (this.category && this.category === dataObject?.event?.storedBy)
            ) {
              formattedData['position'] = index + 1;
              this.dataElements.forEach((elem) => {
                formattedData[elem?.dataElement] = dataObject[elem?.dataElement]
                  ? dataObject[elem?.dataElement]?.value
                  : null;
              });
              formattedData['action'] = dataObject;
              formattedData['reportedBy'] = dataObject?.event?.storedBy;
              formattedData['reportedByMe'] =
                (this.category &&
                  this.category === dataObject?.event?.storedBy) ||
                this.currentUser.userCredentials?.username ===
                  dataObject?.event?.storedBy;
              return formattedData;
            } else {
              return null;
            }
          })
          .filter((formattedData) => formattedData)
      );
      this.dataSource.paginator = this.paginator;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onEdit(e, data) {
    e.stopPropagation();
    this.edit.emit(data?.event);
  }

  onDelete(e, data) {
    e.stopPropagation();
    this.delete.emit(data?.event);
  }

  onUpdateStatus(e, data, stagesToUpdateStatus) {
    e.stopPropagation();
    this.dialog
      .open(UpdateStatusModalComponent, {
        width: '30%',
        height: '250px',
        disableClose: false,
        data: {
          programStage: this.programStage,
          program: this.program,
          eventData: data,
          orgUnit: this.orgUnit,
          programDataStoreConfigs: this.programDataStoreConfigs,
        },
        panelClass: 'custom-dialog-container',
      })
      .afterClosed()
      .subscribe((e) => {
        if (e) {
          this.updated.emit(e);
        }
      });
  }
}
