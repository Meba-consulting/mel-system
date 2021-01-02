import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { BaseState } from 'src/app/store/states/base.state';

export interface clubsState extends BaseState, EntityState<any> {
  savingClub: boolean;
  savedClub: boolean;
  currentClub: any;
  editingClub: boolean;
}

export const clubsAdapter: EntityAdapter<any> = createEntityAdapter<any>();

export const initialClubsState = clubsAdapter.getInitialState({
  savingClub: false,
  savedClub: false,
  currentClub: null,
  editingClub: false,
});
