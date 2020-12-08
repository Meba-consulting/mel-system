import { createReducer, on } from '@ngrx/store';
import {
  addLoadedAttributes,
  loadAttributes,
  loadingAttributesFails,
} from '../actions';
import {
  attributesAdapter,
  initialAttributesState,
} from '../states/attributes.states';
import {
  errorBaseState,
  loadedBaseState,
  loadingBaseState,
} from '../states/base.state';

const reducer = createReducer(
  initialAttributesState,
  on(loadAttributes, (state) => ({
    ...state,
    ...loadingBaseState,
  })),
  on(addLoadedAttributes, (state, { attributes }) =>
    attributesAdapter.addMany(attributes, { ...state, ...loadedBaseState })
  ),
  on(loadingAttributesFails, (state, { error }) => ({
    ...state,
    error,
    ...errorBaseState,
  }))
);

export function attributesReducer(state, action) {
  return reducer(state, action);
}
