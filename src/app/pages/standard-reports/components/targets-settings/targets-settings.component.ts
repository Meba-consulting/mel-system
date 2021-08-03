import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-targets-settings',
  templateUrl: './targets-settings.component.html',
  styleUrls: ['./targets-settings.component.css'],
})
export class TargetsSettingsComponent implements OnInit {
  key: string;
  currentPeriodType: string;
  targetForm: FormGroup;
  targetVariables: any[] = [];
  constructor(
    private dialogRef: MatDialogRef<TargetsSettingsComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.key = data?.key;
  }

  ngOnInit(): void {}

  getPeriodType(periodType) {
    this.currentPeriodType = periodType;
    if (periodType === 'yearly') {
      this.targetForm = new FormGroup({
        target1: new FormControl(''),
      });
      this.targetVariables = [{ name: this.key, id: this.key }];
    } else if (periodType === 'six-monthly') {
      this.targetForm = new FormGroup({
        target1: new FormControl(''),
        target2: new FormControl(''),
      });
      this.targetVariables = [
        {
          id: this.key + 'S1',
          name: this.key + ' Jan-June',
        },
        {
          id: this.key + 'S2',
          name: this.key + ' July-Dec',
        },
      ];
    } else if (periodType === 'quarterly') {
      this.targetForm = new FormGroup({
        target1: new FormControl(''),
        target2: new FormControl(''),
        target3: new FormControl(''),
        target4: new FormControl(''),
      });
      this.targetVariables = [
        {
          id: this.key + 'Q1',
          name: this.key + ' Jan-March',
        },
        {
          id: this.key + 'Q2',
          name: this.key + ' April-June',
        },
        {
          id: this.key + 'Q3',
          name: this.key + ' July-Sept',
        },
        {
          id: this.key + ' Oct-Dec',
          name: this.key + 'Q4',
        },
      ];
    } else if (periodType === 'bi-monthly') {
      this.targetForm = new FormGroup({
        target1: new FormControl(''),
        target2: new FormControl(''),
        target3: new FormControl(''),
        target4: new FormControl(''),
        target5: new FormControl(''),
        target6: new FormControl(''),
      });
      this.targetVariables = [
        {
          id: this.key + 'B1',
          name: this.key + ' Jan-Feb',
        },
        {
          id: this.key + 'B2',
          name: this.key + ' March-April',
        },
        {
          id: this.key + 'B3',
          name: this.key + ' May-June',
        },
        {
          id: this.key + 'B4',
          name: this.key + ' July-Aug',
        },
        {
          id: this.key + 'B5',
          name: this.key + ' Sept-Oct',
        },
        {
          id: this.key + 'B6',
          name: this.key + ' Nov-Dec',
        },
      ];
    } else if (periodType === 'monthly') {
      this.targetForm = new FormGroup({
        target1: new FormControl(''),
        target2: new FormControl(''),
        target3: new FormControl(''),
        target4: new FormControl(''),
        target5: new FormControl(''),
        target6: new FormControl(''),
        target7: new FormControl(''),
        target8: new FormControl(''),
        target9: new FormControl(''),
        target10: new FormControl(''),
        target11: new FormControl(''),
        target12: new FormControl(''),
      });
      this.targetVariables = [
        {
          id: this.key + '01',
          name: this.key + ' Jan',
        },
        {
          id: this.key + '02',
          name: this.key + ' Feb',
        },
        {
          id: this.key + '03',
          name: this.key + ' March',
        },
        {
          id: this.key + '04',
          name: this.key + ' April',
        },
        {
          id: this.key + '05',
          name: this.key + ' May',
        },
        {
          id: this.key + '06',
          name: this.key + ' June',
        },
        {
          id: this.key + '07',
          name: this.key + ' July',
        },
        {
          id: this.key + '08',
          name: this.key + ' Aug',
        },
        {
          id: this.key + '09',
          name: this.key + ' Sept',
        },
        {
          id: this.key + '10',
          name: this.key + ' Oct',
        },
        {
          id: this.key + '11',
          name: this.key + ' Nov',
        },
        {
          id: this.key + '12',
          name: this.key + ' Dec',
        },
      ];
    }
  }

  onDone(e, values) {
    e.stopPropagation();
    this.dialogRef.close({
      values: values,
      targetVariables: this.targetVariables,
      periodType: this.currentPeriodType,
    });
  }
}
