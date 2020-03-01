import {
  createFeatureSelector,
  MemoizedSelector,
  createSelector
} from "@ngrx/store";
import { FormsState, formsAdapter } from "../states/forms.states";

export const getFormsState: MemoizedSelector<
  object,
  FormsState
> = createFeatureSelector<FormsState>("forms");

export const {
  selectEntities: getFormsEntities,
  selectAll: getForms
} = formsAdapter.getSelectors(getFormsState);

export const getFormsConfigurations = createSelector(
  getFormsState,
  (state: FormsState) => state.configurations
);
