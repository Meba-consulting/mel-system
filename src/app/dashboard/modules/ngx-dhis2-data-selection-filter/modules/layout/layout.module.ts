import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { DragulaModule, DragulaService } from 'ng2-dragula';

@NgModule({
  imports: [CommonModule, DragulaModule],
  declarations: [LayoutComponent],
  exports: [LayoutComponent],
  providers: [DragulaService]
})
export class LayoutModule {}
