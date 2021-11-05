import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import * as _ from 'lodash';
import { DataService } from 'src/app/core/services/data.service';
import { formatDateToYYMMDD } from 'src/app/pages/data-entry/helpers';
import { FormValue } from '../../modules/forms/models/form-value.model';

@Component({
  selector: 'app-update-status-modal',
  templateUrl: './update-status-modal.component.html',
  styleUrls: ['./update-status-modal.component.css'],
})
export class UpdateStatusModalComponent implements OnInit {
  programStage: any;
  program: any;
  eventData: any;
  formFields: any[];
  currentFormData: any = {};
  stagesToUpdateStatus: any;
  configs: any;
  dataElement: any;
  eventsData: any;
  orgUnit: any;
  saving: boolean = false;
  updated: boolean = false;
  stageToCompleteEnrollment: any;
  statusData: any;
  constructor(
    private dialogRef: MatDialogRef<UpdateStatusModalComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private dataService: DataService
  ) {
    this.programStage = data?.programStage;
    this.program = data?.program;
    this.eventData = data?.eventData;
    (this.orgUnit = data?.orgUnit),
      (this.stagesToUpdateStatus =
        data?.programDataStoreConfigs?.stagesToUpdateStatus);
    this.stageToCompleteEnrollment =
      data?.programDataStoreConfigs?.stageToCompleteEnrollment;
    this.dataElement = (this.programStage?.programStageDataElements
      .filter((programStageDataElement) => {
        if (
          programStageDataElement?.dataElement?.id ===
          this.stagesToUpdateStatus[this.programStage?.id]?.dataElement
        ) {
          return programStageDataElement;
        }
      })
      .map((elem) => {
        return {
          id: elem?.dataElement?.id,
          name: elem?.dataElement?.name,
          valueType: elem?.dataElement?.valueType,
          optionSet: elem?.dataElement?.optionSet,
          compulsory: elem?.compulsory,
        };
      }) || [])[0];

    this.currentFormData[this.dataElement?.id] = {
      id: this.dataElement?.id,
      key: this.dataElement?.id,
      value: (this.dataElement?.optionSet?.options.filter(
        (option) => option?.name === this.eventData[this.dataElement?.id]?.value
      ) || [])[0]?.id,
    };
    const optionsFormatted = this.dataElement?.optionSet
      ? _.map(this.dataElement?.optionSet?.options, (option) => {
          return {
            id: option?.id,
            name: option?.name,
            label: option?.name,
            key: option?.id,
          };
        })
      : [];
    this.formFields = [
      {
        id: this.dataElement?.id,
        label: this.dataElement?.name,
        key: this.dataElement?.id,
        options: optionsFormatted,
        shouldSearch: optionsFormatted?.length > 5,
        controlType:
          this.dataElement?.valueType == 'LONG_TEXT'
            ? 'textarea'
            : this.dataElement?.valueType == 'TEXT' &&
              !this.dataElement?.optionSet
            ? 'textbox'
            : this.dataElement?.valueType === 'NUMBER' ||
              this.dataElement?.valueType === 'INTEGER_ZERO_OR_POSITIVE' ||
              this.dataElement?.valueType === 'INTEGER_POSITIVE'
            ? 'number'
            : this.dataElement?.valueType == 'DATE'
            ? 'date'
            : this.dataElement?.optionSet
            ? 'dropdown'
            : this.dataElement?.valueType == 'email'
            ? 'email'
            : this.dataElement?.valueType == 'phoneNumber'
            ? 'phoneNumber'
            : 'textbox',

        type:
          this.dataElement?.valueType == 'INTEGER_ZERO_OR_POSITIVE' ||
          this.dataElement?.valueType == 'INTEGER_POSITIVE' ||
          this.dataElement?.valueType == 'NUMBER'
            ? 'number'
            : null,
        required: true,
      },
    ];
  }

  ngOnInit(): void {
    this.eventsData = {
      trackedEntityInstance: this.eventData?.event?.trackedEntityInstance,
      program: this.program?.id,
      programStage: this.programStage?.id,
      enrollment: this.eventData?.event?.enrollment,
      orgUnit: this.orgUnit?.id,
      notes: [],
      dataValues: this.eventData?.event?.dataValues.filter((dataValue) => {
        if (dataValue?.dataElement !== this.dataElement?.id) {
          return dataValue;
        }
      }),
      status: 'ACTIVE',
      eventDate: new Date(),
    };
  }

  onClose(e) {
    e.stopPropagation();
    this.dialogRef.close(this.updated);
  }

  onFormUpdate(formValues: FormValue) {
    const data = formValues.getValues();
    this.eventsData.dataValues = [
      ...this.eventsData.dataValues,
      {
        dataElement: this.dataElement?.id,
        value: (data[this.dataElement?.id].options.filter(
          (option) => option?.id === data[this.dataElement?.id]?.value
        ) || [])[0]?.name,
      },
    ];
    this.statusData = {
      dataElement: this.dataElement?.id,
      value: (data[this.dataElement?.id].options.filter(
        (option) => option?.id === data[this.dataElement?.id]?.value
      ) || [])[0]?.name,
    };
  }

  onSave(e) {
    e.stopPropagation();
    this.saving = true;
    this.dataService
      .updateEventData(this.eventData?.event?.event, this.eventsData)
      .subscribe((response) => {
        this.updated = true;

        if (
          response &&
          this.stageToCompleteEnrollment?.id === this.programStage?.id &&
          this.statusData &&
          this.stageToCompleteEnrollment?.values?.indexOf(
            this.statusData?.value
          )
        ) {
          const enrollmentData = this.getCompleteEnrollmentObject();
          this.dataService
            .completeEnrollment(enrollmentData?.enrollment, enrollmentData)
            .subscribe((res) => {
              console.log(res);
            });

          this.saving = false;
        } else {
          this.saving = false;
        }
      });
  }

  getCompleteEnrollmentObject() {
    return {
      orgUnit: this.orgUnit?.id,
      program: this.program?.id,
      trackedEntityInstance: this.eventData?.event?.trackedEntityInstance,
      enrollment: this.eventData?.event?.enrollment,
      enrollmentDate: this.eventData?.event?.enrollmentDate,
      followup: false,
      deleted: false,
      incidentDate: this.eventData?.event?.eventDate,
      status: 'COMPLETED',
      relationships: [],
      attributes: [],
    };
  }
}
