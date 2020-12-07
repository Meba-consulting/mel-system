import * as fromDynamicDimension from '../reducers/dynamic-dimension.reducer';
import * as _ from 'lodash';
import { createSelector } from '@ngrx/store';
import { DynamicDimension } from '../models/dynamic-dimension.model';

export const getDynamicDimensionInitiatedStatus = createSelector(
  fromDynamicDimension.getDynamicDimensionState,
  (state: fromDynamicDimension.State) => state.loadInitiated
);

export const getAllowedDynamicDimensions = createSelector(
  fromDynamicDimension.getDynamicDimensionState,
  (state: fromDynamicDimension.State) => state.allowedDimensions
);

export const getDynamicDimensionLoadingStatus = createSelector(
  fromDynamicDimension.getDynamicDimensionState,
  (state: fromDynamicDimension.State) => state.loading
);

export const getDynamicDimensions = createSelector(
  fromDynamicDimension.getAllDynamicDimensions,
  getAllowedDynamicDimensions,
  (dynamicDimensions: DynamicDimension[], allowedDimensions: string[]) =>
    _.filter(dynamicDimensions, (dynamicDimension: any) =>
      allowedDimensions.includes(dynamicDimension.id)
    )
);

export const getDynamicDimensionsWithSelected = selectedDimensions =>
  createSelector(
    getDynamicDimensions,
    (dynamicDimensions: DynamicDimension[]) => {
      return dynamicDimensions.map((dynamicDimension: DynamicDimension) => {
        const selectedDimension: DynamicDimension = _.find(selectedDimensions, [
          'id',
          dynamicDimension.id || dynamicDimension.dimension
        ]);

        return {
          ...dynamicDimension,
          selectedCount: selectedDimension ? selectedDimension.items.length : 0
        };
      });
    }
  );

export const getActiveDimension = (
  selectedDimensions,
  selectedDynamicDimensions,
  selectedDimensionItems,
  activeDimension
) =>
  createSelector(
    getDynamicDimensions,
    (dynamicDimensions: DynamicDimension[]) => {
      if (!activeDimension) {
        const firstSelectedDimension =
          selectedDimensions || selectedDynamicDimensions
            ? (selectedDimensions || selectedDynamicDimensions)[0]
            : null;

        const availableActiveDimension: DynamicDimension =
          _.find(dynamicDimensions, [
            'id',
            firstSelectedDimension
              ? firstSelectedDimension.id || firstSelectedDimension.dimension
              : ''
          ]) || dynamicDimensions[0];

        return availableActiveDimension
          ? {
              ...availableActiveDimension,
              items: _.filter(
                availableActiveDimension.items || [],
                (item: any) => !_.find(selectedDimensionItems, ['id', item.id])
              )
            }
          : null;
      }

      const updatedActiveDimension =
        _.find(dynamicDimensions, ['id', activeDimension.id]) ||
        dynamicDimensions[0];

      return updatedActiveDimension
        ? {
            ...updatedActiveDimension,
            items: _.filter(
              updatedActiveDimension.items || [],
              (item: any) => !_.find(selectedDimensionItems, ['id', item.id])
            )
          }
        : null;
    }
  );
