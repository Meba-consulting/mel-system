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

  ngOnInit(): void {}

  printPDF(event: Event) {
    event.stopPropagation();
    setTimeout(function () {
      window.print();
    }, 500);
  }

  public download(id, filename): void {
    var preHtml =
      "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
    var postHtml = '</body></html>';
    var html = preHtml + document.getElementById(id).innerHTML + postHtml;

    var blob = new Blob(['\ufeff', html], {
      type: 'application/msword',
    });

    // Specify link url
    var url =
      'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);

    // Specify file name
    filename = filename ? filename + '.doc' : 'document.doc';

    // Create download link element
    var downloadLink = document.createElement('a');

    document.body.appendChild(downloadLink);

    // Create a link to the file
    downloadLink.href = url;

    // Setting the file name
    downloadLink.download = filename;

    //triggering the function
    downloadLink.click();

    document.body.removeChild(downloadLink);
  }
}
