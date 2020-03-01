import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { BaseState, initialBaseState } from 'src/app/store/states/base.state';

export interface IndicatorDataState extends BaseState, EntityState<any> {}

export const indicatorDataAdapter: EntityAdapter<any> = createEntityAdapter<
  any
>();

export const initialIndicatorDataState = indicatorDataAdapter.getInitialState({
  ...initialBaseState
});
