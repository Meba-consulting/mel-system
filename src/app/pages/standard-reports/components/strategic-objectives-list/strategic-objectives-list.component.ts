import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { ActivityTrackerService } from '../../services/activity-tracker.service';

@Component({
  selector: 'app-strategic-objectives-list',
  templateUrl: './strategic-objectives-list.component.html',
  styleUrls: ['./strategic-objectives-list.component.css'],
})
export class StrategicObjectivesListComponent implements OnInit {
  @Input() activityDetails: any[];
  @Input() key: string;
  @Output() editObjective = new EventEmitter<any>();
  showOutComesFor: any = {};
  currentObjective: any;
  outComeForm: FormGroup;
  saving: boolean = false;
  constructor(
    private httpClient: NgxDhis2HttpClientService,
    private activityService: ActivityTrackerService
  ) {}

  ngOnInit(): void {}

  onEdit(e, objective) {
    e.stopPropagation();
    this.editObjective.emit(objective);
  }

  onAddOutCome(e, objective) {
    e.stopPropagation();
    this.showOutComesFor[objective?.id] = true;
    this.currentObjective = objective;
    e.stopPropagation();
    this.outComeForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(8)]),
      label: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      description: new FormControl('', [Validators.minLength(8)]),
    });
  }

  onEditOutCome(e, outCome) {
    e.stopPropagation();
  }

  onAddOutput(e, outCome) {
    e.stopPropagation();
  }

  onViewOutputs(e, outCome) {
    e.stopPropagation();
  }

  onCancelOpenedObjective(e) {
    e.stopPropagation();
    this.currentObjective = null;
  }

  addOucomeToObjective(e) {
    e.stopPropagation();
    this.outComeForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(8)]),
      label: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      description: new FormControl('', [Validators.minLength(8)]),
    });
  }

  onSaveOutCome(e, activityDetails, formValues) {
    console.log(formValues);
    this.saving = true;
    this.httpClient.get('system/id.json').subscribe((res) => {
      if (res) {
        const outCome = {
          id: res['codes'][0],
          name: formValues?.name,
          label: formValues?.label,
          description: formValues?.description,
          outputs: [],
        };
        this.currentObjective.outComes = [
          ...this.currentObjective.outComes,
          outCome,
        ];
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
    console.log(this.currentObjective);
  }
}
