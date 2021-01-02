import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { modules } from './modules';
import { materialModules } from './materials-modules';
import { sharedComponents } from './components';

@NgModule({
  imports: [CommonModule, ...materialModules, ...modules],
  exports: [CommonModule, ...materialModules, ...modules, ...sharedComponents],
  declarations: [...sharedComponents],
})
export class SharedModule {}
