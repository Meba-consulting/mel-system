import { createReducer, on } from '@ngrx/store';
import {
  initialDataEntryFormsState,
  dataEntryFormsAdapter,
  DataEntryFormsState
} from '../states/data-entry-forms.states';
import {
  loadDataEntryFormsByOu,
  loadingFormsByOuFails,
  addSuccessLoadedFormsByOu
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
  }))
);

export function dataEntryFormsReducer(state, action): DataEntryFormsState {
  return reducer(state, action);
}
