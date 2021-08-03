import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { VisualizationLayer } from '../../models/visualization-layer.model';
import { VisualizationInputs } from '../../models/visualization-inputs.model';
import { Observable, Subject } from 'rxjs';
import { Visualization } from '../../models/visualization.model';
import { VisualizationUiConfig } from '../../models/visualization-ui-config.model';
import { VisualizationProgress } from '../../models/visualization-progress.model';
import { VisualizationConfig } from '../../models/visualization-config.model';
import { LegendSet } from '../../models/legend-set.model';
import { VisualizationState } from '../../store/reducers';
import { Store } from '@ngrx/store';
import {
  InitializeVisualizationObjectAction,
  UpdateVisualizationObjectAction,
  SaveVisualizationFavoriteAction,
} from '../../store/actions/visualization-object.actions';
import {
  getCurrentVisualizationProgress,
  getVisualizationObjectById,
} from '../../store/selectors/visualization-object.selectors';
import {
  getCurrentVisualizationObjectLayers,
  getSingleVisualizationReloadCondition,
} from '../../store/selectors/visualization-layer.selectors';
import {
  getCurrentVisualizationUiConfig,
  getFocusedVisualization,
} from '../../store/selectors/visualization-ui-configuration.selectors';
import { getCurrentVisualizationConfig } from '../../store/selectors/visualization-configuration.selectors';
import {
  ShowOrHideVisualizationBodyAction,
  ToggleFullScreenAction,
  ToggleVisualizationFocusAction,
} from '../../store/actions/visualization-ui-configuration.actions';
import { UpdateVisualizationConfigurationAction } from '../../store/actions/visualization-configuration.actions';
import {
  LoadVisualizationAnalyticsAction,
  UpdateVisualizationLayerAction,
} from '../../store/actions/visualization-layer.actions';
import { take } from 'rxjs/operators';
import { openAnimation } from '../../../../../animations';
import { VisualizationBodySectionComponent } from '../../components/visualization-body-section/visualization-body-section';
import { getCurrentGlobalDataSelections } from 'src/app/pages/dashboard/pages/store/selectors';
import { Fn } from '@iapps/function-analytics';

@Component({
  selector: 'ngx-dhis2-visualization',
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [openAnimation],
})
export class VisualizationComponent implements OnInit, OnChanges {
  @Input() dashboardType: string;
  @Input()
  id: string;
  @Input()
  type: string;
  @Input()
  visualizationLayers: VisualizationLayer[];
  @Input()
  name: string;
  @Input()
  isNewFavorite: boolean;
  @Input()
  dashboardId: string;
  @Input()
  currentUser: any;

  @Input()
  legendSets: LegendSet[];
  @Input()
  systemInfo: any;
  cardFocused: boolean;

  @Input() hideHeader: boolean;

  @Output()
  toggleFullScreen: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  deleteVisualization: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild(VisualizationBodySectionComponent, { static: false })
  visualizationBody: VisualizationBodySectionComponent;

  private _visualizationInputs$: Subject<VisualizationInputs> = new Subject();
  visualizationObject$: Observable<Visualization>;
  visualizationLayers$: Observable<VisualizationLayer[]>;
  visualizationUiConfig$: Observable<VisualizationUiConfig>;
  visualizationProgress$: Observable<VisualizationProgress>;
  visualizationConfig$: Observable<VisualizationConfig>;
  focusedVisualization$: Observable<string>;
  globalSelections$: Observable<any>;
  loadSingleValueAnalytics: boolean = false;
  singleVisualizationReloadCondition$: Observable<boolean>;

  constructor(private store: Store<VisualizationState>) {
    this.cardFocused = false;
    this.type = 'REPORT_TABLE';
    this._visualizationInputs$
      .asObservable()
      .subscribe((visualizationInputs) => {
        if (visualizationInputs) {
          // initialize visualization object
          this.store.dispatch(
            new InitializeVisualizationObjectAction(
              visualizationInputs.id,
              visualizationInputs.name,
              visualizationInputs.type,
              visualizationInputs.visualizationLayers,
              visualizationInputs.currentUser,
              visualizationInputs.systemInfo
            )
          );

          // Get selectors
          this.visualizationObject$ = this.store.select(
            getVisualizationObjectById(visualizationInputs.id)
          );
          this.visualizationLayers$ = this.store.select(
            getCurrentVisualizationObjectLayers(visualizationInputs.id)
          );
          this.visualizationUiConfig$ = this.store.select(
            getCurrentVisualizationUiConfig(visualizationInputs.id)
          );
          this.visualizationProgress$ = this.store.select(
            getCurrentVisualizationProgress(visualizationInputs.id)
          );
          this.visualizationConfig$ = this.store.select(
            getCurrentVisualizationConfig(visualizationInputs.id)
          );

          this.focusedVisualization$ = store.select(getFocusedVisualization);
        }
      });
  }

