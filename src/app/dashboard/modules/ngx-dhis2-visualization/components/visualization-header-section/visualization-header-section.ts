import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as _ from 'lodash';
import { VisualizationUiConfig } from '../../models/visualization-ui-config.model';
import { VisualizationLayer } from '../../models/visualization-layer.model';
import { VisualizationDataSelection } from '../../models/visualization-data-selection.model';
import { openAnimation } from '../../../../../animations';

import { SelectionFilterConfig } from '../../../ngx-dhis2-data-selection-filter/models/selected-filter-config.model';
import { getMergedDataSelections } from '../../helpers';

@Component({
  selector: 'visualization-header-section',
  templateUrl: 'visualization-header-section.html',
  styleUrls: ['./visualization-header-section.css'],
  animations: [openAnimation]
})
export class VisualizationHeaderSectionComponent {
  @Input()
  id: string;
  @Input()
  name: string;
  @Input()
  visualizationType: string;
  @Input()
  isNew: string;
  @Input()
  uiConfigId: string;
  @Input()
  showFilters: boolean;
  @Input()
  hideResizeButtons: boolean;
  @Input()
  fullScreen: boolean;
  @Input()
  visualizationLayers: VisualizationLayer[];

  @Input()
  favoriteType: string;

  showNameInput: boolean;

  @Output()
  visualizationLayersUpdate: EventEmitter<
    VisualizationLayer[]
  > = new EventEmitter<VisualizationLayer[]>();

  @Output()
  visualizationOptionUpdate: EventEmitter<
    VisualizationLayer
  > = new EventEmitter<VisualizationLayer>();

  @Output()
  fullScreenAction: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  savefavorite: EventEmitter<any> = new EventEmitter<any>();

  selectionFilterConfig: SelectionFilterConfig;

  constructor() {
    this.selectionFilterConfig = {
      showPeriodFilter: true,
      showOrgUnitFilter: true,
      showLayout: true,
      showDataFilter: false,
      showOptions: true
    };
  }

  onFullScreenAction(id) {
    this.fullScreenAction.emit({
      id,
      uiConfigId: this.uiConfigId,
      fullScreen: this.fullScreen
    });
  }

  onFilterUpdateAction(dataSelections: VisualizationDataSelection[]) {
    const visualizationLayer = this.visualizationLayers[0];
    const newDataSelections = _.sortBy(
      getMergedDataSelections(
        visualizationLayer.dataSelections,
        dataSelections,
        this.favoriteType
      ),
      'layoutOrder'
    );

    const groupedDataSelections = _.groupBy(newDataSelections, 'layout');

    const columns = this.getSanitizedSelections(
      groupedDataSelections['columns']
    );

    const rows = this.getSanitizedSelections(groupedDataSelections['rows']);
    const filters = this.getSanitizedSelections(
      groupedDataSelections['filters']
    );

    const visualizationLayers = this.visualizationLayers.map(
      (vizLayer: VisualizationLayer) => {
        return {
          ...vizLayer,
          dataSelections: newDataSelections,
          config: {
            ...vizLayer.config,
            columns: vizLayer.config.columns.map((vizColumn: any) => {
              if (vizColumn.dimension === 'dx') {
                return vizColumn;
              }

              return (
                _.find(columns, ['dimension', vizColumn.dimension]) || vizColumn
              );
            }),
            rows: vizLayer.config.rows.map((vizRow: any) => {
              if (vizRow.dimension === 'dx') {
                return vizRow;
              }

              return _.find(rows, ['dimension', vizRow.dimension]) || vizRow;
            }),
            filters: vizLayer.config.filters.map((vizFilter: any) => {
              if (vizFilter.dimension === 'dx') {
                return vizFilter;
              }

              return (
                _.find(filters, ['dimension', vizFilter.dimension]) || vizFilter
              );
            })
          }
        };
      }
    );

    this.visualizationLayersUpdate.emit(visualizationLayers);
  }

  getSanitizedSelections(dataSelections: any[]) {
    return dataSelections.map((dataSelection: any) => {
      return {
        ...dataSelection,
        items: dataSelection.items.map((item: any) => {
          return {
            ...item,
            dimensionItem: item.id,
            dimensionItemType: item.type
          };
        })
      };
    });
  }

  onToggleNameInput(e) {
    e.stopPropagation();
    this.showNameInput = !this.showNameInput;
  }

  onSaveFavorite(e) {
    if (this.name.trim() !== '') {
      this.savefavorite.emit({ name: this.name, isNew: this.isNew });
      this.showNameInput = false;
    }
  }

  onVisualizationOptionUpdate(config: any) {
    this.visualizationLayersUpdate.emit(
      this.visualizationLayers.map((visualizationLayer: VisualizationLayer) => {
        return {
          ...visualizationLayer,
          config: {
            ...visualizationLayer.config,
            ..._.omit(config, ['columns', 'rows', 'filters'])
          }
        };
      })
    );
  }
}
