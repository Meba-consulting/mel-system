import { createSelector } from '@ngrx/store';
import * as fromIndicator from '../reducers/indicator.reducer';
import * as _ from 'lodash';

export const getIndicatorsInitiatedStatus = createSelector(
  fromIndicator.getIndicatorState,
  (state: fromIndicator.State) => state.loadInitiated
);

export const getIndicatorsLoadingStatus = createSelector(
  fromIndicator.getIndicatorState,
  (state: fromIndicator.State) => state.loading
);

export const getAllIndicators = createSelector(
  fromIndicator.getIndicatorState,
  (state: fromIndicator.State) => _.values(state.entities)
);
