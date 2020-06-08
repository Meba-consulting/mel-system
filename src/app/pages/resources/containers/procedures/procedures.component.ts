import { Component, OnInit, Input } from '@angular/core';
import {
  getProceduresGroups,
  formatResourcesByAccess
} from '../../helpers/format-resources-by-access.helper';

@Component({
  selector: 'app-procedures',
  templateUrl: './procedures.component.html',
  styleUrls: ['./procedures.component.css']
})
export class ProceduresComponent implements OnInit {
  @Input() resources: any;
  @Input() currentUser: any;
  procedureGroups: any;
  currentResourceGroup: any;
  procedures: any;
  constructor() {}

  ngOnInit(): void {
    this.procedureGroups = getProceduresGroups(this.currentUser);
    this.currentResourceGroup = this.procedureGroups[0];
    this.procedures = formatResourcesByAccess(
      this.procedureGroups,
      this.resources
    );
  }

  onSetCurrentResourceGroup(group) {
    this.currentResourceGroup = group;
  }
}
