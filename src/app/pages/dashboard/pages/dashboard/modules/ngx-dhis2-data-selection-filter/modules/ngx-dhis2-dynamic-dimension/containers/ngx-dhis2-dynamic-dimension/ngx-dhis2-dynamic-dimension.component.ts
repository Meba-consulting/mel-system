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
import { map, take } from 'rxjs/operators';

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
  dynamicDimensionList$: Observable<DynamicDimension[]>;
  activeDimension$: Observable<DynamicDimension>;
  selectedDimensionItems: any[];

  @Output()
  dynamicDimensionUpdate: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  dynamicDimensionClose: EventEmitter<any> = new EventEmitter<any>();
  showBody: boolean;

  constructor(
    private dynamicDimensionStore: Store<fromDynamicDimension.State>
  ) {}

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

    this.dynamicDimensionStore.dispatch(new LoadDynamicDimensionsAction());

    // select dynamic dimension properties
    this._setOrUpdateParameters();
  }

  private _setOrUpdateParameters() {
    this.selectedDimensionItems = _.flatten(
      _.map(
        this.selectedDimensions || [],
        (selectedDimension: any) => selectedDimension.items || []
      )
    );

    this.dynamicDimensionList$ = this.dynamicDimensionStore.select(
      fromDynamicDimensionSelectors.getDynamicDimensionsWithSelected(
        this.selectedDimensions
      )
    );

    this.activeDimension$ = this.dynamicDimensionStore.select(
      fromDynamicDimensionSelectors.getActiveDimension(
        this.selectedDimensions,
        this.selectedDynamicDimensions,
        this.selectedDimensionItems,
        this._activeDimension
      )
    );

    this.activeDimension$.pipe(take(1)).subscribe(activeDimension => {
      this._activeDimension = activeDimension;
    });

    this.dynamicDimensionLoading$ = this.dynamicDimensionStore.select(
      fromDynamicDimensionSelectors.getDynamicDimensionLoadingStatus
    );
  }

  onSetActiveDynamicDimension(dynamicDimension: DynamicDimension, e) {
    e.stopPropagation();
    this._activeDimension = dynamicDimension;
    this._setOrUpdateParameters();
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

    this._setOrUpdateParameters();
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

    this._setOrUpdateParameters();
  }

  onAddAllItems(dimensionObject: DynamicDimension, e) {
    e.stopPropagation();
    _.each(dimensionObject.items || [], (dimensionItem: any) => {
      this.onAddDimensionItem(dimensionObject, dimensionItem);
    });

    this._setOrUpdateParameters();
  }

  onRemoveAllItems(e) {
    e.stopPropagation();
    this.selectedDimensions = [];

    this._setOrUpdateParameters();
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
