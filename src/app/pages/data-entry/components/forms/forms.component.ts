import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  getProgramStagesAsForms,
  filterFormsByAccessGroups
} from '../../helpers';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {
  @Input() currentUser: any;
  @Input() dataEntryFlowConfigs: any;
  @Input() programMetadata: any;
  @Output() selectedForm: EventEmitter<any> = new EventEmitter<any>();
  @Output() dataEntryFlowAndForm: EventEmitter<any> = new EventEmitter<any>();
  programStagesAsForms: Array<any>;
  forms: Array<any>;
  constructor() {}

  ngOnInit(): void {
    this.programStagesAsForms = getProgramStagesAsForms(this.programMetadata);
    this.forms = filterFormsByAccessGroups(
      this.programStagesAsForms,
      this.currentUser,
      this.programMetadata
    );
  }

  onFormChange(form) {
    this.selectedForm.emit(form);
    this.dataEntryFlowAndForm.emit({
      form: form,
      configs: this.dataEntryFlowConfigs
    });
  }
}
