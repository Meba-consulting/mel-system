import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { filterBillingLawsAndPoliciesPrograms } from '../../helpers';

import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { OuService } from 'src/app/core/services/ou.service';
import { MatDialog } from '@angular/material/dialog';
import { StagesEntryModalComponent } from '../stages-entry-modal/stages-entry-modal.component';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';

@Component({
  selector: 'app-tracker-general-registration',
  templateUrl: './tracker-general-registration.component.html',
  styleUrls: ['./tracker-general-registration.component.css'],
})
export class TrackerGeneralRegistrationComponent implements OnInit {
  @Input() currentUser: any;
  @Input() programs: any[];
  @Input() systemIds: string[];
  @Input() selectedGroup: any;
  @Input() userGroups: any;

  trainingRegistrationPrograms: any[];

  orgUnitFilterConfig: any = {
    singleSelection: true,
    showUserOrgUnitSection: false,
    showOrgUnitLevelGroupSection: false,
    showOrgUnitGroupSection: false,
    showOrgUnitLevelSection: false,
    reportUse: false,
    additionalQueryFields: [],
    batchSize: 400,
    selectedOrgUnitItems: [],
  };
  selectedRegisteringUnits: Array<any> = [];
  selectedOrgUnits: Array<any> = [];
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
  isReportSet: boolean = false;
  hasError: boolean = false;

  selectedTab = new FormControl(0);
  currentTabValue = 0;

  registeringUnitFilterIsSet: boolean = false;

  constructor(
    private dataService: DataService,
    private ouService: OuService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.trainingRegistrationPrograms = filterBillingLawsAndPoliciesPrograms(
      this.programs,
      this.currentUser,
      this.userGroups,
      this.selectedGroup
    );
    this.currentProgram = this.trainingRegistrationPrograms[0];

    this.currentTrackedEntityInstanceId = this.systemIds[0];
  }

  onToggleReport(e) {
    e.stopPropagation();
    this.isReportSet = !this.isReportSet;
    this.hasError = false;
    this.savingData = false;
    this.savedData = false;
    this.savingMessage = '';
    this.formData = {};
  }

  onOuUpdate(selections) {
    this.selectedRegisteringUnits = selections?.items;
    this.registeringUnitFilterIsSet = false;
    this.isReportSet = true;
  }

  onFilterUpdate(selections) {
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

  getTrackedEntityInstanceData(parameters) {
    this.dataService.getRegisteredMembers(parameters);
  }

  getForm(val) {
    this.savedData = false;
    this.savingData = false;
    this.savingMessage = '';
    this.currentProgram = val;
    this.programId = val?.id;
    if (this.ouId && this.programId) {
      const parameters = {
        orgUnit: this.ouId,
        program: this.programId,
      };
      this.paramersSet = true;
      this.getTrackedEntityInstanceData(parameters);
    }
  }

  onToggleOuFilter(e) {
    e.stopPropagation();
    this.ouFilterIsSet = !this.ouFilterIsSet;
  }

  onToggleRegisteringUnitFilter(e) {
    e.stopPropagation();
    this.registeringUnitFilterIsSet = !this.registeringUnitFilterIsSet;
  }

  onGetDataValues(values) {
    this.savedData = false;
    this.savingData = false;
    this.attributeValues = _.map(Object.keys(values), (key) => {
      if (values[key]?.options?.length > 0) {
        return {
          attribute: key,
          value: (_.filter(values[key]?.options, { key: values[key]?.value }) ||
            [])[0]?.label,
        };
      } else {
        return {
          attribute: key,
          value: values[key]?.value,
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
      orgUnit: this.selectedOrgUnits[0]?.id,
      trackedEntityInstance: currentTrackedEntityInstanceId,
      trackedEntityType: currentProgram.trackedEntityType.id,
      programOwners: [
        {
          ownerOrgUnit: this.selectedOrgUnits[0]?.id,
          program: currentProgram?.id,
          trackedEntityInstance: currentTrackedEntityInstanceId,
        },
      ],
      enrollments: !this.editingData
        ? [
            {
              orgUnit: this.selectedOrgUnits[0]?.id,
              program: currentProgram?.id,
              trackedEntityInstance: currentTrackedEntityInstanceId,
              enrollment: this.systemIds[1],
              trackedEntityType: currentProgram?.trackedEntityType?.id,
              orgUnitName: 'LHRC Tanzania',
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
          console.log('program', currentProgram);
          // Check if the program has to accommodate stages entry
          if (
            (
              _.filter(currentProgram?.userGroupAccesses, {
                id: 'H3LCJNIfB0h',
              }) || []
            )?.length > 0
          ) {
            this.dialog.open(StagesEntryModalComponent, {
              maxWidth: '90vw',
              width: '100%',
              height: '650px',
              disableClose: false,
              data: {
                program: currentProgram,
                currentTrackedEntityInstanceId:
                  response?.response?.importSummaries[0]?.reference,
                orgUnit: this.selectedRegisteringUnits[0],
              },
              panelClass: 'custom-dialog-container',
            });
          } else {
            setTimeout(() => {
              this.isReportSet = true;
            }, 1200);
          }
        } else {
          this.savingMessage =
            response?.statusText + ', code: (' + response?.status + ')';
          this.savingData = false;
          this.savedData = false;
          this.hasError = true;
        }
      });
  }

  onUpdateStages(e, program, currentTrackedEntityInstanceId) {
    e.stopPropagation();
    this.dialog.open(StagesEntryModalComponent, {
      maxWidth: '90vw',
      width: '100%',
      height: '650px',
      disableClose: false,
      data: {
        program: program,
        currentTrackedEntityInstanceId: currentTrackedEntityInstanceId,
        orgUnit: this.selectedRegisteringUnits[0],
      },
      panelClass: 'custom-dialog-container',
    });
  }

  changeTab(e, val) {
    e.stopPropagation();
    this.selectedTab.setValue(val);
    this.currentTabValue = val;
  }

  onSetEdit(trackedEntityInstance, program) {
    console.log('trackedEntityInstance', trackedEntityInstance);
    this.currentTrackedEntityInstanceId = trackedEntityInstance?.action?.id;
    _.map(
      program.trackedEntityType?.trackedEntityTypeAttributes,
      (attribute) => {
        if (attribute?.trackedEntityAttribute?.id !== 'C1i3bPWYBRG') {
          this.formData[attribute?.trackedEntityAttribute?.id] = {
            id: attribute?.trackedEntityAttribute?.id,
            value: attribute?.trackedEntityAttribute?.optionSet
              ? (_.filter(
                  _.map(
                    attribute?.trackedEntityAttribute?.optionSet?.options,
                    (option) => {
                      return {
                        id: option?.id,
                        name: option?.name,
                        label: option?.name,
                        key: option?.id,
                      };
                    }
                  ),
                  {
                    name:
                      trackedEntityInstance[
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
}
