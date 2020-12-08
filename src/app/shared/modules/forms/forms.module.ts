import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { materialModules } from '../../materials-modules';
import { formsModuleComponents } from './components';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, ...materialModules],
  declarations: [...formsModuleComponents],
  providers: [],
  exports: [...formsModuleComponents],
})
export class FormModule {}
