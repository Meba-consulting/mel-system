import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';
import {
  FILTER_ICON,
  ARROW_LEFT_ICON,
  ARROW_RIGHT_ICON,
  DATA_ICON,
  PERIOD_ICON,
  ARROW_DOWN_ICON,
  TREE_ICON
} from '../../icons';
import { SelectionFilterConfig } from '../../models/selected-filter-config.model';
import { SELECTION_FILTER_CONFIG } from '../../constants/selection-filter-config.constant';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngx-dhis2-selection-filters',
  templateUrl: './ngx-dhis2-selection-filters.component.html',
  styleUrls: ['./ngx-dhis2-selection-filters.component.css']
})
export class NgxDhis2SelectionFiltersComponent implements OnInit {
  @Input()
  dataSelections: any[];
  @Input()
  layout: any;
  @Input()
  selectionFilterConfig: SelectionFilterConfig;
  @Output()
  filterUpdate: EventEmitter<any[]> = new EventEmitter<any[]>();
  showFilters: boolean;
  showFilterBody: boolean;

  // icons
  filterIcon: string;
  arrowLeftIcon: string;
  arrowRightIcon: string;
  arrowDownIcon: string;
  dataIcon: string;
  periodIcon: string;
  orgUnitIcon: string;
  private _selectedFilter: string;

  constructor() {
    this.showFilters = this.showFilterBody = false;

    // icons initializations
    this.filterIcon = FILTER_ICON;
    this.arrowLeftIcon = ARROW_LEFT_ICON;
    this.arrowRightIcon = ARROW_RIGHT_ICON;
    this.arrowDownIcon = ARROW_DOWN_ICON;
    this.dataIcon = DATA_ICON;
    this.periodIcon = PERIOD_ICON;
    this.orgUnitIcon = TREE_ICON;
  }

  get selectedData(): any[] {
    const dataObject = _.find(this.dataSelections, ['dimension', 'dx']);
    return dataObject ? dataObject.items : [];
  }

  get selectedDynamicDimensions(): any[] {
    return _.filter(
      this.dataSelections || [],
      (dataSelection: any) =>
        ['ou', 'pe', 'dx', 'co', 'dy'].indexOf(dataSelection.dimension) === -1
    );
  }

  get selectedDataGroups(): any[] {
    const dataObject = _.find(this.dataSelections, ['dimension', 'dx']);
    return dataObject ? dataObject.groups : [];
  }

  get selectedPeriods(): any[] {
    const dataObject = _.find(this.dataSelections, ['dimension', 'pe']);
    return dataObject ? dataObject.items : [];
  }

  get selectedOrgUnits(): any[] {
    const dataObject = _.find(this.dataSelections, ['dimension', 'ou']);
    return dataObject ? dataObject.items : [];
  }

  get layoutItem(): any {
    return _.groupBy(
      _.map(this.dataSelections, dataSelection => {
        return {
          name: dataSelection.name,
          value: dataSelection.dimension,
          layout: dataSelection.layout
        };
      }),
      'layout'
    );
  }

  get filterConfig(): SelectionFilterConfig {
    return {
      ...SELECTION_FILTER_CONFIG,
      ...(this.selectionFilterConfig || {})
    };
  }

  get selectedFilter(): string {
    return (
      this._selectedFilter ||
      (this.filterConfig.showDataFilter
        ? 'DATA'
        : this.filterConfig.showPeriodFilter
        ? 'PERIOD'
        : this.filterConfig.showOrgUnitFilter
        ? 'ORG_UNIT'
        : this.filterConfig.showLayout
        ? 'LAYOUT'
        : '')
    );
  }

  ngOnInit() {}

  toggleFilters(e) {
    e.stopPropagation();
    this.showFilters = !this.showFilters;
    if (this.showFilters) {
      this.showFilterBody = true;
    } else {
      this.showFilterBody = false;
    }
  }

  toggleCurrentFilter(e, selectedFilter) {
    e.stopPropagation();
    if (this._selectedFilter === selectedFilter) {
      this._selectedFilter = '';
      this.showFilterBody = false;
    } else {
      this._selectedFilter = selectedFilter;
      this.showFilterBody = true;
    }
  }

