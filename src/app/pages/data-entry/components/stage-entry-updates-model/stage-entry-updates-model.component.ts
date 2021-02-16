import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/core/services/data.service';
import { ConfirmDeleteModalComponent } from 'src/app/shared/components/confirm-delete-modal/confirm-delete-modal.component';

import * as _ from 'lodash';

@Component({
  selector: 'app-stage-entry-updates-model',
  templateUrl: './stage-entry-updates-model.component.html',
  styleUrls: ['./stage-entry-updates-model.component.css'],
})
export class StageEntryUpdatesModelComponent implements OnInit {
  program: any;
  orgUnit: any;
  currentTrackedEntityInstanceId: string;
  isFormValid: boolean = false;
  selectedTab = new FormControl(0);
  selectedTabForDataSection = new FormControl(0);
  savingMessage: string = '';
  loadStageData: boolean = false;
  queryResponseData$: Observable<any>;
  isEditSet: boolean = false;
  currentEventToEdit: any;
  programStageFormData: any = {};
  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<StageEntryUpdatesModelComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private dataService: DataService
  ) {
    this.program = data?.program;
    this.orgUnit = data?.orgUnit;
    this.currentTrackedEntityInstanceId = data?.currentTrackedEntityInstanceId;
  }

  ngOnInit(): void {}

  onGetFormValidity(validity) {
    this.isFormValid = validity;
  }

  changeTab(e, val) {
    e.stopPropagation();
    this.selectedTab.setValue(val);
  }

  changeTabForData(e, val) {
    e.stopPropagation();
    this.selectedTabForDataSection.setValue(val);
  }

  onDeleteEvent(e) {
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
          this.loadStageData = false;
          this.dataService.deleteEvent(e.event).subscribe((response) => {
            if (response) {
              this.queryResponseData$ = this.dataService.getTrackedEntityInstances(
                {
                  orgUnit: this.orgUnit?.id,
                  program: this.program?.id,
                }
              );
            }
          });
          setTimeout(() => {
            this.loadStageData = true;
          }, 500);
        }
      });
  }

  onEditEvent(e) {
    console.log(e);
    this.currentEventToEdit = e;
    _.map(e.dataValues, (dataValue) => {
      this.programStageFormData[dataValue?.dataElement] = {
        id: dataValue?.dataElement,
        value: dataValue?.value,
      };
    });
    this.selectedTabForDataSection.setValue(0);
  }

  onSetEditEvent(e) {
    this.isEditSet = e;
  }
}
