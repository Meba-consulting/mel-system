import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';
import * as _ from 'lodash';
import * as fromDynamicDimension from '../../store/reducers/dynamic-dimension.reducer';
import * as fromDynamicDimensionSelectors from '../../store/selectors/dynamic-dimension.selectors';
import { Store } from '@ngrx/store';
import { LoadDynamicDimensionsAction } from '../../store/actions/dynamic-dimension.actions';
import { Observable, of } from 'rxjs';
import { DynamicDimension } from '../../store/models/dynamic-dimension.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ngx-dhis2-dynamic-dimension',
  templateUrl: './ngx-dhis2-dynamic-dimension.component.html',
  styleUrls: ['./ngx-dhis2-dynamic-dimension.component.scss']
})
export class NgxDhis2DynamicDimensionComponent implements OnInit, OnDestroy {
  @Input()
  selectedDynamicDimensions: any[];

  selectedDimensions: any[];

  dynamicDimensions$: Observable<DynamicDimension[]>;

  private _activeDimension: any;

  dimensionSearchQuery: string;
  dimensionItemSearchQuery: string;

  dynamicDimensionLoading$: Observable<boolean>;

  @Output()
  dynamicDimensionUpdate: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  dynamicDimensionClose: EventEmitter<any> = new EventEmitter<any>();
  showBody: boolean;

  get selectedDimensionItems(): any[] {
    return _.flatten(
      _.map(
        this.selectedDimensions || [],
        (selectedDimension: any) => selectedDimension.items || []
      )
    );
  }

  get dynamicDimensionList$(): Observable<DynamicDimension[]> {
    return this.dynamicDimensions$.pipe(
      map((dynamicDimensions: DynamicDimension[]) => {
        return _.map(
          dynamicDimensions,
          (dynamicDimension: DynamicDimension) => {
            const selectedDimension: DynamicDimension = _.find(
              this.selectedDimensions,
              ['id', dynamicDimension.id || dynamicDimension.dimension]
            );
            return {
              ...dynamicDimension,
              selectedCount: selectedDimension
                ? selectedDimension.items.length
                : 0
            };
          }
        );
      })
    );
  }
  get activeDimension$(): Observable<DynamicDimension> {
    if (!this._activeDimension) {
      const firstSelectedDimension =
        this.selectedDimensions || this.selectedDynamicDimensions
          ? (this.selectedDimensions || this.selectedDynamicDimensions)[0]
          : null;

      return this.dynamicDimensions$.pipe(
        map((dynamicDimensions: DynamicDimension[]) => {
          const activeDimension: DynamicDimension =
            _.find(dynamicDimensions, [
              'id',
              firstSelectedDimension
                ? firstSelectedDimension.id || firstSelectedDimension.dimension
                : ''
            ]) || dynamicDimensions[0];
          const newActiveDimension = activeDimension
            ? {
                ...activeDimension,
                items: _.filter(
                  activeDimension.items || [],
                  (item: any) =>
                    !_.find(this.selectedDimensionItems, ['id', item.id])
                )
              }
            : null;
          // Also set active dimension in private property for later uses
          this._activeDimension = newActiveDimension;
          return newActiveDimension;
        })
      );
    }

    return this.dynamicDimensions$.pipe(
      map((dynamicDimensions: DynamicDimension[]) => {
        const updatedActivedDimension =
          _.find(dynamicDimensions, ['id', this._activeDimension.id]) ||
          dynamicDimensions[0];

        return updatedActivedDimension
          ? {
              ...updatedActivedDimension,
              items: _.filter(
                updatedActivedDimension.items || [],
                (item: any) =>
                  !_.find(this.selectedDimensionItems, ['id', item.id])
              )
            }
          : null;
      })
    );
  }

  constructor(
    private dynamicDimensionStore: Store<fromDynamicDimension.State>
  ) {
    this.selectedDimensions = [];
    this.dynamicDimensionStore.dispatch(new LoadDynamicDimensionsAction());

    // select dynamic dimension prorperties
    this.dynamicDimensions$ = this.dynamicDimensionStore.select(
      fromDynamicDimensionSelectors.getDynamicDimensions
    );

    this.dynamicDimensionLoading$ = this.dynamicDimensionStore.select(
      fromDynamicDimensionSelectors.getDynamicDimensionLoadingStatus
    );
  }

