import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { getCurrentUser, State } from 'src/app/store';
import { getCurrentDashboardId } from '../../../store/selectors';
import * as _ from 'lodash';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { SelectionFilterConfig } from 'src/app/shared/modules/selection-filters/models/selected-filter-config.model';
import { SELECTION_FILTER_CONFIG } from 'src/app/shared/modules/selection-filters/constants/selection-filter-config.constant';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { SelectionFiltersModalComponent } from '../../components/selection-filters-modal/selection-filters-modal.component';
import { CurrentPlaygroundVisualizationComponent } from '../../components/current-playground-visualization/current-playground-visualization.component';

@Component({
  selector: 'app-analysis-dashboard',
  templateUrl: './analysis-dashboard.component.html',
  styleUrls: ['./analysis-dashboard.component.css'],
})
export class AnalysisDashboardComponent implements OnInit {
  selectionFilterConfig: any;
  dataSelections: any;
  currentDashboard$: Observable<string>;
  currentUser$: Observable<any>;
  visualizationLayout: any;
  showFilters: boolean;
  showFilterBody: boolean;
  selectedFilter: string;
  periodFilterConfig: any;
  orgUnitFilterConfig: any;
  favoriteTitle: string = '';

  @ViewChild(MatMenuTrigger) menuTrigger: MatMenuTrigger;
  @ViewChild(CurrentPlaygroundVisualizationComponent, { static: false })
  playGroundBody: CurrentPlaygroundVisualizationComponent;
  @Output()
  filterUpdate: EventEmitter<any[]> = new EventEmitter<any[]>();
  @Output() layoutUpdate: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  interventionSettingsUpdate: EventEmitter<any> = new EventEmitter<any>();
  constructor(private store: Store<State>, private dialog: MatDialog) {
    this.showFilters = true;
    this.showFilterBody = false;
    this.periodFilterConfig = {
      singleSelection: false,
      emitOnDestroy: false,
      allowDateRangeSelection: false,
      allowFixedPeriodSelection: true,
      allowRelativePeriodSelection: true,
    };
    this.visualizationLayout = {
      columns: [{ name: 'Data', icon: 'storage', id: 'DATA' }],
      rows: [{ name: 'Period', icon: 'watch_later', id: 'PERIOD' }],
      filters: [{ name: 'Organisation unit', icon: null, id: 'ORG_UNIT' }],
    };
  }

  onUpdateVisualizationName(event) {
    this.favoriteTitle = event.target.value;
    // this.playGroundBody.setFavoriteTitle(event.target.value);
  }

  get selectedData(): any[] {
    const dataObject = _.find(this.dataSelections, ['dimension', 'dx']);
    return dataObject ? dataObject.items : [];
  }

  get selectedDataGroups(): any[] {
    const dataObject = _.find(this.dataSelections, ['dimension', 'dx']);
    return dataObject ? dataObject.groups : [];
  }

  get selectedPeriods(): any[] {
    const periodObject = _.find(this.dataSelections, ['dimension', 'pe']);
    return periodObject ? periodObject.items : [];
  }

  get selectedOrgUnits(): any[] {
    const periodObject = _.find(this.dataSelections, ['dimension', 'ou']);
    return periodObject ? periodObject.items : [];
  }

  get selectedLegendSets(): any[] {
    return [];
  }

  get layoutItem(): any {
    return _.groupBy(
      _.map(this.dataSelections, (dataSelection) => {
        return {
          name: dataSelection.name,
          value: dataSelection.dimension,
          layout: dataSelection.layout,
        };
      }),
      'layout'
    );
  }

  get filterConfig(): SelectionFilterConfig {
    return {
      ...SELECTION_FILTER_CONFIG,
      ...(this.selectionFilterConfig || {}),
    };
  }

  get layoutItems() {
    const items = {};
    Object.keys(this.visualizationLayout).forEach((key) => {
      this.visualizationLayout[key].forEach((item) => {
        switch (item.id) {
          case 'ORG_UNIT':
            items['ou'] = key;
            break;
          case 'PERIOD':
            items['pe'] = key;
            break;
          case 'DATA':
            items['dx'] = key;
            break;
          default:
            items[item.id] = key;
            break;
        }
      });
    });
    return items;
  }

  get selectedCounts(): { [dimension: string]: number } {
    const count = {};

    (this.dataSelections || []).forEach((dataSelection) => {
      switch (dataSelection.dimension) {
        case 'ou':
          count['ORG_UNIT'] = dataSelection?.items?.length || 0;
          break;
        case 'pe':
          count['PERIOD'] = dataSelection?.items?.length || 0;
          break;
        case 'dx':
          count['DATA'] = dataSelection?.items?.length || 0;
          break;
        default:
          count[dataSelection.dimension] = dataSelection?.items?.length || 0;
          break;
      }
    });

    return count;
  }

  ngOnInit(): void {
    this.currentDashboard$ = this.store.select(getCurrentDashboardId);
    this.currentUser$ = this.store.select(getCurrentUser);
    this.currentUser$.subscribe((response) => {
      if (response) {
        this.currentDashboard$ = of(
          localStorage.getItem(
            'dhis2.dashboard.current.' + response?.userCredentials?.username
          )
        );
      }
    });
    this.selectionFilterConfig = {
      showDataFilter: true,
      showLayout: true,
    };
    this.dataSelections = [
      {
        dimension: 'pe',
        items: [
          {
            id: new Date().getFullYear().toString(),
            name: new Date().getFullYear().toString(),
          },
        ],
      },
    ];
  }

