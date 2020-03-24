import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { initialBaseState, BaseState } from 'src/app/store/states/base.state';

export interface StandardReportConfigsState
  extends BaseState,
    EntityState<any> {}

export const standardReportsConfigsAdapter: EntityAdapter<any> = createEntityAdapter<
  any
>();

export const initialStandardReportsConfigsState = standardReportsConfigsAdapter.getInitialState(
  {
    ...initialBaseState
  }
);
