import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { createTabsForGeneralRegistration } from '../../helpers';

@Component({
  selector: 'app-home-tabs',
  templateUrl: './home-tabs.component.html',
  styleUrls: ['./home-tabs.component.css'],
})
export class HomeTabsComponent implements OnInit {
  @Input() programs: any[];
  @Input() userGroups: any[];
  @Input() currentUser: any;
  @Input() systemIds: string[];
  @Input() selectedAttribute: any;
  tabs: any[];

  selectedTab = new FormControl(0);
  currentTab: number = 0;
  constructor() {}

  ngOnInit(): void {
    this.tabs = createTabsForGeneralRegistration(
      this.userGroups,
      this.currentUser
    );
  }

  changeTab(e, val) {
    e.stopPropagation();
    this.currentTab = val;
    this.selectedTab.setValue(val);
  }
}
