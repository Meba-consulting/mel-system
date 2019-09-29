import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { DragulaModule, DragulaService } from 'ng2-dragula';

import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [CommonModule, DragulaModule, MatButtonModule],
  declarations: [LayoutComponent],
  exports: [LayoutComponent],
  providers: [DragulaService]
})
export class LayoutModule {}
