import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { filterTrainingPrograms } from '../../helpers';

import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { OuService } from 'src/app/core/services/ou.service';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { formatDateToYYMMDD } from 'src/app/pages/data-entry/helpers';

@Component({
  selector: 'app-training-registration',
  templateUrl: './training-registration.component.html',
  styleUrls: ['./training-registration.component.css'],
})
export class TrainingRegistrationComponent implements OnInit {
  @Input() currentUser: any;
  @Input() programs: any[];
  @Input() systemIds: string[];

  trainingRegistrationPrograms: any[];

  orgUnitFilterConfig: any = {
    singleSelection: true,
    showUserOrgUnitSection: false,
    showOrgUnitLevelGroupSection: false,
    showOrgUnitGroupSection: false,
    showOrgUnitLevelSection: false,
    updateOnSelect: true,
    reportUse: false,
    additionalQueryFields: [],
    batchSize: 400,
    selectedOrgUnitItems: [],
  };
  selectedRegisteringUnits: any = [];
  selectedOrgUnits: any = [];
  ouFilterIsSet: boolean = false;
  ouId: string;
  programId: string;
  currentProgram: any;
  formData: any = {};
  paramersSet: boolean = false;
  selectedOu: any;

  isFormValid: boolean = false;
  attributeValues: any[];
  currentTrackedEntityInstanceId: string = '';
  currentTrackedEntityInstance$: Observable<any>;

  savingData: boolean = false;
  savedData: boolean = false;
  editData: boolean = false;
  editingData: boolean = false;
  savingMessage: string = '';
  trainingsRegistered$: Observable<any>;
  isReportSet: boolean = true;
  hasError: boolean = false;

  selectedTab = new FormControl(0);
  currentTabValue = 0;
  programDataStoreConfigs$: Observable<any>;
  registeringUnitFilterIsSet: boolean = true;
  systemIds$: Observable<any>;
  constructor(
    private dataService: DataService,
    private ouService: OuService,
    private httpClient: NgxDhis2HttpClientService
  ) {}

  ngOnInit(): void {
    this.trainingRegistrationPrograms = filterTrainingPrograms(this.programs);
    this.currentProgram = this.trainingRegistrationPrograms[0];
    this.getSystemIds();

    this.programDataStoreConfigs$ = this.httpClient.get(
      'dataStore/programs/' + this.currentProgram?.id
    );
  }

  getSystemIds() {
    this.systemIds$ = this.httpClient.get('system/id.json?limit=2');
    this.systemIds$.subscribe((systemIdsResponse) => {
      if (systemIdsResponse) {
        this.systemIds = systemIdsResponse['codes'];
        this.currentTrackedEntityInstanceId = this.systemIds[0];
      }
    });
  }

  onToggleReportAndTraining(e, type) {
    e.stopPropagation();
    this.isReportSet = type === 'new' ? false : true;
    this.hasError = false;
    this.savingData = false;
    this.getSystemIds();
    this.savedData = false;
    this.savingMessage = '';
    this.formData = {};
  }

  onOuFilterUpdate(selections) {
    this.savedData = false;
    this.savingData = false;
    this.savingMessage = '';
    this.ouFilterIsSet = false;
    this.ouId = selections?.items[0]?.id;
    this.selectedOrgUnits = selections?.items;
    this.selectedOu = selections?.items[0];
    if (this.ouId && this.programId) {
      const parameters = {
        orgUnit: this.ouId,
        program: this.programId,
      };
      this.paramersSet = true;
      this.getTrackedEntityInstanceData(parameters);
    }
  }

  onFilterClose(selections) {
    this.ouFilterIsSet = false;
    this.savedData = false;
    this.savingData = false;
    this.savingMessage = '';
  }

  onToggleRegisteringUnitFilter(e) {
    e.stopPropagation();
    this.registeringUnitFilterIsSet = !this.registeringUnitFilterIsSet;
  }

  onOuUpdate(selections) {
    this.selectedRegisteringUnits = selections?.items;
    this.registeringUnitFilterIsSet = false;
    this.isReportSet = true;
  }

  getTrackedEntityInstanceData(parameters) {
    this.dataService.getRegisteredMembers(parameters);
  }

  getForm(val) {
    this.savedData = false;
    this.savingData = false;
    this.savingMessage = '';
    this.currentProgram = val;
    this.programId = val?.id;
    this.isReportSet = true;
    if (this.ouId && this.programId) {
      const parameters = {
        orgUnit: this.ouId,
        program: this.programId,
      };
      this.paramersSet = true;
    }
  }

  onToggleOuFilter(e) {
    e.stopPropagation();
    this.ouFilterIsSet = !this.ouFilterIsSet;
  }

