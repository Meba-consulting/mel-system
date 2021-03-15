import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { Observable } from 'rxjs';
import { ActivityTrackerService } from '../../services/activity-tracker.service';

import { filter } from 'lodash';

@Component({
  selector: 'app-output-modal',
  templateUrl: './output-modal.component.html',
  styleUrls: ['./output-modal.component.css'],
})
export class OutputModalComponent implements OnInit {
  outCome: any;
  key: string;
  objectives: any;
  currentObjective: any;
  outputForm: FormGroup;
  saving: boolean = false;
  showOutputForm: boolean = false;
  currentOutput: any;
  showActivityForm: boolean = false;
  activityForm: FormGroup;
  showActivityFor: any = {};
  indicators$: Observable<any>;
  showOptionSelector: boolean = false;
  selectedIndicator: any;
  searchString: string = '';
  currentActivity: any;
  savingActivity: boolean = false;
  responsibles$: Observable<any>;
  responsible: any;
  showResponsibleSelector: boolean = false;
  isEditActivitySet: boolean = false;
  constructor(
    private dialogRef: MatDialogRef<OutputModalComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private httpClient: NgxDhis2HttpClientService,
    private activityService: ActivityTrackerService
  ) {
    this.outCome = data?.outCome;
    this.key = data?.key;
    this.objectives = data?.objectives;
    this.currentObjective = data?.objective;
    this.indicators$ = activityService.getIndicators();
    this.responsibles$ = activityService.getResponsibleList();
  }

  ngOnInit(): void {}

  onClose(e) {
    e.stopPropagation();
    this.dialogRef.close(this.outCome);
  }

