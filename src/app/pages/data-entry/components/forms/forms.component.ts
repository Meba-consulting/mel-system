import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {
  @Input() currentUser: any;
  @Input() dataEntryFlowConfigs: any;
  @Input() programMetadata: any;
  constructor() {}

  ngOnInit(): void {}
}
