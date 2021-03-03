import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { modules } from './modules';
import { materialModules } from './materials-modules';
import { sharedComponents } from './components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RemoveItemsPipe } from './pipes/remove-items.pipe';
import { FilterByInputTextPipe } from './pipes/filter-by-input-text.pipe';

@NgModule({
  imports: [
    CommonModule,
    ...materialModules,
    ...modules,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [CommonModule, ...materialModules, ...modules, ...sharedComponents],
  declarations: [...sharedComponents, RemoveItemsPipe, FilterByInputTextPipe],
  entryComponents: [...sharedComponents],
})
export class SharedModule {}
