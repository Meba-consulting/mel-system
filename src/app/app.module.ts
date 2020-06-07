import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { environment } from '../environments/environment';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {
  RouterStateSerializer,
  StoreRouterConnectingModule, DefaultRouterStateSerializer
} from '@ngrx/router-store';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxDhis2HttpClientModule } from '@iapps/ngx-dhis2-http-client';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

import { reducers, metaReducers, effects } from './store';

import { AngularFireModule } from '@angular/fire';

import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { RouteSerializer } from './pages/dashboard/pages/utils';
import { FilterItemsPipe } from './core/pipes/filter-items.pipe';
import { ChattingComponent } from './shared/components/chatting/chatting.component';
import { FormsModule } from '@angular/forms';
import { NgxDhis2OrgUnitFilterModule } from '@iapps/ngx-dhis2-org-unit-filter';

@NgModule({
  declarations: [AppComponent, FilterItemsPipe, ChattingComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NgxDhis2OrgUnitFilterModule,
    NgxDhis2HttpClientModule.forRoot({
      version: 1,
      namespace: 'iapps',
      models: {
        organisationUnits: 'id,level',
        organisationUnitLevels: 'id,level',
        organisationUnitGroups: 'id'
      }
    }),
    /**
     * Translation module
     */
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    /**
     * Routing module
     */
    AppRoutingModule,

    /**
     * Module for registering ngrx store reducers
     */
    StoreModule.forRoot(reducers, { metaReducers }),

    /**
     * @ngrx/router-store keeps router state up-to-date in the store
     */
    StoreRouterConnectingModule.forRoot({ serializer: DefaultRouterStateSerializer }),

    /**
     * Module for registering ngrx store side effects
     */
    EffectsModule.forRoot(effects),

    /**
     * Development tool for debugging ngrx store operations
     */
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    AngularFireModule.initializeApp(environment.firebase, 'fcc-book-trading'), // imports firebase/app needed for everything
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    AngularFireDatabaseModule
  ],
  providers: [{ provide: RouterStateSerializer, useClass: RouteSerializer }],
  bootstrap: [AppComponent]
})
export class AppModule {}
