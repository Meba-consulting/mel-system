import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { ProceduresRoutingModule } from './procedures-routing.module';
import { pages } from './pages';
import { reducers } from './store/reducers';
import { effects } from './store/effects';
import { EffectsModule } from '@ngrx/effects';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
  declarations: [...pages],
  imports: [
    CommonModule,
    ProceduresRoutingModule,
    SharedModule,
    ...reducers,
    EffectsModule.forFeature(effects)
  ]
})
export class ProceduresModule {}
