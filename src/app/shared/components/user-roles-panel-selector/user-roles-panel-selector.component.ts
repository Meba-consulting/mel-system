import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { find, filter, map, each } from 'lodash';

@Component({
  selector: 'app-user-roles-panel-selector',
  templateUrl: './user-roles-panel-selector.component.html',
  styleUrls: ['./user-roles-panel-selector.component.css'],
})
export class UserRolesPanelSelectorComponent implements OnInit {
  @Input() items: any[];
  @Input() section: any;
  itemsSelected: any[] = [];
  @Output() selectedItems = new EventEmitter<any[]>();
  constructor() {}

  ngOnInit(): void {
    if (this.section) {
      this.items = this.section?.no_underscore
        ? filter(this.items, (item) => {
            if (item?.name?.indexOf('_') !== 0) {
              return item;
            }
          }) || []
        : filter(this.items, (item) => {
            if (
              item?.name
                ?.toLowerCase()
                .indexOf(this.section?.key.toLowerCase()) == 0
            ) {
              return item;
            }
          }) || [];
    }
  }

  onSelectItem(e, item) {
    e.stopPropagation();
    if (!find(this.itemsSelected, ['id', item.id])) {
      this.itemsSelected = [...this.itemsSelected, item];
    }
    this.selectedItems.emit(this.itemsSelected);
  }

  onDeselectItem(e, role) {
    e.stopPropagation();

    const removedItem = find(this.itemsSelected, [
      'id',
      role ? role.id : undefined,
    ]);

    const itemIndex = this.itemsSelected.indexOf(removedItem);

    if (itemIndex !== -1) {
      this.itemsSelected = [
        ...this.itemsSelected.slice(0, itemIndex),
        ...this.itemsSelected.slice(itemIndex + 1),
      ];
    }
    this.selectedItems.emit(this.itemsSelected);
  }
}
