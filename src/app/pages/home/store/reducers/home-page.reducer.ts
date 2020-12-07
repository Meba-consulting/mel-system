import { createReducer, on } from '@ngrx/store';
import { initialHomePageDesignState } from '../states/home-page.states';
import {
  loadHomePageDesign,
  addHomePageDesign,
  loadingHomePageDesignFail
} from '../actions';
import {
  loadingBaseState,
  loadedBaseState,
  errorBaseState
} from 'src/app/store/states/base.state';

export const reducer = createReducer(
  initialHomePageDesignState,
  on(loadHomePageDesign, state => ({
    ...state,
    ...loadingBaseState
  })),
  on(addHomePageDesign, (state, { htmlCode }) => ({
    ...state,
    htmlCode: htmlCode,
    ...loadedBaseState
  })),
  on(loadingHomePageDesignFail, (state, { error }) => ({
    ...state,
    error,
    ...loadedBaseState,
    ...errorBaseState
  }))
);

export function homePageReducer(state, action) {
  return reducer(state, action);
}
