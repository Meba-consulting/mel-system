import {
  createFeatureSelector,
  MemoizedSelector,
  createSelector
} from '@ngrx/store';
import { HomePageDesignState } from '../states/home-page.states';

export const getHomePageDesignState: MemoizedSelector<
  object,
  HomePageDesignState
> = createFeatureSelector<HomePageDesignState>('homePageDesign');

export const getHomePageDesign = createSelector(
  getHomePageDesignState,
  (state: HomePageDesignState) => state.htmlCode
);

export const getHomePageLoadingState = createSelector(
  getHomePageDesignState,
  (state: HomePageDesignState) => state.loading
);
