import { BaseState, initialBaseState } from 'src/app/store/states/base.state';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export interface ReportsListState extends BaseState, EntityState<any> {
  reportsList: any;
}

export const reportsListAdapter: EntityAdapter<any> = createEntityAdapter<
  any
>();

export const initialReportsListState = reportsListAdapter.getInitialState({
  reportsList: null,
  ...initialBaseState
});
