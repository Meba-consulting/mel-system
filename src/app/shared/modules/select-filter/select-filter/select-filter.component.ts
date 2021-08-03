import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'ngx-select-filter',
  templateUrl: './select-filter.component.html',
  styleUrls: ['./select-filter.component.css'],
})
export class SelectFilterComponent implements OnInit {
  @Input() dataSets: any[];
  @Input() itemType: string;
  @Output() selectedDataSet = new EventEmitter<any>();
  dataSetFormControl = new FormControl();
  filteredOptions: Observable<string[]>;
  searchString: string = '';
  showSelections: boolean = false;
  selectedItem: any;
  constructor() {}

  ngOnInit() {
    this.filteredOptions = this.dataSetFormControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }

  onDataSetSelectionChanged(dataset) {
    this.selectedDataSet.emit(dataset);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.dataSets.filter(
      (option) => option.name.toLowerCase().indexOf(filterValue) > -1
    );
  }

  toggleCurrentFilter(e) {
    this.showSelections = !this.showSelections;
  }

  onSearch(e, type) {
    e.stopPropagation();
    this.searchString = e.target.value;
  }

  onSelectDataSet(dataSet) {
    this.selectedDataSet.emit(dataSet);
    this.selectedItem = dataSet;
    this.showSelections = !this.showSelections;
  }

  onSelectionChange(e) {
    this.selectedDataSet.emit(_.filter(this.dataSets, { id: e.value })[0]);
  }

  onClose() {
    this.showSelections = !this.showSelections;
  }
}
