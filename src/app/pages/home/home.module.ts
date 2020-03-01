import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { pages } from './pages';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { HomeRoutingModule } from './home-routing.module';
import { reducers } from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { effects } from './store/effects';

@NgModule({
  declarations: [...pages],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    ...reducers,
    EffectsModule.forFeature(effects)
  ]
})
export class HomeModule {}
