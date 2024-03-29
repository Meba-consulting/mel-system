import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { PrimeNGConfig } from 'primeng/api';
import { ActivityTrackerService } from '../../services/activity-tracker.service';
import { OutputModalComponent } from '../output-modal/output-modal.component';

import { keyBy } from 'lodash';
import { DeletingItemComponent } from 'src/app/shared/components/deleting-item/deleting-item.component';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-strategic-objectives-list',
  templateUrl: './strategic-objectives-list.component.html',
  styleUrls: ['./strategic-objectives-list.component.css'],
})
export class StrategicObjectivesListComponent implements OnInit {
  @Input() activityDetails: any[];
  activityDetails$: Observable<any[]>;
  @Input() key: string;
  @Input() indicators: any[];
  @Output() editObjective = new EventEmitter<any>();
  showOutComesFor: any = {};
  currentObjective: any;
  outComeForm: FormGroup;
  saving: boolean = false;
  currentOutCome: any;
  isEditOutComeSet: boolean = false;
  selectedIndicators: any[] = [];
  sourceIndicators: any[] = [];
  targetIndicators: any[] = [];
  keyedIndicators: any = {};
  constructor(
    private httpClient: NgxDhis2HttpClientService,
    private activityService: ActivityTrackerService,
    private dialog: MatDialog,
    private primengConfig: PrimeNGConfig
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.sourceIndicators = this.indicators;
    this.selectedIndicators = [];
    this.activityDetails$ = of(this.activityDetails);
  }

  onEdit(e, objective) {
    // e.stopPropagation();
    this.editObjective.emit(objective);
  }

