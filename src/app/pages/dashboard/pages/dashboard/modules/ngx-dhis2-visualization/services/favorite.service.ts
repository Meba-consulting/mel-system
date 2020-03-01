import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import * as _ from 'lodash';
import { Observable, of, throwError, zip } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { getFavoriteUrl } from '../helpers';
import { FavoriteConfiguration } from '../models/favorite-configurations.model';

@Injectable({ providedIn: 'root' })
export class FavoriteService {
  constructor(
    private httpClient: NgxDhis2HttpClientService,
    private http: HttpClient
  ) {}

  getAll() {
    return this.httpClient.get('dataStore/favorites').pipe(
      switchMap(favoriteIds =>
        zip(
          ..._.map(favoriteIds, favoriteId => {
            return this.httpClient.get(`dataStore/favorites/${favoriteId}`);
          })
        )
      )
    );
  }

  getFavorite(
    favorite: { id: string; type: string },
    configurations: FavoriteConfiguration = {
      useDataStoreAsSource: false,
      useBothSources: true,
      useDataStoreForSaving: true
    },
    namespace: string = 'favorites'
  ): Observable<any> {
    return configurations.useDataStoreAsSource
      ? this.getFromDataStore(namespace, favorite.id)
      : configurations.useBothSources
      ? zip(
          this.getFromApi(favorite),
          this.getFromDataStore(namespace, favorite.id).pipe(
            catchError((error: any) => {
              if (error.status !== 404) {
                return throwError(error);
              }

              return this.http.get('config/favorites.json').pipe(
                switchMap((favorites: any[]) => {
                  const availableFavorite = _.find(favorites, [
                    'id',
                    favorite.id
                  ]);

                  return availableFavorite
                    ? this.create(
                        '',
                        availableFavorite,
                        configurations,
                        namespace
                      )
                    : of({});
                }),
                catchError(() => of({}))
              );
            })
          )
        ).pipe(
          map((favoriteResults: any[]) => {
            return { ...favoriteResults[0], ...favoriteResults[1] };
          })
        )
      : this.getFromApi(favorite);
  }

  getFromDataStore(namespace: string, favoriteId: string) {
    return this.httpClient.get(`dataStore/${namespace}/${favoriteId}`);
  }

  getFromApi(favorite: any) {
    const favoriteUrl = getFavoriteUrl(favorite);
    return favoriteUrl !== '' ? this.httpClient.get(favoriteUrl) : of(null);
  }

  create(
    favoriteUrl: string,
    favorite: any,
    configurations?: FavoriteConfiguration,
    namespace?: string
  ) {
    return configurations && configurations.useDataStoreForSaving
      ? this.httpClient
          .post(`dataStore/${namespace}/${favorite.id}`, favorite)
          .pipe(map(() => favorite))
      : this.httpClient.post(favoriteUrl, favorite).pipe(map(() => favorite));
  }

  update(favoriteUrl: string, favorite: any) {
    return this.httpClient
      .put(`${favoriteUrl}/${favorite.id}`, favorite)
      .pipe(map(() => favorite));
  }

  delete(favoriteId: string, favoriteType: string) {
    return this.httpClient.delete(`${favoriteType}s/${favoriteId}`);
  }
}
