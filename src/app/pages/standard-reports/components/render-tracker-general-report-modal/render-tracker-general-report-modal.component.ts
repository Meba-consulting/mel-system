import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-render-tracker-general-report-modal',
  templateUrl: './render-tracker-general-report-modal.component.html',
  styleUrls: ['./render-tracker-general-report-modal.component.css'],
})
export class RenderTrackerGeneralReportModalComponent implements OnInit {
  formattedTrackedEntityInstanceData: any;
  program: any;
  constructor(
    private dialogRef: MatDialogRef<RenderTrackerGeneralReportModalComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.program = data?.program;
    this.formattedTrackedEntityInstanceData = {
      ...data?.data,
      reportHeader:
        data?.data?.attributeValues[
          this.program.programTrackedEntityAttributes[0]?.trackedEntityAttribute
            ?.id
        ]?.value,
      otherDetails: this.program.programTrackedEntityAttributes.map(
        (programTrackedEntityAttribute) => {
          return {
            id: programTrackedEntityAttribute?.trackedEntityAttribute?.id,
            name: programTrackedEntityAttribute?.trackedEntityAttribute?.name,
            value:
              data?.data?.attributeValues[
                programTrackedEntityAttribute?.trackedEntityAttribute?.id
              ]?.value,
          };
        }
      ),
    };
  }

  ngOnInit(): void {
    console.log(this.formattedTrackedEntityInstanceData);
  }
}
