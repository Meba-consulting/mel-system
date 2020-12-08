import { createSelector } from '@ngrx/store';
import { getRootState, State } from '../reducers';
import {
  attributesAdapter,
  AttributesState,
} from '../states/attributes.states';

import * as _ from 'lodash';

const getAttributesState = createSelector(
  getRootState,
  (state: State) => state.attributes
);

export const {
  selectAll: getAllSystemAttributes,
  selectEntities: getAllAttributesEntities,
} = attributesAdapter.getSelectors(getAttributesState);

export const getAttributeByName = createSelector(
  getAllSystemAttributes,
  (attributes, props) => {
    return (_.filter(attributes, { name: props?.name }) || [])[0];
  }
);

export const getAttributesLoadedState = createSelector(
  getAttributesState,
  (state: AttributesState) => state.loaded
);
