import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { INITIAL_LAYOUT_MODEL } from './model/layout-model';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  @Input()
  layoutModel: any = INITIAL_LAYOUT_MODEL;
  @Input()
  visualizationType: string;
  @Output()
  layoutUpdate: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  layoutClose: EventEmitter<any> = new EventEmitter<any>();
  filters: any[];
  columns: any[];
  rows: any[];
  availableDimensions: any[];
  icons: any;
  dimensions: any;
  columnName: string;
  rowName: string;

  constructor() {
    this.icons = {
      dx: 'assets/icons/data.png',
      ou: 'assets/icons/tree.png',
      pe: 'assets/icons/period.png'
    };

    this.dimensions = {
      filterDimension: [],
      columnDimension: [],
      rowDimension: []
    };
    this.columnName = 'Column dimensions';
    this.rowName = 'Row dimensions';
    this.availableDimensions = [];
    this.rows = [];
    this.columns = [];
    this.filters = [];
  }

  ngOnInit() {
    this.updateLayoutDimensions();
    if (this.visualizationType === 'CHART') {
      this.rowName = 'Categories dimensions';
      this.columnName = 'Series dimensions';
    }
  }

  updateLayoutDimensions() {
    this.filters = this.layoutModel.filters;
    this.columns = this.layoutModel.columns;
    this.rows = this.layoutModel.rows;
  }

  updateLayout() {
    this.layoutUpdate.emit({
      filters: this.filters,
      columns: this.columns,
      rows: this.rows
    });
  }

  close() {
    this.layoutClose.emit({
      filters: this.filters,
      columns: this.columns,
      rows: this.rows
    });
  }
}
