import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { UserActions, UserActionTypes } from '../actions/user.actions';
import { User, ErrorMessage } from 'src/app/pages/dashboard/pages/models';

export interface UserState extends EntityState<User> {
  // additional entities state properties

  /**
   * User loading status
   */
  loading: boolean;

  /**
   * User information loaded status
   */
  loaded: boolean;

  /**
   * User information error status
   */
  hasError: boolean;

  /**
   * User loading error
   */
  error: ErrorMessage;

  users: any;
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>();

export const initialState: UserState = adapter.getInitialState({
  // additional entity state properties
  loading: false,
  loaded: false,
  hasError: false,
  error: null,
  users: null
});

export function userReducer(
  state = initialState,
  action: UserActions
): UserState {
  switch (action.type) {
    case UserActionTypes.LoadCurrentUser: {
      return {
        ...state,
        loading: true,
        loaded: false,
        hasError: false,
        error: null
      };
    }

    case UserActionTypes.AddCurrentUser: {
      return adapter.addOne(action.currentUser, {
        ...state,
        loading: false,
        loaded: true
      });
    }

    case UserActionTypes.LoadCurrentUserFail: {
      return { ...state, loading: false, hasError: true, error: action.error };
    }

    case UserActionTypes.LoadSystemUsers: {
      return { ...state };
    }

    case UserActionTypes.AddSystemUsers: {
      return {
        ...state,
        users: action.users
      };
    }

    case UserActionTypes.LoadingSystemUsersFail: {
      return {
        ...state,
        hasError: true,
        error: action.error
      };
    }

    default: {
      return state;
    }
  }
}

// additional selectors

/**
 * User loading state selector
 * @param {UserState} state
 * @return {boolean} loading
 */
export const getUserLoadingState = (state: UserState) => state.loading;
export const getUserLoadedState = (state: UserState) => state.loaded;
export const getUserHasErrorState = (state: UserState) => state.hasError;
export const getUserErrorState = (state: UserState) => state.error;
export const getSystemUsers = (state: UserState) => state.users;

export const { selectAll: selectAllUsers } = adapter.getSelectors();
