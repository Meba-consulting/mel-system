import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { Observable } from 'rxjs';
import { ActivityTrackerService } from '../../services/activity-tracker.service';

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.css'],
})
export class AddActivityComponent implements OnInit {
  @Input() key: string;
  @Input() indicators: any[];
  activityDetails$: Observable<any>;
  showFormForAddingNewObjective: boolean = false;
  objectiveForm: FormGroup;
  saving: boolean = false;
  isEditSet: boolean = false;
  currentObjectiveId: string;
  currentOutComes: any[];
  constructor(
    private activityService: ActivityTrackerService,
    private httpClient: NgxDhis2HttpClientService
  ) {}

  ngOnInit(): void {
    this.activityDetails$ = this.activityService.getActivityDetailsByKey(
      this.key
    );
  }

  onSave(e, objectives, values) {
    e.stopPropagation();
    let newObjectives = objectives;
    this.saving = true;
    this.httpClient.get('system/id.json').subscribe((res) => {
      if (res) {
        const newObjective = {
          id: this.isEditSet ? this.currentObjectiveId : res['codes'][0],
          name: values?.name,
          label: values?.label,
          description: values?.description,
          outComes: this.isEditSet ? this.currentOutComes : [],
        };

        newObjectives = this.isEditSet
          ? newObjectives.map((objective) => {
              if (objective?.id == newObjective?.id) {
                return newObjective;
              } else {
                return objective;
              }
            })
          : [...newObjectives, newObjective];
        this.activityService
          .saveActivityTrackerDetails(this.key, newObjectives)
          .subscribe((response) => {
            if (response) {
              this.saving = false;
              this.isEditSet = false;
              this.showFormForAddingNewObjective = !this
                .showFormForAddingNewObjective;
              this.activityDetails$ = this.activityService.getActivityDetailsByKey(
                this.key
              );
            }
          });
      }
    });
  }

  onAddNewObjective(e, key) {
    e.stopPropagation();
    this.showFormForAddingNewObjective = !this.showFormForAddingNewObjective;
    this.objectiveForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(8)]),
      label: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      description: new FormControl('', [Validators.minLength(8)]),
    });
  }

  onEditObjective(objective) {
    this.showFormForAddingNewObjective = true;
    this.objectiveForm = new FormGroup({
      name: new FormControl(objective.name, [
        Validators.required,
        Validators.minLength(8),
      ]),
      label: new FormControl(objective.label, [
        Validators.required,
        Validators.minLength(8),
      ]),
      description: new FormControl(objective.description, [
        Validators.minLength(8),
      ]),
    });
    this.isEditSet = true;
    this.currentObjectiveId = objective?.id;
    this.currentOutComes = objective?.outComes;
  }

  onCancel(e) {
    e.stopPropagation();
    this.isEditSet = false;
    this.showFormForAddingNewObjective = false;
  }
}
