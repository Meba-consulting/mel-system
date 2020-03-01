import { BaseState, initialBaseState } from "src/app/store/states/base.state";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

export interface FormsState extends BaseState, EntityState<any> {
  configurations: any;
}

export const formsAdapter: EntityAdapter<any> = createEntityAdapter<any>();

export const initialProceduresState = formsAdapter.getInitialState({
  ...initialBaseState,
  configurations: null
});
