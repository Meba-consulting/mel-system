import { createReducer, on } from "@ngrx/store";
import {
  initialProceduresState,
  FormsState,
  formsAdapter
} from "../states/forms.states";
import {
  addLoadedDocuments,
  loadFormsConfigurations,
  addLoadedFormsConfigurations,
  loadingFormsConfigurationsFail,
  loadFormsDocuments
} from "../actions";
import {
  loadingBaseState,
  errorBaseState
} from "src/app/store/states/base.state";

export const reducer = createReducer(
  initialProceduresState,
  on(loadFormsConfigurations, state => ({
    ...state,
    ...loadingBaseState
  })),
  on(addLoadedFormsConfigurations, (state, { formsConfigs }) => ({
    ...state,
    configurations: formsConfigs
  })),
  on(loadingFormsConfigurationsFail, (state, { error }) => ({
    ...state,
    ...errorBaseState,
    error
  })),
  on(loadFormsDocuments, state => ({
    ...state
  })),
  on(addLoadedDocuments, (state, { documentsInfo }) =>
    formsAdapter.addOne(documentsInfo, { ...state })
  )
);

export function formsReducer(state, action): FormsState {
  return reducer(state, action);
}
