import {
  AbstractType,
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProcessExcelUploadedFileService } from 'src/app/core/services/process-excel-uploaded-file.service';

@Component({
  selector: 'app-upload-excel-data-modal',
  templateUrl: './upload-excel-data-modal.component.html',
  styleUrls: ['./upload-excel-data-modal.component.css'],
})
export class UploadExcelDataModalComponent implements OnInit {
  programStage: any;
  trackedEntityInstanceId: string;
  orgUnit: any;
  program: any;
  file: any;
  fileDetails: any;
  formattedDataAsEvents: any;
  @ViewChild('fileSelector') fileSelectorInput: ElementRef;
  constructor(
    private dialogRef: MatDialogRef<UploadExcelDataModalComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private processExcelFileService: ProcessExcelUploadedFileService
  ) {
    this.trackedEntityInstanceId = data?.trackedEntityInstanceId;
    this.programStage = data?.programStage;
    this.orgUnit = data?.orgUnit;
    this.program = data?.program;
  }

  ngOnInit(): void {}

  fileSelection(event) {
    const element: HTMLElement = document.getElementById('fileSelector');
    this.file = element.id;
    this.fileDetails = {
      name: event.target.files[0].name,
      data: event.target.files[0],
    };
    // event.srcElement.value = null;
  }

  onSave(e) {
    e.stopPropagation();
    var reader = new FileReader();
    let self = this;
    if (reader.readAsBinaryString) {
      reader.onload = function (e) {
        self.formattedDataAsEvents =
          self.processExcelFileService.processExcelFileData(e.target.result);
      };
      reader.readAsBinaryString(this.fileDetails.data);
    }
  }

  onClose(e) {
    e.stopPropagation();
    this.dialogRef.close();
  }
}