  ngOnChanges() {
    this._visualizationInputs$.next({
      id: this.id,
      type: this.type,
      visualizationLayers: this.visualizationLayers,
      name: this.name,
      currentUser: this.currentUser,
      systemInfo: this.systemInfo,
    });

    this.globalSelections$ = this.store.select(getCurrentGlobalDataSelections);
    this.singleVisualizationReloadCondition$ = this.store.select(
      getSingleVisualizationReloadCondition
    );
  }

  ngOnInit() {}

  onToggleVisualizationBody(uiConfig) {
    this.store.dispatch(
      new ShowOrHideVisualizationBodyAction(uiConfig.id, {
        showBody: uiConfig.showBody,
      })
    );
  }

  onVisualizationTypeChange(visualizationTypeObject) {
    this.visualizationConfig$
      .pipe(take(1))
      .subscribe((visualizationConfig: VisualizationConfig) => {
        this.store.dispatch(
          new UpdateVisualizationConfigurationAction(
            visualizationTypeObject.id,
            {
              currentType: visualizationTypeObject.type,
            }
          )
        );

        if (
          visualizationConfig.currentType === 'MAP' ||
          visualizationTypeObject.type === 'MAP'
        ) {
          this.visualizationLayers$
            .pipe(take(1))
            .subscribe((visualizationLayers: VisualizationLayer[]) => {
              this.store.dispatch(
                new LoadVisualizationAnalyticsAction(
                  this.id,
                  visualizationLayers
                )
              );
            });
        }
      });
  }

  onFullScreenAction(event: {
    id: string;
    uiConfigId: string;
    fullScreen: boolean;
  }) {
    this.toggleFullScreen.emit({
      id: this.id,
      dashboardId: this.dashboardId,
      fullScreen: event.fullScreen,
    });
    this.store.dispatch(new ToggleFullScreenAction(event.uiConfigId));
  }

  onLoadVisualizationAnalytics(visualizationLayers: VisualizationLayer[]) {
    this.store.dispatch(
      new LoadVisualizationAnalyticsAction(this.id, visualizationLayers)
    );
  }

  onVisualizationLayerConfigUpdate(visualizationLayer: VisualizationLayer) {
    this.store.dispatch(
      new UpdateVisualizationLayerAction(visualizationLayer.id, {
        config: visualizationLayer.config,
      })
    );
  }

  onSaveFavorite(favoriteDetails) {
    this.store.dispatch(
      new SaveVisualizationFavoriteAction(
        this.id,
        favoriteDetails,
        this.dashboardId
      )
    );
  }

  onToggleVisualizationCardFocus(e, focused: boolean) {
    e.stopPropagation();
    if (this.cardFocused !== focused) {
      this.visualizationUiConfig$
        .pipe(take(1))
        .subscribe((visualizationUiConfig: VisualizationUiConfig) => {
          this.store.dispatch(
            new ToggleVisualizationFocusAction(visualizationUiConfig.id, {
              hideFooter: !focused,
              hideResizeButtons: !focused,
              hideOptions: !focused,
            })
          );
          this.cardFocused = focused;
        });
    }
  }

  onDeleteVisualizationAction(options: any) {
    this.visualizationObject$
      .pipe(take(1))
      .subscribe((visualization: Visualization) => {
        this.deleteVisualization.emit({
          visualization,
          deleteFavorite: options.deleteFavorite,
        });

        this.store.dispatch(
          new UpdateVisualizationObjectAction(this.id, {
            notification: {
              message: 'Removing dasboard item...',
              type: 'progress',
            },
          })
        );
      });
  }

  onVisualizationDownload(downloadDetails: any) {
    if (this.visualizationBody) {
      this.visualizationBody.onDownloadVisualization(
        downloadDetails.type,
        downloadDetails.downloadFormat
      );
    }
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

    this.visualizationLayers$ = new Observable((observer) => {
      Fn.all(visualizationLayerPromises)
        .postProcess((analyticsArray) => {
          return analyticsArray.map((analyticsResult, index) => {
            const visualizationLayer = {};
            return {
              ...visualizationLayer,
              analytics: analyticsResult._data,
            };
          });
        })
        .get()
        .then((results) => {
          observer.next(results);
          observer.complete();
        })
        .catch((error) => {
          observer.next([]);
          observer.complete();
        });
    });
  }
}
