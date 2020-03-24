import { BaseState, initialBaseState } from 'src/app/store/states/base.state';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export interface AnalyticsDataState extends BaseState, EntityState<any> {
  countOfLoadedIndicator: number;
}

export const analyticsDataAdapter: EntityAdapter<any> = createEntityAdapter<
  any
>();

export const initialAnalyticsDataState = analyticsDataAdapter.getInitialState({
  ...initialBaseState,
  countOfLoadedIndicator: 0
});
