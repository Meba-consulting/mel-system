import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { containers } from './containers';
import { pipes } from './pipes';
import { DynamicDimensionEffects } from './store/effects/dynamic-dimension.effects';
import * as fromReducer from './store/reducers/dynamic-dimension.reducer';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    StoreModule.forFeature('dynamicDimension', fromReducer.reducer),
    EffectsModule.forFeature([DynamicDimensionEffects])
  ],
  declarations: [...containers, ...pipes],
  exports: [...containers]
})
export class NgxDhis2DynamicDimensionModule {}
