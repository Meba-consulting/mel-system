import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-program-uploading',
  templateUrl: './program-uploading.component.html',
  styleUrls: ['./program-uploading.component.css']
})
export class ProgramUploadingComponent implements OnInit {
  @Input() program: any;
  constructor() {}

  ngOnInit(): void {}
}
