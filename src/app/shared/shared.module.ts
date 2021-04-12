import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { modules } from './modules';
import { materialModules } from './materials-modules';
import { sharedComponents } from './components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RemoveItemsPipe } from './pipes/remove-items.pipe';
import { FilterByInputTextPipe } from './pipes/filter-by-input-text.pipe';
import { primeNgModules } from './primeng.modules';

@NgModule({
  imports: [
    CommonModule,
    ...primeNgModules,
    ...materialModules,
    ...modules,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    CommonModule,
    ...primeNgModules,
    ...materialModules,
    ...modules,
    ...sharedComponents,
    FilterByInputTextPipe,
  ],
  declarations: [...sharedComponents, RemoveItemsPipe, FilterByInputTextPipe],
  entryComponents: [...sharedComponents],
})
export class SharedModule {}
