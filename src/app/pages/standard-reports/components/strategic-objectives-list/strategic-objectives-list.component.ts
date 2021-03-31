import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { ActivityTrackerService } from '../../services/activity-tracker.service';
import { OutputModalComponent } from '../output-modal/output-modal.component';

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
  currentOutCome: any;
  isEditOutComeSet: boolean = false;
  constructor(
    private httpClient: NgxDhis2HttpClientService,
    private activityService: ActivityTrackerService,
    private dialog: MatDialog
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

  onViewOuComes(e, objective) {
    e.stopPropagation();
    this.currentObjective = objective;
    this.showOutComesFor = {};
  }

  onEditOutCome(e, outCome, objective) {
    e.stopPropagation();
    this.currentObjective = objective;
    this.currentOutCome = outCome;
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

  onAddOutput(e, outCome) {
    this.currentOutCome = outCome;
    e.stopPropagation();
    this.dialog
      .open(OutputModalComponent, {
        width: '80%',
        height: '700px',
        disableClose: false,
        data: {
          objective: this.currentObjective,
          outCome: this.currentOutCome,
          key: this.key,
          objectives: this.activityDetails,
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

  onViewOutputs(e, outCome) {
    e.stopPropagation();
  }

  onCancelOpenedObjective(e) {
    e.stopPropagation();
    this.currentObjective = null;
  }

  addOucomeToObjective(e) {
    e.stopPropagation();
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

  onSaveOutCome(e, activityDetails, formValues) {
    console.log(formValues);
    e.stopPropagation();
    this.saving = true;
    this.httpClient.get('system/id.json').subscribe((res) => {
      if (res) {
        const newOutCome = {
          id: this.isEditOutComeSet ? this.currentOutCome?.id : res['codes'][0],
          name: formValues?.name,
          label: formValues?.label,
          description: formValues?.description,
          outputs: this.isEditOutComeSet ? this.currentOutCome?.outputs : [],
        };
        console.log('isEditOutComeSet', this.isEditOutComeSet);
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
              console.log(this.currentObjective);
            }
          });
      }
    });
  }
}