  ngOnInit() {
    this.selectedDimensions = _.map(
      this.selectedDynamicDimensions || [],
      (selectedDynamicDimension: any) => {
        return {
          ...selectedDynamicDimension,
          id: selectedDynamicDimension.id || selectedDynamicDimension.dimension
        };
      }
    );
  }

  onSetActiveDynamicDimension(dynamicDimension: DynamicDimension) {
    this._activeDimension = dynamicDimension;
  }

  onAddDimensionItem(dimensionObject, dimensionItem: any, e?) {
    if (e) {
      e.stopPropagation();
    }
    const availableDimensionObject = _.find(this.selectedDimensions, [
      'dimension',
      dimensionObject.dimension || dimensionObject.id
    ]);

    if (!availableDimensionObject) {
      this.selectedDimensions = [
        ...this.selectedDimensions,
        {
          ...dimensionObject,
          items: [dimensionItem]
        }
      ];
    } else {
      const availableDimensionIndex = this.selectedDimensions.indexOf(
        availableDimensionObject
      );

      this.selectedDimensions =
        availableDimensionIndex !== -1
          ? [
              ..._.slice(this.selectedDimensions, 0, availableDimensionIndex),
              {
                ...availableDimensionObject,
                changed: true,
                items: _.uniqBy(
                  [...availableDimensionObject.items, dimensionItem],
                  'id'
                )
              },
              ..._.slice(this.selectedDimensions, availableDimensionIndex + 1)
            ]
          : this.selectedDimensions;
    }
  }

  onRemoveDimensionItem(dimensionItem: any, e?) {
    if (e) {
      e.stopPropagation();
    }

    const dimensionObject: any = _.filter(
      this.selectedDimensions,
      (selectedDimensionObject: any) =>
        _.find(selectedDimensionObject.items, ['id', dimensionItem.id])
    )[0];

    const availableDimensionObject = dimensionObject
      ? _.find(this.selectedDimensions, ['id', dimensionObject.id]) ||
        _.find(this.selectedDimensions, [
          'dimension',
          dimensionObject.dimension
        ])
      : null;

    if (availableDimensionObject) {
      const availableDimensionIndex = this.selectedDimensions.indexOf(
        availableDimensionObject
      );

      const dimensionItemIndex = availableDimensionObject.items.indexOf(
        _.find(availableDimensionObject.items || [], ['id', dimensionItem.id])
      );

      this.selectedDimensions =
        availableDimensionIndex !== -1
          ? [
              ..._.slice(this.selectedDimensions, 0, availableDimensionIndex),
              {
                ...availableDimensionObject,
                changed: true,
                items: [
                  ..._.slice(
                    availableDimensionObject.items,
                    0,
                    dimensionItemIndex
                  ),
                  ..._.slice(
                    availableDimensionObject.items,
                    dimensionItemIndex + 1
                  )
                ]
              },
              ..._.slice(this.selectedDimensions, availableDimensionIndex + 1)
            ]
          : this.selectedDimensions;
    }
  }

  onAddAllItems(dimensionObject: DynamicDimension, e) {
    e.stopPropagation();
    _.each(dimensionObject.items || [], (dimensionItem: any) => {
      this.onAddDimensionItem(dimensionObject, dimensionItem);
    });
  }

  onRemoveAllItems(e) {
    e.stopPropagation();
    this.selectedDimensions = [];
  }

  onClose(e) {
    e.stopPropagation();
    this.dynamicDimensionClose.emit(this.selectedDimensions);
  }

  onUpdate(e) {
    e.stopPropagation();
    this.dynamicDimensionUpdate.emit(this.selectedDimensions);
  }

  ngOnDestroy() {
    this.dynamicDimensionClose.emit(this.selectedDimensions);
  }
}
