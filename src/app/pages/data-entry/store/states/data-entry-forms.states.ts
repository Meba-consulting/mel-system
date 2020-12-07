import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { BaseState, initialBaseState } from 'src/app/store/states/base.state';

export interface DataEntryFormsState extends BaseState, EntityState<any> {
  programMetadata: Array<any>;
}

export const dataEntryFormsAdapter: EntityAdapter<any> = createEntityAdapter<
  any
>();

export const initialDataEntryFormsState = dataEntryFormsAdapter.getInitialState(
  {
    ...initialBaseState,
    programMetadata: []
  }
);
