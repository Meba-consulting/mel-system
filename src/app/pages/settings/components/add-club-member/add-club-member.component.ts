import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SettingsService } from 'src/app/core/services/settings.service';
import { getProgramById, getProgramsLoadedState, State } from 'src/app/store';

import * as _ from 'lodash';
import { formatDateToYYMMDD } from 'src/app/pages/data-entry/helpers';

@Component({
  selector: 'app-add-club-member',
  templateUrl: './add-club-member.component.html',
  styleUrls: ['./add-club-member.component.css'],
})
export class AddClubMemberComponent implements OnInit {
  programId: string = 'xZXKsYVQZAf';
  club: any;
  clubMemberRegistrationProgram$: Observable<any>;
  programsLoadedState$: Observable<boolean>;
  isFormValid: boolean = false;
  isMemberAdded: boolean = false;
  formData: any;
  savingData: boolean = false;
  constructor(
    private dialogRef: MatDialogRef<AddClubMemberComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private store: Store<State>,
    private settingsService: SettingsService
  ) {
    this.club = data;
  }

  ngOnInit(): void {
    this.programsLoadedState$ = this.store.select(getProgramsLoadedState);
    this.clubMemberRegistrationProgram$ = this.store.select(getProgramById, {
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

  onSaveMemberDetails(e, trackedEntityType) {
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
      orgUnit: this.club?.uuid,
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
          orgUnit: this.club?.uuid,
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
            this.isMemberAdded = true;
            this.savingData = false;
          });
      });
  }

  onGetFormData(e) {
    this.formData = e;
    console.log('formData', this.formData);
    // console.log('club', this.club);
  }
}
