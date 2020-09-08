import { NgModule } from "@angular/core";
import { NgxDhis2CustomFormsEntryComponent } from "./ngx-dhis2-custom-forms-entry.component";
import { CustomFormComponent } from "./components/custom-form/custom-form.component";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [NgxDhis2CustomFormsEntryComponent, CustomFormComponent],
  imports: [CommonModule],
  exports: [NgxDhis2CustomFormsEntryComponent]
})
export class NgxDhis2CustomFormsEntryModule {}
