import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { pages } from './pages';
import { ContactsRoutingModule } from './contacts-routing.module';
import { reducers } from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { effects } from './store/effects';
import { RenderHtmlComponent } from './pages/components/render-html/render-html.component';

@NgModule({
  declarations: [...pages, RenderHtmlComponent],
  imports: [
    CommonModule,
    ContactsRoutingModule,
    ...reducers,
    EffectsModule.forFeature(effects)
  ]
})
export class ContactsModule {}