  onFilterUpdateAction(selections) {
    console.log(selections);
    this.dataSelections = selections;
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else if (
      (event.previousContainer.id === 'columns' &&
        event.container.id === 'rows' &&
        event.previousContainer.data.length === 1) ||
      (event.previousContainer.id === 'rows' &&
        event.container.id === 'columns' &&
        event.previousContainer.data.length === 1)
    ) {
      transferArrayItem(
        event.container.data,
        event.previousContainer.data,
        event.previousIndex,
        event.currentIndex
      );
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }

    this.layoutUpdate.emit(this.layoutItems);
  }

  toggleFilters(e) {
    e.stopPropagation();
    this.showFilters = !this.showFilters;
    if (this.showFilters) {
      this.showFilterBody = true;
    } else {
      this.showFilterBody = false;
    }
  }

  toggleCurrentFilter(e, selectedFilter, layout?: string) {
    e.stopPropagation();

    if (this.selectedFilter === selectedFilter) {
      this.selectedFilter = '';
      this.showFilterBody = false;
    } else {
      this.selectedFilter = selectedFilter;
      this.showFilterBody = true;
    }

    const selectionDialogData: any = {
      selectedFilter,
      selectedData: this.selectedData,
      selectedDataGroups: _.sortBy(this.selectedDataGroups, 'sortOrder'),
      selectedOrgUnits: this.selectedOrgUnits,
      selectedPeriods: this.selectedPeriods,
      periodFilterConfig: this.periodFilterConfig,
      orgUnitFilterConfig: this.filterConfig.orgUnitFilterConfig,
      userAccesses: [],
      userGroupAccesses: [],
      publicAccess: [],
      dataSelections: this.dataSelections,
    };

    const width = '700px';

    const selectionDialog = this.dialog.open(SelectionFiltersModalComponent, {
      width,
      minHeight: '500px',
      data: selectionDialogData,
    });

    selectionDialog.afterClosed().subscribe((dialogData: any) => {
      if (dialogData) {
        this.dataSelections = dialogData.selectionItems;
        // console.log('dialog data', dialogData.selectionItems);
        const selectedDimension: any = dialogData.selectionItems;
        // Array.isArray(dialogData.selectionItems)
        //   ? dialogData.selectionItems[0]
        //   : dialogData.selectionItems;

        console.log('visualizationLayout', this.visualizationLayout);

        if (dialogData.action === 'UPDATE') {
          if (!Array.isArray(selectedDimension)) {
            this.onFilterUpdate({
              ...selectedDimension,
              layout: this.layoutItems[selectedDimension.dimension],
            });
          } else {
            selectedDimension.forEach((dimension) => {
              if (!['pe', 'ou', 'dx'].includes(dimension?.dimension)) {
                this.visualizationLayout['columns'] = [
                  ...this.visualizationLayout['columns'],
                  { name: dimension?.name, icon: '', id: dimension?.id },
                ];
              }
              // console.log('visualizationLayout', this.visualizationLayout);
              this.onFilterUpdate({
                ...dimension,
                layout: this.layoutItems[dimension.dimension],
              });
            });
          }
        } else {
          this.onFilterClose({
            ...selectedDimension,
            layout: this.layoutItems[selectedDimension.dimension],
          });
        }
      }
    });
  }

  onClickOutside() {
    this.selectedFilter = '';
    this.showFilterBody = false;
  }

  onFilterClose(selectedItems) {
    if (
      selectedItems &&
      selectedItems?.items &&
      selectedItems?.items.length > 0
    ) {
      this.dataSelections = !_.find(this.dataSelections, [
        'dimension',
        selectedItems.dimension,
      ])
        ? [...this.dataSelections, { ...selectedItems, layout: 'columns' }]
        : [
            ...this.updateDataSelectionWithNewSelections(
              this.dataSelections,
              selectedItems
            ),
          ];
    }
  }

  onFilterUpdate(selectedItems: any) {
    this.dataSelections = !_.find(this.dataSelections, [
      'dimension',
      selectedItems.dimension,
    ])
      ? [...this.dataSelections, { ...selectedItems, layout: 'rows' }]
      : [
          ...this.updateDataSelectionWithNewSelections(
            this.dataSelections,
            selectedItems
          ),
        ];

    this.filterUpdate.emit(this.dataSelections);
    this.selectedFilter = '';
    this.showFilterBody = false;
  }

  updateDataSelectionWithNewSelections(
    dataSelections: any[],
    selectedObject: any
  ): any[] {
    const selectedDimension = _.find(dataSelections, [
      'dimension',
      selectedObject.dimension,
    ]);
    const selectedDimensionIndex = selectedDimension
      ? dataSelections.indexOf(selectedDimension)
      : -1;
    return selectedDimension
      ? [
          ...dataSelections.slice(0, selectedDimensionIndex),
          { ...selectedDimension, ...selectedObject },
          ...dataSelections.slice(selectedDimensionIndex + 1),
        ]
      : dataSelections
      ? [...dataSelections, selectedObject]
      : [selectedObject];
  }
}
