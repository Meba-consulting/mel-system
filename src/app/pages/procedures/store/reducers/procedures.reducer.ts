import { createReducer, on } from "@ngrx/store";
import {
  initialProceduresState,
  proceduresAdapter,
  ProceduresState
} from "../states/procedures.states";
import {
  loadProceduresConfigurations,
  addLoadedProceduresConfigurations,
  loadingProceduresConfigurationsFail,
  loadDocuments,
  addLoadedDocuments
} from "../actions";
import {
  loadingBaseState,
  loadedBaseState,
  errorBaseState
} from "src/app/store/states/base.state";

export const reducer = createReducer(
  initialProceduresState,
  on(loadProceduresConfigurations, state => ({
    ...state,
    ...loadingBaseState
  })),
  on(addLoadedProceduresConfigurations, (state, { proceduresConfigs }) => ({
    ...state,
    configurations: proceduresConfigs
  })),
  on(loadingProceduresConfigurationsFail, (state, { error }) => ({
    ...state,
    ...errorBaseState,
    error
  })),
  on(loadDocuments, state => ({
    ...state
  })),
  on(addLoadedDocuments, (state, { documentsInfo }) =>
    proceduresAdapter.addOne(documentsInfo, { ...state })
  )
);

export function procedureReducer(state, action): ProceduresState {
  return reducer(state, action);
}
