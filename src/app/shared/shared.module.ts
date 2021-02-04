import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { modules } from './modules';
import { materialModules } from './materials-modules';
import { sharedComponents } from './components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, ...materialModules, ...modules, FormsModule, ReactiveFormsModule],
  exports: [CommonModule, ...materialModules, ...modules, ...sharedComponents],
  declarations: [...sharedComponents],
  entryComponents: [...sharedComponents],
})
export class SharedModule {}
