import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { settingsPages } from './pages';
import { EffectsModule } from '@ngrx/effects';
import { settingsEffects } from './store/effects';
import { settingsReducers } from './store/reducers';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { settingsComponents } from './components';
import { SettingsRoutingModule } from './settings-routing.module';

@NgModule({
  declarations: [...settingsPages, ...settingsComponents],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    SharedModule,
    ...settingsReducers,
    EffectsModule.forFeature(settingsEffects),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SettingsModule {}
