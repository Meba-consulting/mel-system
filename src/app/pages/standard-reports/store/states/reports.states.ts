import { BaseState } from 'src/app/store/states/base.state';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export interface OldReportsState extends BaseState, EntityState<any> {
  reportsList: Array<any>;
  loadingReportMetadata: boolean;
  loadedReportsMetadata: boolean;
  reportMetadataError: any;
  countOfReportsTypesLoaded: number;
}

export const oldReportsAdapter: EntityAdapter<any> = createEntityAdapter<any>();

export const initialOldReportsState = oldReportsAdapter.getInitialState({
  reportsList: [],
  loadingReportMetadata: false,
  loadedReportsMetadata: false,
  reportMetadataError: null,
  countOfReportsTypesLoaded: 0
});
