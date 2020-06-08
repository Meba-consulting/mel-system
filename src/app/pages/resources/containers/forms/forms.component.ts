import { Component, OnInit, Input } from '@angular/core';
import {
  getFormsGroups,
  formatResourcesByAccess
} from '../../helpers/format-resources-by-access.helper';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {
  @Input() resources: any;
  @Input() currentUser: any;
  formsGroups: Array<any>;
  forms: any;
  currentResourceGroup: any;
  constructor() {}

  ngOnInit(): void {
    this.formsGroups = getFormsGroups(this.currentUser);
    this.currentResourceGroup = this.formsGroups[0];
    this.forms = formatResourcesByAccess(this.formsGroups, this.resources);
  }

  onSetCurrentResourceGroup(group) {
    this.currentResourceGroup = group;
  }
}
