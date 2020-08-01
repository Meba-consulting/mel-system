import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { RouterReducerState, routerReducer } from '@ngrx/router-store';
import { environment } from '../../../environments/environment';

import { userReducer, UserState } from './user.reducer';
import { systemInfoReducer, SystemInfoState } from './system-info.reducer';
import { LegendSetState, legendSetReducer } from './legend-set.reducer';
import { UserGroupsState } from '../states/user-groups.states';
import { userGroupsReducer } from './user-groups.reducer';
import { ProgramsState } from '../states/programs.states';
import { programsReducer } from './programs.reducers';

/**
 * Root state interface
 */
export interface State {
  /**
   * User state
   */
  user: UserState;

  /**
   * System info state
   */
  systemInfo: SystemInfoState;

  /**
   * Router state
   */
  route: RouterReducerState;
  legendSets: LegendSetState;
  userGroups: UserGroupsState;
  programs: ProgramsState;
}

export const reducers: ActionReducerMap<State> = {
  user: userReducer,
  systemInfo: systemInfoReducer,
  route: routerReducer,
  legendSets: legendSetReducer,
  userGroups: userGroupsReducer,
  programs: programsReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];

/**
 * Root state selector
 * @param {State} state
 * @returns {State} state
 */
export const getRootState = (state: State) => state;
