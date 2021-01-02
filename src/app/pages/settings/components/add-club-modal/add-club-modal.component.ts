import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { database } from 'firebase';
import { Observable } from 'rxjs';
import { FormValue } from 'src/app/shared/modules/forms/models/form-value.model';
import { State } from 'src/app/store';
import { getClubInfoFromFormValues } from '../../helpers';
import { editClub, saveClub } from '../../store/actions';

import * as _ from 'lodash';
import {
  getClubSavedState,
  getClubsSavingState,
  getCurrentClub,
} from '../../store/selectors';

@Component({
  selector: 'app-add-club-modal',
  templateUrl: './add-club-modal.component.html',
  styleUrls: ['./add-club-modal.component.css'],
})
export class AddClubModalComponent implements OnInit {
  clubCategories: any;
  orgUnitFilterConfig: any = {
    singleSelection: true,
    showUserOrgUnitSection: false,
    showOrgUnitLevelGroupSection: false,
    showOrgUnitGroupSection: false,
    showOrgUnitLevelSection: false,
    reportUse: false,
    additionalQueryFields: [],
    batchSize: 400,
    selectedOrgUnitItems: [],
  };
  selectedOrgUnits: Array<any> = [];
  ouFilterIsSet: boolean = false;

  formValues: any = {};
  isFormValid: boolean;
  clubSavingState$: Observable<boolean>;
  formFields: any[];
  currentFormData: any;
  isClubAdded: boolean = false;
  savingClubMessage: string = '';
  currentClub$: Observable<any>;
  isClubEdited: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<AddClubModalComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private store: Store<State>
  ) {
    this.clubCategories = data.clubCategories;
    console.log('club to edit', data?.club);
  }

  ngOnInit(): void {
    this.currentClub$ = this.store.select(getCurrentClub);
    this.clubSavingState$ = this.store.select(getClubsSavingState);
    this.formFields = [
      {
        id: 'regdate',
        label: 'Registration date',
        key: 'regdate',
        controlType: 'date',
        name: 'Registration date',
        required: true,
      },
      {
        id: 'clubcategory',
        label: 'Club category',
        key: 'clubcategory',
        controlType: 'dropdown',
        name: 'Club category',
        required: true,
        options: this.formulateOptions(this.clubCategories),
      },
      {
        id: 'name',
        label: 'Name',
        key: 'name',
        controlType: 'textbox',
        name: 'Name',
        required: true,
      },
      {
        id: 'shortname',
        label: 'Short name',
        key: 'shortname',
        controlType: 'textbox',
        name: 'Short name',
        required: true,
      },
      {
        id: 'phonenumber',
        label: 'Phone number',
        key: 'phonenumber',
        controlType: 'textbox',
        name: 'Phone number',
        required: false,
      },
    ];
  }

  formulateOptions(options) {
    return _.map(options, (option) => {
      return {
        id: option?.id,
        label: option?.name,
        key: option?.id,
        name: option?.name,
      };
    });
  }

  onClose(e) {
    e.stopPropagation();
    this.dialogRef.close();
  }

  onFilterUpdate(selections) {
    console.log(selections);
    this.ouFilterIsSet = false;
    this.formValues['parent'] = { value: selections?.items[0]?.id };
    this.selectedOrgUnits = selections?.items;
  }

  onFilterClose(selections) {
    this.ouFilterIsSet = false;
  }

  onToggleOuFilter(e) {
    e.stopPropagation();
    this.ouFilterIsSet = !this.ouFilterIsSet;
  }

  onFormUpdate(formValue: FormValue) {
    console.log(formValue.getValues());
    this.formValues = { ...this.formValues, ...formValue.getValues() };
    this.isFormValid = formValue.isValid;
  }

  onSaveClubDetails(e) {
    e.stopPropagation();
    const clubDetails = getClubInfoFromFormValues(this.formValues);
    console.log('clubDetails', clubDetails);
    this.store.dispatch(saveClub({ clubDetails }));
    this.isClubAdded = true;
    this.store.select(getClubSavedState).subscribe((response) => {
      if (response) {
        this.savingClubMessage = 'Successfuly added ' + clubDetails?.name;
        setTimeout(() => {
          this.savingClubMessage = '';
        }, 1000);
      }
    });
    this.currentClub$ = this.store.select(getCurrentClub);
  }
  onEditClubDetails(e, currentClub) {
    e.stopPropagation();
    const clubDetails = getClubInfoFromFormValues(this.formValues);
    this.store.dispatch(editClub({ club: clubDetails, id: currentClub?.id }));
    this.isClubEdited = true;
    this.store.select(getClubSavedState).subscribe((response) => {
      if (response) {
        this.savingClubMessage = 'Successfuly saved ' + clubDetails?.name;
        setTimeout(() => {
          this.savingClubMessage = '';
        }, 1000);
      }
    });
  }
}
