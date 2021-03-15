import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// import { FormControl } from '@angular/forms';
// import { Observable } from 'rxjs';
// import { startWith, map } from 'rxjs/operators';
import * as _ from 'lodash';
import { Observable } from 'rxjs';

@Component({
  selector: 'ngx-option-selector',
  templateUrl: './option-selector.component.html',
  styleUrls: ['./option-selector.component.css'],
})
export class OptionSelectorComponent implements OnInit {
  @Input() options: any[];
  @Input() filterName: string;
  @Output() selectedOption = new EventEmitter<any>();
  @Input() selectedOptionItems: any;
  filteredOptions: Observable<string[]>;
  searchString: string = '';
  showSelections: boolean = false;
  selectedItems: any[];
  updated: boolean = false;
  keyValuePairedSelectedItems: any = {};
  constructor() {}

  ngOnInit() {
    console.log(this.options);
    this.showSelections = true;
    this.selectedItems = this.selectedOptionItems
      ? this.selectedOptionItems
      : [];
  }

  onOptionSelectionChanged(dataset) {
    this.selectedOption.emit(dataset);
  }

  toggleCurrentFilter(e) {
    this.showSelections = !this.showSelections;
  }

  onSearch(e) {
    e.stopPropagation();
    this.searchString = e.target.value;
  }

  onSelectOption(event, option) {
    event.stopPropagation();
    this.selectedItems = !_.find(this.selectedItems, ['id', option?.id])
      ? [...this.selectedItems, option]
      : this.onRemoveItem(option, this.selectedItems);
    this.keyValuePairedSelectedItems = _.keyBy(this.selectedItems, 'id');
    this.selectedOption.emit({
      dimension: 'options',
      items: this.selectedItems,
    });
  }

  onRemoveItem(option, items) {
    const removedItem = _.find(items, ['id', option ? option.id : undefined]);
    const itemIndex = items.indexOf(removedItem);

    if (itemIndex !== -1) {
      items = [...items.slice(0, itemIndex), ...items.slice(itemIndex + 1)];
    }
    return items;
  }

  onUpdate() {
    this.selectedOption.emit({
      dimension: 'options',
      items: [this.selectedItems],
    });
    this.showSelections = !this.showSelections;
    this.updated = true;
  }

  onSelectionChange(e) {
    this.selectedOption.emit(_.filter(this.options, { id: e.value })[0]);
  }

  onClose() {
    this.showSelections = !this.showSelections;
  }
}
