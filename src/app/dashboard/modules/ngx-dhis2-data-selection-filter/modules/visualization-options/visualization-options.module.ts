import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisualizationOptionsComponent } from './containers/visualization-options/visualization-options.component';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [VisualizationOptionsComponent],
  exports: [VisualizationOptionsComponent],
  imports: [CommonModule, FormsModule, MatButtonModule]
})
export class VisualizationOptionsModule {}