  onAddOutCome(e, objective) {
    this.showOutComesFor[objective?.id] = true;
    this.currentObjective = objective;
    // e.stopPropagation();
    this.outComeForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(8)]),
      label: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      description: new FormControl('', [Validators.minLength(8)]),
    });
  }

  onDeleteObjective(event: Event, objective: any, activityDetails: any): void {
    const filteredData =
      activityDetails.filter(
        (objectiveData) => objectiveData?.id !== objective?.id
      ) || [];
    this.dialog
      .open(DeletingItemComponent, {
        width: '500px',
        data: {
          path: this.key,
          itemName: objective?.label,
          dataStore: true,
          data: filteredData,
        },
      })
      .afterClosed()
      .subscribe((response) => {
        if (response) {
          this.activityDetails = null;
          this.activityDetails$ = of(null);
          setTimeout(() => {
            this.activityDetails = filteredData;
            this.currentObjective = null;
            this.currentOutCome = null;
            this.activityDetails$ = of(filteredData);
          }, 200);
        }
      });
  }

  onDeleteOutCome(
    event: Event,
    outComeToDelete: any,
    objectiveWhereOutComeBelongs: any,
    activityDetails: any[]
  ): void {
    const filteredData = activityDetails.map((objective) => {
      return {
        ...objective,
        outComes:
          objectiveWhereOutComeBelongs?.id === objective?.id
            ? objective?.outComes.filter(
                (outCome) => outCome?.id !== outComeToDelete?.id
              ) || []
            : objective?.outComes,
      };
    });

    this.dialog
      .open(DeletingItemComponent, {
        width: '500px',
        data: {
          path: this.key,
          itemName: outComeToDelete?.name,
          dataStore: true,
          data: filteredData,
        },
      })
      .afterClosed()
      .subscribe((response) => {
        if (response) {
          this.activityDetails = null;
          this.activityDetails$ = of(null);
          setTimeout(() => {
            this.activityDetails = filteredData;
            this.currentObjective = null;
            this.currentOutCome = null;
            this.activityDetails$ = of(filteredData);
          }, 200);
        }
      });
  }

  onViewOuComes(e, objective) {
    // e.stopPropagation();
    this.currentObjective = objective;
    this.showOutComesFor = {};
  }

  onEditOutCome(e, outCome, objective) {
    // e.stopPropagation();
    this.currentObjective = objective;
    this.currentOutCome = outCome;
    this.targetIndicators =
      outCome?.indicators && outCome?.indicators?.length > 0
        ? outCome?.indicators
        : [];
    this.keyedIndicators =
      this.targetIndicators && this.targetIndicators?.length > 0
        ? keyBy(
            this.targetIndicators.map((indicator) => {
              return {
                id: indicator?.id,
                forActivityTracker: indicator?.forActivityTracker,
                showOnMatrix: indicator?.showOnMatrix,
                targetPerYear: indicator?.targetPerYear
                  ? indicator?.targetPerYear
                  : null,
                baseline: indicator?.baseline ? indicator?.baseline : null,
              };
            }),
            'id'
          )
        : {};
    this.outComeForm = new FormGroup({
      name: new FormControl(outCome?.name, [
        Validators.required,
        Validators.minLength(8),
      ]),
      label: new FormControl(outCome?.label, [
        Validators.required,
        Validators.minLength(8),
      ]),
      description: new FormControl(outCome?.description, [
        Validators.minLength(8),
      ]),
    });
    this.showOutComesFor[objective?.id] = true;
    this.isEditOutComeSet = true;
  }

  onAddOutput(e, outCome, currentOutComeSn) {
    this.currentOutCome = outCome;
    // e.stopPropagation();
    this.dialog
      .open(OutputModalComponent, {
        width: '80%',
        minHeight: '400px',
        maxHeight: '700px',
        disableClose: false,
        data: {
          objective: this.currentObjective,
          outCome: this.currentOutCome,
          key: this.key,
          objectives: this.activityDetails,
          currentOutComeSn: currentOutComeSn,
          indicators: this.indicators,
        },
        panelClass: 'custom-dialog-container',
      })
      .afterClosed()
      .subscribe((editedOutCome) => {
        if (outCome) {
          this.currentOutCome = outCome;
          this.currentObjective.outComes = this.currentObjective.outComes.map(
            (outcome) => {
              if (outcome?.id == editedOutCome?.id) {
                return editedOutCome;
              } else {
                return outcome;
              }
            }
          );
        }
      });
  }

  onCancelOpenedObjective(e) {
    e.stopPropagation();
    this.currentObjective = null;
  }

  addOucomeToObjective(e) {
    // e.stopPropagation();
    this.currentOutCome = null;
    this.targetIndicators = [];
    this.showOutComesFor[this.currentObjective?.id] = true;
    this.outComeForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(8)]),
      label: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      description: new FormControl('', [Validators.minLength(8)]),
    });
  }

  onSaveOutCome(e, activityDetails, formValues, selectedIndicators) {
    e.stopPropagation();
    this.saving = true;
    this.httpClient.get('system/id.json').subscribe((res) => {
      if (res) {
        const newOutCome = {
          id: this.isEditOutComeSet ? this.currentOutCome?.id : res['codes'][0],
          name: formValues?.name,
          label: formValues?.label,
          description: formValues?.description,
          indicators: selectedIndicators.map((indicator) => {
            return {
              ...indicator,
              forActivityTracker:
                this.keyedIndicators[indicator?.id]?.forActivityTracker,
              showOnMatrix: this.keyedIndicators[indicator?.id]?.showOnMatrix,
              targetPerYear: this.keyedIndicators[indicator?.id]?.targetPerYear,
              baseline: this.keyedIndicators[indicator?.id]?.baseline,
            };
          }),
          outputs: this.isEditOutComeSet ? this.currentOutCome?.outputs : [],
        };
        this.currentObjective.outComes = this.isEditOutComeSet
          ? this.currentObjective.outComes.map((outcome) => {
              if (outcome?.id == newOutCome?.id) {
                return newOutCome;
              } else {
                return outcome;
              }
            })
          : [...this.currentObjective.outComes, newOutCome];
        this.activityDetails = activityDetails.map((obj) => {
          if (obj?.id === this.currentObjective?.id) {
            return this.currentObjective;
          } else {
            return obj;
          }
        });
        this.activityService
          .saveActivityTrackerDetails(this.key, this.activityDetails)
          .subscribe((response) => {
            if (response) {
              this.saving = false;
            }
          });
      }
    });
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

  getIndicatorSelectedForTracker(event, indicator) {
    // console.log(event);
    if (event?.target?.checked) {
      this.keyedIndicators[indicator?.id] = this.keyedIndicators[indicator?.id]
        ? { ...this.keyedIndicators[indicator?.id], forActivityTracker: true }
        : { forActivityTracker: true };
    } else {
      this.keyedIndicators[indicator?.id] = this.keyedIndicators[indicator?.id]
        ? { ...this.keyedIndicators[indicator?.id], forActivityTracker: false }
        : { forActivityTracker: false };
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
