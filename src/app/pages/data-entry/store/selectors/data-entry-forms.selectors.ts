import {
  createFeatureSelector,
  MemoizedSelector,
  createSelector
} from '@ngrx/store';
import {
  DataEntryFormsState,
  dataEntryFormsAdapter
} from '../states/data-entry-forms.states';
import * as _ from 'lodash';

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

export const getFormsLoadedState = createSelector(
  getDataEntryFormsState,
  (state: DataEntryFormsState) => state.loaded
);

export const getProgramMetadataById = createSelector(
  getDataEntryFormsState,
  (state: DataEntryFormsState, props) =>
    _.filter(state.programMetadata, { id: props.id })[0]
);

export const getAllProgramMetadata = createSelector(
  getDataEntryFormsState,
  (state: DataEntryFormsState) => (state ? state.programMetadata : [])
);

export const getProgramStageById = createSelector(
  getDataEntryFormsState,
  (state, props) =>
    state.programMetadata && props.id.indexOf('default') == -1
      ? {
          ..._.filter(state.programMetadata['programStages'], {
            id: props.id
          })[0],
          ...{
            trackerProgramId: 'IzEQE6HnpoC',
            trackedEntityType: 'GypuFqZTCTf'
          }
        }
      : state.programMetadata
);
