import { BaseState, initialBaseState } from "src/app/store/states/base.state";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

export interface ProceduresState extends BaseState, EntityState<any> {
  configurations: any;
}

export const proceduresAdapter: EntityAdapter<any> = createEntityAdapter<any>();

export const initialProceduresState = proceduresAdapter.getInitialState({
  ...initialBaseState,
  configurations: null
});
