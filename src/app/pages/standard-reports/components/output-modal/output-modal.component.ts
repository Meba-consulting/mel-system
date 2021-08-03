import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { Observable } from 'rxjs';
import { ActivityTrackerService } from '../../services/activity-tracker.service';

import { filter, keyBy } from 'lodash';
import { TargetsSettingsComponent } from '../targets-settings/targets-settings.component';

@Component({
  selector: 'app-output-modal',
  templateUrl: './output-modal.component.html',
  styleUrls: ['./output-modal.component.css'],
})
export class OutputModalComponent implements OnInit {
  outCome: any;
  currentOutComeSn: string;
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
  showOptionSelector: boolean = false;
  selectedIndicator: any;
  searchString: string = '';
  currentActivity: any;
  savingActivity: boolean = false;
  responsibles$: Observable<any>;
  responsible: any;
  responsiblesSelected: any[] = [];
  showResponsibleSelector: boolean = false;
  isEditActivitySet: boolean = false;
  currentPeriodType: string;
  targetForm: FormGroup;
  targetVariables: any[] = [];
  targets: any = [];
  targetsDisplayed: string = '';

  selectedIndicators: any[] = [];
  sourceIndicators: any[] = [];
  targetIndicators: any[] = [];
  keyedIndicators: any = {};
  constructor(
    private dialogRef: MatDialogRef<OutputModalComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private httpClient: NgxDhis2HttpClientService,
    private activityService: ActivityTrackerService,
    private dialog: MatDialog
  ) {
    this.outCome = data?.outCome;
    this.key = data?.key;
    this.objectives = data?.objectives;
    this.currentObjective = data?.objective;
    this.currentOutComeSn = data?.currentOutComeSn;
    this.sourceIndicators = data?.indicators;
  }

  ngOnInit(): void {
    this.responsibles$ = this.activityService.getResponsibleList();
  }

  onClose(e) {
    e.stopPropagation();
    this.dialogRef.close(this.outCome);
  }

