import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Fn } from '@iapps/function-analytics';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-current-playground-visualization',
  templateUrl: './current-playground-visualization.component.html',
  styleUrls: ['./current-playground-visualization.component.css'],
})
export class CurrentPlaygroundVisualizationComponent
  implements OnInit, OnChanges
{
  @Input() dataSelections: any[];
  @Input() layout: any;
  favTitle: string;
  @Input() favoriteTitle: string;
  visualizationLayers$: Observable<any>;
  constructor() {}

  ngOnInit(): void {}

  ngOnChanges() {
    this.favTitle = this.favoriteTitle;
    this.setVisualization(this.dataSelections);
  }

  setVisualization(dataSelections: any[], vizLayers?) {
    const visualizationLayerPromises = [1].map((item) => {
      const analytics = new Fn.Analytics();

      (dataSelections || []).forEach((dataSelection) => {
        switch (dataSelection.dimension) {
          case 'dx':
            analytics.setData(
              dataSelection.items.map((item) => item.id).join(';')
            );
            break;

          case 'pe':
            analytics.setPeriod(
              dataSelection.items.map((item) => item.id).join(';')
            );
            break;

          case 'ou':
            analytics.setOrgUnit(
              dataSelection.items.map((item) => item.id).join(';')
            );
            break;
          default:
            analytics.setDimension(
              dataSelection?.id,
              dataSelection.items.map((item) => item.id).join(';')
            );
            break;
        }
      });
      return analytics;
    });

    const vizPromises = this.loadData(visualizationLayerPromises);
    vizPromises.then((response) => {
      this.visualizationLayers$ = of(response);
    });
  }

  setFavoriteTitle(title) {
    this.favTitle = title;
  }

  loadData(visualizationLayerPromises): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const visualizationResult = await Fn.all(visualizationLayerPromises)
          .postProcess((analyticsArray) => {
            return analyticsArray.map((analyticsResult, index) => {
              const visualizationLayer = {};
              return {
                ...visualizationLayer,
                id: 'favorite',
                config: {
                  name: this.favTitle,
                  currentType: 'CHART',
                  id: 'favorite',
                  title: this.favTitle,
                  type: 'COLUMN',
                  displayName: this.favTitle,
                  uiConfig: {
                    id: 'favorite',
                    title: this.favTitle,
                    width: 'span 12',
                    height: '450px',
                    displayName: this.favTitle,
                    name: this.favTitle,
                    showBody: true,
                    fullScreen: false,
                    hideFooter: true,
                    hideHeader: true,
                    showFilters: false,
                    showTitleBlock: true,
                    hideTypeButtons: true,
                    hideResizeButtons: true,
                    hideDownloadOptions: false,
                    hideManagementBlock: true,
                  },
                },
                analytics: analyticsResult._data,
                dataSelections: this.dataSelections.map((dataSelection) => {
                  return {
                    id: dataSelection?.dimension,
                    items: dataSelection?.items.map((item) => {
                      return {
                        id: item?.id,
                        dimensionItem: item?.id,
                        dimensionItemType: '',
                      };
                    }),
                    layout:
                      dataSelection?.dimension == 'ou'
                        ? 'filters'
                        : dataSelection?.dimension == 'dx'
                        ? 'columns'
                        : 'rows',
                    dimension: dataSelection?.dimension,
                  };
                }),
                layerType: 'thematic',
                layout: {
                  rows: ['pe'],
                  columns: ['dx'],
                  filters: ['ou'],
                },
                metadataIdentifiers: this.dataSelections
                  .filter(
                    (dataSelection) => dataSelection.dimension === 'dx'
                  )[0]
                  ?.items.map((item) => item?.id),
              };
            });
          })
          .get();

        resolve(visualizationResult);
      } catch (error) {
        reject('There was a problem loading visualization');
      }
    });
  }
}