  onFilterClose(selectedItems, selectedFilter) {
    if (selectedFilter === 'LAYOUT') {
      const layouts = _.flatten(
        _.map(_.keys(selectedItems), (selectedItemKey: string) => {
          return _.map(
            selectedItems[selectedItemKey],
            (selectedItem: any, selectedItemIndex: number) => {
              return {
                ...selectedItem,
                layout: selectedItemKey,
                layoutOrder: selectedItemIndex
              };
            }
          );
        })
      );

      this.dataSelections = _.sortBy(
        _.map(this.dataSelections, (dataSelection: any) => {
          const availableDataSelectionLayout = _.find(layouts, [
            'value',
            dataSelection.dimension
          ]);

          return availableDataSelectionLayout
            ? {
                ...dataSelection,
                layout: availableDataSelectionLayout.layout,
                layoutOrder: availableDataSelectionLayout.layoutOrder
              }
            : dataSelection;
        }),
        'layoutOrder'
      );
    } else {
      if (selectedItems) {
        if (_.isArray(selectedItems)) {
          // Remove all dynamic dimension selections first
          this.dataSelections = _.filter(
            this.dataSelections,
            (dataSelection: any) =>
              ['ou', 'pe', 'dx', 'co', 'dy'].indexOf(
                dataSelection.dimension
              ) !== -1
          );
          _.each(selectedItems, (selectedItem: any) => {
            this.dataSelections = !_.find(this.dataSelections, [
              'dimension',
              selectedItem.dimension
            ])
              ? [...this.dataSelections, { ...selectedItem, layout: 'filters' }]
              : [
                  ...this.updateDataSelectionWithNewSelections(
                    this.dataSelections,
                    selectedItem
                  )
                ];
          });
        } else if (selectedItems.items.length > 0) {
          this.dataSelections = !_.find(this.dataSelections, [
            'dimension',
            selectedItems.dimension
          ])
            ? [...this.dataSelections, { ...selectedItems, layout: 'columns' }]
            : [
                ...this.updateDataSelectionWithNewSelections(
                  this.dataSelections,
                  selectedItems
                )
              ];
        }
      }
    }

    if (this.selectedFilter === selectedFilter) {
      this._selectedFilter = '';
      this.showFilterBody = false;
    }
  }

  onFilterUpdate(selectedItems, selectedFilter) {
    if (selectedFilter === 'LAYOUT') {
      const layouts = _.flatten(
        _.map(_.keys(selectedItems), (selectedItemKey: string) => {
          return _.map(
            selectedItems[selectedItemKey],
            (selectedItem: any, selectedItemIndex: number) => {
              return {
                ...selectedItem,
                layout: selectedItemKey,
                layoutOrder: selectedItemIndex
              };
            }
          );
        })
      );

      this.dataSelections = _.sortBy(
        _.map(this.dataSelections, (dataSelection: any) => {
          const availableDataSelectionLayout = _.find(layouts, [
            'value',
            dataSelection.dimension
          ]);

          return availableDataSelectionLayout
            ? {
                ...dataSelection,
                layout: availableDataSelectionLayout.layout,
                layoutOrder: availableDataSelectionLayout.layoutOrder
              }
            : dataSelection;
        }),
        'layoutOrder'
      );
    } else {
      if (_.isArray(selectedItems)) {
        // Remove all dynamic dimension selections first
        this.dataSelections = _.filter(
          this.dataSelections,
          (dataSelection: any) =>
            ['ou', 'pe', 'dx', 'co', 'dy'].indexOf(dataSelection.dimension) !==
            -1
        );
        _.each(selectedItems, (selectedItem: any) => {
          this.dataSelections = !_.find(this.dataSelections, [
            'dimension',
            selectedItem.dimension
          ])
            ? [...this.dataSelections, { ...selectedItem, layout: 'filters' }]
            : [
                ...this.updateDataSelectionWithNewSelections(
                  this.dataSelections,
                  selectedItem
                )
              ];
        });
      } else {
        this.dataSelections = !_.find(this.dataSelections, [
          'dimension',
          selectedItems.dimension
        ])
          ? [...this.dataSelections, { ...selectedItems, layout: 'columns' }]
          : [
              ...this.updateDataSelectionWithNewSelections(
                this.dataSelections,
                selectedItems
              )
            ];
      }
    }

    this.filterUpdate.emit(this.dataSelections);
    this._selectedFilter = '';
    this.showFilterBody = false;
  }

  updateDataSelectionWithNewSelections(
    dataSelections: any[],
    selectedObject: any
  ): any[] {
    const selectedDimension = _.find(dataSelections, [
      'dimension',
      selectedObject.dimension
    ]);
    const selectedDimensionIndex = selectedDimension
      ? dataSelections.indexOf(selectedDimension)
      : -1;
    return selectedDimension
      ? [
          ...dataSelections.slice(0, selectedDimensionIndex),
          { ...selectedDimension, ...selectedObject },
          ...dataSelections.slice(selectedDimensionIndex + 1)
        ]
      : dataSelections
      ? [...dataSelections, selectedObject]
      : [selectedObject];
  }
}
