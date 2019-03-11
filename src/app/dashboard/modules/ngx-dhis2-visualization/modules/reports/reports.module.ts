import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { components } from './components';
import { containers } from './containers';

@NgModule({
  declarations: [...components, ...containers],
  exports: [...components, ...containers],
  imports: [CommonModule]
})
export class ReportsModule {}
