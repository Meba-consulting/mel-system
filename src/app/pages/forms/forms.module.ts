import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { pages } from './pages';
import { FormsRoutingModule } from './forms-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { effects } from './store/effects';
import { reducers } from './store/reducers';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [...pages],
  imports: [
    CommonModule,
    FormsRoutingModule,
    SharedModule,
    ...reducers,
    EffectsModule.forFeature(effects)
  ]
})
export class FormsModule {}