  onGetDataValues(values, currentUser) {
    this.savedData = false;
    this.savingData = false;
    this.attributeValues = _.map(Object.keys(values), (key) => {
      if (values[key]?.options?.length > 0) {
        return {
          attribute: key,
          value: (_.filter(values[key]?.options, { key: values[key]?.value }) ||
            [])[0]?.name,
        };
      } else {
        return {
          attribute: key,
          value:
            typeof values[key]?.value.getMonth === 'function'
              ? formatDateToYYMMDD(values[key]?.value)
              : values[key]?.value
              ? values[key]?.value
              : null,
        };
      }
    });

    this.attributeValues = this.selectedOu?.id
      ? [
          ...this.attributeValues,
          {
            attribute: 'C1i3bPWYBRG',
            value: this.selectedOu?.id,
          },
        ]
      : this.attributeValues;

    this.attributeValues = [
      ...this.attributeValues,
      {
        attribute: 'ek3AWEEIOBJ',
        value: currentUser?.userCredentials?.username,
      },
    ];
  }

  onGetFormValidity(validity) {
    this.isFormValid = validity;
  }

  onSaveData(e, editing, currentTrackedEntityInstanceId, currentProgram) {
    e.stopPropagation();
    this.savingMessage = 'Saving data';
    this.savingData = true;
    this.savedData = false;
    let data = {
      orgUnit: this.selectedRegisteringUnits[0]?.id,
      trackedEntityInstance: currentTrackedEntityInstanceId,
      trackedEntityType: currentProgram.trackedEntityType.id,
      programOwners: [
        {
          ownerOrgUnit: this.selectedRegisteringUnits[0]?.id,
          program: currentProgram?.id,
          trackedEntityInstance: currentTrackedEntityInstanceId,
        },
      ],
      enrollments: !this.editingData
        ? [
            {
              orgUnit: this.selectedRegisteringUnits[0]?.id,
              program: currentProgram?.id,
              trackedEntityInstance: currentTrackedEntityInstanceId,
              enrollment: this.systemIds[1],
              trackedEntityType: currentProgram?.trackedEntityType?.id,
              events: [],
            },
          ]
        : null,
      relationships: [],
      attributes: this.attributeValues,
    };

    data = _.pickBy(data, _.identity);

    this.dataService
      .saveTrackedEntityInstanceAndAssociatedData(
        data,
        editing,
        currentTrackedEntityInstanceId,
        currentProgram
      )
      .subscribe((response) => {
        if (response && response?.status !== 500) {
          this.savingMessage = 'Saved successfully';
          this.savingData = false;
          this.savedData = true;
          this.hasError = false;
          setTimeout(() => {
            this.savingMessage = '';
            this.editData = true;
          }, 1000);
          setTimeout(() => {
            this.isReportSet = true;
          }, 1200);
        } else {
          this.savingMessage =
            response?.statusText + ', code: (' + response?.status + ')';
          this.savingData = false;
          this.savedData = false;
          this.hasError = true;
        }
      });
  }

  changeTab(index) {
    this.selectedRegisteringUnits = null;
    this.registeringUnitFilterIsSet = true;
    this.selectedTab.setValue(index);
    this.currentProgram = this.trainingRegistrationPrograms[index];
    this.programDataStoreConfigs$ = this.httpClient.get(
      'dataStore/programs/' + this.currentProgram?.id
    );
  }

  onSetEdit(trackedEntityInstance, program) {
    // console.log('trackedEntityInstance', trackedEntityInstance);
    this.currentTrackedEntityInstanceId = trackedEntityInstance?.action?.id;
    _.map(
      program.trackedEntityType?.trackedEntityTypeAttributes,
      (attribute) => {
        if (
          attribute?.trackedEntityAttribute?.id !== 'C1i3bPWYBRG' &&
          attribute?.trackedEntityAttribute?.id !== 'ek3AWEEIOBJ'
        ) {
          this.formData[attribute?.trackedEntityAttribute?.id] = {
            id: attribute?.trackedEntityAttribute?.id,
            value: attribute?.trackedEntityAttribute?.optionSet
              ? (_.filter(
                  _.map(
                    attribute?.trackedEntityAttribute?.optionSet?.options,
                    (option) => {
                      return {
                        id: option?.id,
                        name: option?.code,
                        label: option?.name,
                        key: option?.id,
                      };
                    }
                  ),
                  {
                    name: trackedEntityInstance[
                      attribute?.trackedEntityAttribute?.id
                    ],
                  }
                ) || [])[0]?.id
              : trackedEntityInstance[attribute?.trackedEntityAttribute?.id],
          };
        } else {
          this.selectedOu = {
            name: trackedEntityInstance[attribute?.trackedEntityAttribute?.id],
          };
        }
      }
    );
    this.isReportSet = false;
    this.editingData = true;
  }

  onCancel(e) {
    e.stopPropagation();
    this.isReportSet = true;
    this.getSystemIds();
  }
}
