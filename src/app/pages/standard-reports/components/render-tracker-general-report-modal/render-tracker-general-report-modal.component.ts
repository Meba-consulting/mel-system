import {
  Component,
  Inject,
  OnInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';

@Component({
  selector: 'app-render-tracker-general-report-modal',
  templateUrl: './render-tracker-general-report-modal.component.html',
  styleUrls: ['./render-tracker-general-report-modal.component.css'],
})
export class RenderTrackerGeneralReportModalComponent implements OnInit {
  formattedTrackedEntityInstanceData: any;
  program: any;
  @ViewChild('report') pdfTable: ElementRef;
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

  printPDF(event: Event, data) {
    event.stopPropagation();

    const doc = new jsPDF();

    const pdfTable = this.pdfTable.nativeElement;

    var html = htmlToPdfmake(pdfTable.innerHTML);

    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).open();
    // setTimeout(function () {
    //   window.print();
    // }, 500);

    // var file = new Blob([data], { type: 'application/pdf' });
    // var fileURL = URL.createObjectURL(file);

    // // if you want to open PDF in new tab
    // window.open(fileURL);
    // var a = document.createElement('a');
    // a.href = fileURL;
    // a.target = '_blank';
    // a.download = 'bill.pdf';
    // document.body.appendChild(a);
    // a.click();
  }

  public download(event: Event, id, filename): void {
    event.stopPropagation();
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
