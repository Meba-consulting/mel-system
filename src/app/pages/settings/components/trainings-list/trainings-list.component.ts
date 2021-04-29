import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { DataService } from 'src/app/core/services/data.service';
import { ConfirmDeleteModalComponent } from 'src/app/shared/components/confirm-delete-modal/confirm-delete-modal.component';
import { SetColumnsModalComponent } from 'src/app/shared/components/set-columns-modal/set-columns-modal.component';

@Component({
  selector: 'app-trainings-list',
  templateUrl: './trainings-list.component.html',
  styleUrls: ['./trainings-list.component.css'],
})
export class TrainingsListComponent implements OnInit {
  @Input() program: any;
  @Input() ouId: string;
  @Input() orgUnit: any;
  @Output() edit = new EventEmitter<any>();
  queryResponseData$: Observable<any>;
  savedUserDataStore$: Observable<any>;
  constructor(private dataService: DataService, private dialog: MatDialog) {}

  ngOnInit(): void {
    // if (this.program.id == 'aEGnQxdU1Ok') {
    //   this.ouId = 'STY2sqTBLiV';
    // }
    this.queryResponseData$ = this.dataService.getTrackedEntityInstances({
      orgUnit: this.ouId,
      program: this.program?.id,
    });

    this.savedUserDataStore$ = this.dataService.getSavedUserDataStoreProgramConfigurations(
      this.program?.id
    );
  }

  onSetDelete(e) {
    this.dialog
      .open(ConfirmDeleteModalComponent, {
        width: '30%',
        height: '250px',
        disableClose: false,
        data: { message: 'Are you sure?', item: '' },
        panelClass: 'custom-dialog-container',
      })
      .afterClosed()
      .subscribe((confirmed) => {
        if (confirmed == true) {
          this.dataService
            .deleteTrackedEntityInstance(e.action?.id)
            .subscribe((response) => {
              if (response) {
                this.queryResponseData$ = this.dataService.getTrackedEntityInstances(
                  {
                    orgUnit: this.ouId,
                    program: this.program?.id,
                  }
                );
              }
            });
        }
      });
  }

  onSetEdit(e) {
    this.edit.emit(e);
  }

  onOpenDialogForSettingClomnsData(columnsInfo) {
    this.dialog
      .open(SetColumnsModalComponent, {
        width: '40%',
        height: '450px',
        disableClose: false,
        data: { columnsInfo: columnsInfo, programId: this.program?.id },
        panelClass: 'custom-dialog-container',
      })
      .afterClosed()
      .subscribe((savedData) => {
        if (savedData) {
          this.queryResponseData$ = this.dataService.getTrackedEntityInstances({
            orgUnit: this.ouId,
            program: this.program?.id,
          });

          this.savedUserDataStore$ = this.dataService.getSavedUserDataStoreProgramConfigurations(
            this.program?.id
          );
        }
      });
  }
}
