import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-program-uploading',
  templateUrl: './program-uploading.component.html',
  styleUrls: ['./program-uploading.component.css']
})
export class ProgramUploadingComponent implements OnInit {
  @Input() program: any;
  @Input() dataEntryFlow: any;
  file: any;
  requiredField: boolean = false;
  orgUnit: any;
  constructor() {}

  ngOnInit(): void {}

  fileSelection(event) {
    const element: HTMLElement = document.getElementById('fileSelector');
    this.file = event.target.files[0];
  }
}