  onAddNewOutput(e) {
    // e.stopPropagation();
    this.showOutputForm = true;
    this.currentOutput = null;
    this.outputForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(8)]),
      label: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      description: new FormControl('', [Validators.minLength(8)]),
      baseline: new FormControl(''),
      targetPerYear: new FormControl(''),
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
          indicators:
            this.targetIndicators.map((indicator) => {
              return {
                ...indicator,
                showOnMatrix: this.keyedIndicators[indicator?.id]?.showOnMatrix,
                targetPerYear:
                  this.keyedIndicators[indicator?.id]?.targetPerYear,
                baseline: this.keyedIndicators[indicator?.id]?.baseline,
              };
            }) || [],
          activities: this.currentOutput ? this.currentOutput?.activities : [],
        };
        // console.log('new', newOutput);
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
    // e.stopPropagation();
    this.currentOutput = output;

    this.targetIndicators = output?.indicators ? output?.indicators : [];
    this.keyedIndicators =
      this.targetIndicators && this.targetIndicators?.length > 0
        ? keyBy(
            this.targetIndicators.map((indicator) => {
              return {
                id: indicator?.id,
                showOnMatrix: indicator?.showOnMatrix,
                targetPerYear: indicator?.targetPerYear,
                baseline: indicator?.baseline,
              };
            }),
            'id'
          )
        : {};
    this.outputForm = new FormGroup({
      name: new FormControl(output?.name, [
        Validators.required,
        Validators.minLength(8),
      ]),
      label: new FormControl(output?.label, [
        Validators.required,
        Validators.minLength(8),
      ]),
      targetPerYear: new FormControl(output?.targetPerYear),
    });
    this.selectedIndicator = output?.indicator;
    this.showOutputForm = true;
  }

  onAddActivity(e, output) {
    // e.stopPropagation();
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
      budget: new FormControl(''),
      indicators: new FormControl(''),
      responsible: new FormControl(''),
    });
  }

  onViewActivities(e, output) {
    // e.stopPropagation();
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

  onSelectionChange(e, options) {
    filter(options, { id: e.value })[0];
  }

  onSaveActivity(e, output, formValues) {
    e.stopPropagation();
    // console.log('formValues', formValues);
    this.currentOutput = output;
    this.savingActivity = true;
    this.httpClient.get('system/id.json').subscribe((res) => {
      if (res) {
        const newActivity = {
          id: this.currentActivity ? this.currentActivity?.id : res['codes'][0],
          name: formValues?.name,
          label: formValues?.label,
          description: formValues?.description,
          budget: formValues?.budget,
          indicators:
            this.targetIndicators.map((indicator) => {
              return {
                ...indicator,
                showOnMatrix: this.keyedIndicators[indicator?.id]?.showOnMatrix,
                targetPerYear:
                  this.keyedIndicators[indicator?.id]?.targetPerYear,
                baseline: this.keyedIndicators[indicator?.id]?.baseline,
              };
            }) || [],
          targets: this.targets,
          responsibles: formValues?.responsibles,
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
    // e.stopPropagation();
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
    // e.stopPropagation();
    this.currentActivity = activity;
    this.selectedIndicator = activity?.indicators;
    this.responsible = activity?.responsible;
    this.responsiblesSelected =
      activity?.responsibles && activity?.responsibles?.length > 0
        ? activity?.responsibles
        : [];
    this.showActivityFor[this.currentOutput?.id] = true;
    this.showActivityForm = true;
    this.targets = this.currentActivity?.targets;

    this.targetIndicators = activity?.indicators ? activity?.indicators : [];
    this.keyedIndicators =
      this.targetIndicators && this.targetIndicators?.length > 0
        ? keyBy(
            this.targetIndicators
              .filter((ind) => ind?.showOnMatrix === true)
              .map((indicator) => {
                return {
                  id: indicator?.id,
                  showOnMatrix: indicator?.showOnMatrix,
                  targetPerYear: indicator?.targetPerYear,
                  baseline: indicator?.baseline,
                };
              }),
            'id'
          )
        : {};
    this.targetsDisplayed = this.formatTargets(this.targets);
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
      budget: new FormControl(activity?.budget),
      responsibles: new FormControl(activity?.responsibles || []),
    });
  }

  openTargetSettings(e, key) {
    e.stopPropagation();
    this.dialog
      .open(TargetsSettingsComponent, {
        width: '40%',
        height: '380px',
        disableClose: false,
        data: {
          key: key,
          targets: this.targets,
        },
        panelClass: 'custom-dialog-container',
      })
      .afterClosed()
      .subscribe((data) => {
        if (data) {
          this.targets = [];
          data.targetVariables.forEach((variable, index) => {
            const valueKey = 'target' + (index + 1);
            this.targets = [
              ...this.targets,
              {
                periodType: data?.periodType,
                target: data?.values[valueKey],
                period: variable?.id,
                periodLabel: variable?.name,
              },
            ];
          });
          this.targetsDisplayed = this.formatTargets(this.targets);
        }
      });
  }

  formatTargets(targets) {
    return targets
      ? targets
          .map((target) => {
            if (target.target) {
              return target?.periodLabel + ' : ' + target.target;
            }
          })
          .filter((formattedTarget) => formattedTarget)
          .join(', ')
      : '';
  }

  getIndicatorSelected(event, indicator) {
    // console.log(event);
    if (event?.target?.checked) {
      this.keyedIndicators[indicator?.id] = this.keyedIndicators[indicator?.id]
        ? { ...this.keyedIndicators[indicator?.id], showOnMatrix: true }
        : { showOnMatrix: true };
    } else {
      this.keyedIndicators[indicator?.id] = this.keyedIndicators[indicator?.id]
        ? { ...this.keyedIndicators[indicator?.id], showOnMatrix: false }
        : { showOnMatrix: false };
    }
  }

  getBaselineValue(event, indicator) {
    this.keyedIndicators[indicator?.id] = this.keyedIndicators[indicator?.id]
      ? {
          ...this.keyedIndicators[indicator?.id],
          baseline: event?.target?.value,
        }
      : { baseline: event?.target?.value };
  }

  getTargetValue(event, indicator) {
    this.keyedIndicators[indicator?.id] = this.keyedIndicators[indicator?.id]
      ? {
          ...this.keyedIndicators[indicator?.id],
          targetPerYear: event?.target?.value,
        }
      : { targetPerYear: event?.target?.value };
  }
}
