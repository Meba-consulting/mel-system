import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { CommonModule } from '@angular/common';
import { containers } from './containers';
import { FormsModule } from '@angular/forms';

import * as fromReducer from './store/reducers/dynamic-dimension.reducer';
import { DynamicDimensionEffects } from './store/effects/dynamic-dimension.effects';
import { pipes } from './pipes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    StoreModule.forFeature('dynamicDimension', fromReducer.reducer),
    EffectsModule.forFeature([DynamicDimensionEffects])
  ],
  declarations: [...containers, ...pipes],
  exports: [...containers]
})
export class NgxDhis2DynamicDimensionModule {}
