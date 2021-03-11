import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SettingsService } from 'src/app/core/services/settings.service';
import { formatDateToYYMMDD } from 'src/app/pages/data-entry/helpers';
import { getProgramById, getProgramsLoadedState, State } from 'src/app/store';

import * as _ from 'lodash';

@Component({
  selector: 'app-form-entry-modal',
  templateUrl: './form-entry-modal.component.html',
  styleUrls: ['./form-entry-modal.component.css'],
})
export class FormEntryModalComponent implements OnInit {
  ou: any;
  programId: string;
  programsLoadedState$: Observable<boolean>;
  program$: Observable<any>;
  savingData: boolean = false;
  formData: any;
  isFormValid: boolean = false;
  isItemAdded: boolean = false;
  constructor(
    private dialogRef: MatDialogRef<FormEntryModalComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private store: Store<State>,
    private settingsService: SettingsService
  ) {
    this.ou = data?.ou;
    this.programId = data?.programId;
  }

  ngOnInit(): void {
    this.programsLoadedState$ = this.store.select(getProgramsLoadedState);
    this.program$ = this.store.select(getProgramById, {
      id: this.programId,
    });
  }

  onClose(e) {
    e.stopPropagation();
    this.dialogRef.close();
  }

  onCheckFormValidity(valid) {
    this.isFormValid = valid;
  }

  onSave(e, trackedEntityType) {
    e.stopPropagation();
    const trackedEntityAttributes = _.map(
      trackedEntityType?.trackedEntityTypeAttributes,
      (attribute) => {
        return {
          id: attribute?.trackedEntityAttribute?.id,
          name: attribute?.trackedEntityAttribute?.name,
        };
      }
    );
    const data = {
      trackedEntityType: trackedEntityType?.id,
      orgUnit: this.ou?.uid,
      attributes: _.map(Object.keys(this.formData), (key) => {
        return {
          attribute: key,
          value:
            (_.filter(trackedEntityAttributes, {
              id: key,
            }) || [])[0]?.valueType == 'DATE'
              ? formatDateToYYMMDD(this.formData[key]?.value)
              : this.formData[key]?.options?.length === 0
              ? this.formData[key]?.value
              : (this.formData[key]?.options.filter(
                  (option) => option?.id === this.formData[key]?.value
                ) || [])[0]?.name,
        };
      }),
    };
    // console.log('data::::::::', data);
    var d = new Date();

    d.setHours(d.getHours() - 9);
    this.savingData = true;
    this.settingsService
      .saveTrackedEntityInstanceData(data)
      .subscribe((response) => {
        const enrollmentsData = {
          trackedEntityInstance: response['response']['importSummaries'][0][
            'href'
          ].split('trackedEntityInstances/')[1],
          program: this.programId,
          status: 'ACTIVE',
          orgUnit: this.ou?.uid,
          enrollmentDate: formatDateToYYMMDD(
            new Date(d.setHours(d.getHours() - 9))
          ),
          incidentDate: formatDateToYYMMDD(
            new Date(d.setHours(d.getHours() - 9))
          ),
        };
        this.settingsService
          .saveEnrollments(enrollmentsData)
          .subscribe((enRollResponse) => {
            this.isItemAdded = true;
            this.savingData = false;
          });
      });
  }

  onGetFormData(e) {
    this.formData = e;
    console.log('formData', this.formData);
  }
}
