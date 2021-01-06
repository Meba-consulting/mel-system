import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { filterTrainingPrograms } from '../../helpers';

import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';

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
    reportUse: false,
    additionalQueryFields: [],
    batchSize: 400,
    selectedOrgUnitItems: [],
  };
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
  isReportSet: boolean = true;
  deleting: boolean = false;
  deleted: boolean = false;

  selectedTab = new FormControl(0);
  currentTabValue = 0;
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.trainingRegistrationPrograms = filterTrainingPrograms(this.programs);
    this.currentProgram = this.trainingRegistrationPrograms[0];
  }

  onToggleReportAndTraining(e) {
    e.stopPropagation();
    this.isReportSet = !this.isReportSet;
  }

  onFilterUpdate(selections) {
    console.log(selections);
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

    this.attributeValues = [
      ...this.attributeValues,
      {
        attribute: 'C1i3bPWYBRG',
        value: this.selectedOu?.id,
      },
    ];
  }

  onGetFormValidity(validity) {
    this.isFormValid = validity;
  }

  onSaveData(e) {
    e.stopPropagation();
    this.savingMessage = 'Saving data';
    this.savingData = true;
    this.savedData = false;
    this.currentTrackedEntityInstanceId = this.systemIds[0];
    let data = {
      orgUnit: 'zs9X8YYBOnK',
      trackedEntityInstance: this.systemIds[0],
      trackedEntityType: this.currentProgram?.trackedEntityType?.id,
      programOwners: [
        {
          ownerOrgUnit: 'zs9X8YYBOnK',
          program: this.currentProgram?.id,
          trackedEntityInstance: this.systemIds[0],
        },
      ],
      enrollments: [
        {
          orgUnit: 'zs9X8YYBOnK',
          program: this.currentProgram?.id,
          trackedEntityInstance: this.systemIds[0],
          enrollment: this.systemIds[0],
          trackedEntityType: this.currentProgram?.trackedEntityType?.id,
          orgUnitName: 'LHRC Tanzania',
          events: [],
        },
      ],
      relationships: [],
      attributes: this.attributeValues,
    };

    this.dataService
      .saveTrackedEntityInstanceAndAssociatedData(data)
      .subscribe((response) => {
        if (response) {
          this.savingMessage = 'Saved successfully';
          this.savingData = false;
          this.savedData = true;
          setTimeout(() => {
            this.savingMessage = '';
            this.editData = true;
          }, 1000);
        }
      });
  }

  changeTab(e, val) {
    e.stopPropagation();
    this.selectedTab.setValue(val);
    this.currentTabValue = val;
  }

  onSetDelete(e) {
    this.deleting = true;
    this.deleted = false;
    this.dataService
      .deleteTrackedEntityInstance(e.action?.id)
      .subscribe((response) => {
        if (response) {
          this.deleting = false;
          this.deleted = true;
        }
      });
  }

  onSetEdit(trackedEntityInstance, program) {
    _.map(
      program.trackedEntityType?.trackedEntityTypeAttributes,
      (attribute) => {
        if (attribute?.trackedEntityAttribute?.id !== 'C1i3bPWYBRG') {
          this.formData[attribute?.trackedEntityAttribute?.id] = {
            id: attribute?.trackedEntityAttribute?.id,
            value: trackedEntityInstance[attribute?.trackedEntityAttribute?.id],
          };
        }
      }
    );
    this.isReportSet = false;
  }
}
