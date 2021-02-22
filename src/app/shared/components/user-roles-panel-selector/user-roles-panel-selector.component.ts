import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-roles-panel-selector',
  templateUrl: './user-roles-panel-selector.component.html',
  styleUrls: ['./user-roles-panel-selector.component.css'],
})
export class UserRolesPanelSelectorComponent implements OnInit {
  @Input() userRoles: any[];
  selectedRoles: any[] = [];
  constructor() {}

  ngOnInit(): void {}
}
