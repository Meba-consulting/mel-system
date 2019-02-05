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
