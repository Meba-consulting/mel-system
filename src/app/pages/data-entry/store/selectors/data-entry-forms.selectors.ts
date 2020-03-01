import {
  createFeatureSelector,
  MemoizedSelector,
  createSelector
} from '@ngrx/store';
import {
  DataEntryFormsState,
  dataEntryFormsAdapter
} from '../states/data-entry-forms.states';

export const getDataEntryFormsState: MemoizedSelector<
  object,
  DataEntryFormsState
> = createFeatureSelector<DataEntryFormsState>('dataEntryForms');

export const {
  selectEntities: getDataEntryFormsByOuEntities,
  selectAll: getDataEntryFormsByOu
} = dataEntryFormsAdapter.getSelectors(getDataEntryFormsState);

export const getDataEntryFormsByOuId = createSelector(
  getDataEntryFormsByOuEntities,
  (entities, props) => entities[props.id]
);
