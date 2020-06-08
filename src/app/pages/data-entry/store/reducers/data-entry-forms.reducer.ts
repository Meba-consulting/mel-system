import { createReducer, on } from '@ngrx/store';
import {
  initialDataEntryFormsState,
  dataEntryFormsAdapter,
  DataEntryFormsState
} from '../states/data-entry-forms.states';
import {
  loadDataEntryFormsByOu,
  loadingFormsByOuFails,
  addSuccessLoadedFormsByOu,
  loadProgramMetadata,
  addLoadedProgramMetadata,
  loadingProgramMetadataFails
} from '../actions';
import {
  loadingBaseState,
  loadedBaseState,
  errorBaseState
} from 'src/app/store/states/base.state';

export const reducer = createReducer(
  initialDataEntryFormsState,
  on(loadDataEntryFormsByOu, state => ({
    ...state,
    ...loadingBaseState
  })),
  on(addSuccessLoadedFormsByOu, (state, { forms }) =>
    dataEntryFormsAdapter.addOne(forms, { ...state, ...loadedBaseState })
  ),
  on(loadingFormsByOuFails, (state, { error }) => ({
    ...state,
    ...errorBaseState,
    error
  })),
  on(loadProgramMetadata, state => ({
    ...state
  })),
  on(addLoadedProgramMetadata, (state, { programMetadata }) => ({
    ...state,
    programMetadata
  })),
  on(loadingProgramMetadataFails, (state, { error }) => ({
    ...state,
    error
  }))
);

export function dataEntryFormsReducer(state, action): DataEntryFormsState {
  return reducer(state, action);
}