  onAddNewOutput(e) {
    e.stopPropagation();
    this.showOutputForm = true;
    this.currentOutput = null;
    this.outputForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(8)]),
      label: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      description: new FormControl('', [Validators.minLength(8)]),
    });
  }

  onSaveOutput(e, formValues) {
    e.stopPropagation();
    this.saving = true;
    this.httpClient.get('system/id.json').subscribe((res) => {
      if (res) {
        const newOutput = {
          id: this.currentOutput ? this.currentOutput?.id : res['codes'][0],
          name: formValues?.name,
          label: formValues?.label,
          description: formValues?.description,
          activities: this.currentOutput ? this.currentOutput?.activities : [],
        };
        this.outCome.outputs = this.currentOutput
          ? this.outCome.outputs.map((item) => {
              if (item?.id === newOutput?.id) {
                return newOutput;
              } else {
                return item;
              }
            })
          : [...this.outCome.outputs, newOutput];

        this.currentOutput = newOutput;
        this.currentObjective.outComes = this.currentObjective.outComes.map(
          (item) => {
            if (item?.id === this.outCome?.id) {
              return this.outCome;
            } else {
              return item;
            }
          }
        );
        this.objectives = this.objectives.map((obj) => {
          if (obj.id === this.currentObjective?.id) {
            return this.currentObjective;
          } else {
            return obj;
          }
        });
        this.activityService
          .saveActivityTrackerDetails(this.key, this.objectives)
          .subscribe((response) => {
            if (response) {
              this.saving = false;
              this.showOutputForm = false;
            }
          });
      }
    });
  }

  onEditOutput(e, output) {
    e.stopPropagation();
    this.currentOutput = output;
    this.outputForm = new FormGroup({
      name: new FormControl(output?.name, [
        Validators.required,
        Validators.minLength(8),
      ]),
      label: new FormControl(output?.label, [
        Validators.required,
        Validators.minLength(8),
      ]),
      description: new FormControl(output?.description, [
        Validators.minLength(8),
      ]),
    });
    this.showOutputForm = true;
  }

  onAddActivity(e, output) {
    e.stopPropagation();
    this.currentOutput = output;
    this.showActivityFor[output?.id] = true;
    this.showActivityForm = true;
    this.currentActivity = null;
    this.activityForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(8)]),
      label: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      description: new FormControl('', [Validators.minLength(8)]),
      target: new FormControl('', Validators.required),
      indicator: new FormControl(''),
      responsible: new FormControl(''),
    });
  }

  onViewActivities(e, output) {
    e.stopPropagation();
    this.showActivityFor[output?.id] = true;
    this.showActivityForm = false;
    this.currentOutput = output;
  }
  onOptionFilterUpdate(selectedOption, type) {
    console.log(selectedOption);
  }

  toggleOptionSelector(e) {
    e.stopPropagation();
    this.showOptionSelector = !this.showOptionSelector;
  }

  toggleResponsibleSelector(e) {
    e.stopPropagation();
    this.showResponsibleSelector = !this.showResponsibleSelector;
  }

  hideOptionSection(e) {
    e.stopPropagation();
    this.showOptionSelector = false;
  }

  onSearch(e) {
    e.stopPropagation();
    this.searchString = e.target.value;
  }

  onSelectOption(event, option) {
    event.stopPropagation();
    this.selectedIndicator = option;
  }

  onSelectResponsibleOption(e, option) {
    e.stopPropagation();
    this.responsible = option;
  }

  onRemoveItem(option, items) {
    // const removedItem = _.find(items, ['id', option ? option.id : undefined]);
    // const itemIndex = items.indexOf(removedItem);
    // if (itemIndex !== -1) {
    //   items = [...items.slice(0, itemIndex), ...items.slice(itemIndex + 1)];
    // }
    // return items;
  }

  onSelectionChange(e, options) {
    filter(options, { id: e.value })[0];
  }

  onSaveActivity(e, output, formValues) {
    e.stopPropagation();
    this.currentOutput = output;
    this.savingActivity = true;
    this.httpClient.get('system/id.json').subscribe((res) => {
      if (res) {
        const newActivity = {
          id: this.currentActivity ? this.currentActivity?.id : res['codes'][0],
          name: formValues?.name,
          label: formValues?.label,
          description: formValues?.description,
          indicator: this.selectedIndicator,
          target: formValues.target,
          responsible: this.responsible,
        };
        this.currentOutput.activities = this.currentActivity
          ? this.currentOutput.activities.map((activity) => {
              if (activity?.id === newActivity?.id) {
                return newActivity;
              } else {
                return activity;
              }
            })
          : [...this.currentOutput.activities, newActivity];

        this.currentActivity = newActivity;

        this.outCome.outputs = this.outCome.outputs.map((item) => {
          if (item?.id === this.currentOutput?.id) {
            return this.currentOutput;
          } else {
            return item;
          }
        });
        this.currentObjective.outComes = this.currentObjective.outComes.map(
          (item) => {
            if (item?.id === this.outCome?.id) {
              return this.outCome;
            } else {
              return item;
            }
          }
        );
        this.objectives = this.objectives.map((obj) => {
          if (obj.id === this.currentObjective?.id) {
            return this.currentObjective;
          } else {
            return obj;
          }
        });
        this.activityService
          .saveActivityTrackerDetails(this.key, this.objectives)
          .subscribe((response) => {
            if (response) {
              this.savingActivity = false;
              this.showActivityForm = false;
            }
          });
      }
    });
  }

  onDeleteActivity(e, output, currentActivity) {
    e.stopPropagation();
    this.currentOutput = output;

    this.currentOutput.activities = this.currentOutput.activities.filter(
      (activity) => {
        if (activity?.id !== currentActivity?.id) {
          return activity;
        }
      }
    );

    this.outCome.outputs = this.outCome.outputs.map((item) => {
      if (item?.id === this.currentOutput?.id) {
        return this.currentOutput;
      } else {
        return item;
      }
    });
    this.currentObjective.outComes = this.currentObjective.outComes.map(
      (item) => {
        if (item?.id === this.outCome?.id) {
          return this.outCome;
        } else {
          return item;
        }
      }
    );

    this.objectives = this.objectives.map((obj) => {
      if (obj.id === this.currentObjective?.id) {
        return this.currentObjective;
      } else {
        return obj;
      }
    });
    this.activityService
      .saveActivityTrackerDetails(this.key, this.objectives)
      .subscribe((response) => {
        if (response) {
          this.savingActivity = false;
          this.showActivityForm = false;
          this.currentActivity = null;
        }
      });
  }

  onEditActivity(e, activity) {
    e.stopPropagation();
    this.currentActivity = activity;
    this.selectedIndicator = activity?.indicator;
    this.responsible = activity?.responsible;
    this.showActivityFor[this.currentOutput?.id] = true;
    this.showActivityForm = true;
    this.activityForm = new FormGroup({
      name: new FormControl(activity?.name, [
        Validators.required,
        Validators.minLength(8),
      ]),
      label: new FormControl(activity?.label, [
        Validators.required,
        Validators.minLength(8),
      ]),
      description: new FormControl(activity?.description, [
        Validators.minLength(8),
      ]),
      target: new FormControl(activity.target, Validators.required),
      indicator: new FormControl(''),
      responsible: new FormControl(''),
    });
  }
}
