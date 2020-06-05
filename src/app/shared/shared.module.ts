import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';

import { modules } from './modules';
import { NgxDhis2CustomFormsEntryModule } from '@iapps/ngx-dhis2-custom-forms-entry';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@NgModule({
  imports: [
    NgxDhis2CustomFormsEntryModule,
    ...modules,
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatTabsModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    MatInputModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatIconModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatMenuModule
  ],
  exports: [
    NgxDhis2CustomFormsEntryModule,
    ...modules,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatTabsModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    MatInputModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatIconModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatMenuModule
  ],
  declarations: []
})
export class SharedModule {}
