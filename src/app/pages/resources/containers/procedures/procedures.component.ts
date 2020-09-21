import { Component, OnInit, Input } from '@angular/core';
import {
  getProceduresGroups,
  formatResourcesByAccess,
  getProceduresDepartmentsGroups
} from '../../helpers/format-resources-by-access.helper';

@Component({
  selector: 'app-procedures',
  templateUrl: './procedures.component.html',
  styleUrls: ['./procedures.component.css']
})
export class ProceduresComponent implements OnInit {
  @Input() resources: any;
  @Input() currentUser: any;
  @Input() userGroups: any[];
  procedureGroups: any;
  currentResourceGroup: any;
  procedures: any;
  isFormSelectionSet: boolean = false;
  showSubMenu: boolean = false;
  constructor() {}

  ngOnInit(): void {
    this.procedureGroups = getProceduresDepartmentsGroups(this.currentUser);
    this.currentResourceGroup = this.procedureGroups[0];
    this.procedures = formatResourcesByAccess(
      this.procedureGroups,
      this.resources
    );
    this.isFormSelectionSet = true;
  }

  onSetCurrentResourceGroup(group) {
    this.currentResourceGroup = group;
    this.isFormSelectionSet = false;
    this.currentResourceGroup = group;
    setTimeout(() => {
      this.procedures = formatResourcesByAccess(
        this.procedureGroups,
        this.resources
      );
      this.isFormSelectionSet = true;
    }, 100);
  }

  toggleSubItems() {
    this.showSubMenu = !this.showSubMenu;
  }
}
