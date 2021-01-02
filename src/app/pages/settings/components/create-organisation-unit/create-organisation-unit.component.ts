import { Component, Input, OnInit } from '@angular/core';
import { FormValue } from 'src/app/shared/modules/forms/models/form-value.model';

import * as _ from 'lodash';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store';
import { getClubInfoFromFormValues } from '../../helpers';
import { saveClub } from '../../store/actions';
import { Observable } from 'rxjs';
import { getClubsSavingState } from '../../store/selectors';
import { OuService } from 'src/app/core/services/ou.service';
import { AddClubModalComponent } from '../add-club-modal/add-club-modal.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-create-organisation-unit',
  templateUrl: './create-organisation-unit.component.html',
  styleUrls: ['./create-organisation-unit.component.css'],
})
export class CreateOrganisationUnitComponent implements OnInit {
  formFields: any[];
  currentFormData: any;
  @Input() clubCategories: any[];

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

  loadingClubsData: boolean = false;
  clubsData$: Observable<any>;
  constructor(
    private store: Store<State>,
    private ouService: OuService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getClubsData();
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

    // console.log('formFields', this.formFields);
  }

  getClubsData() {
    this.loadingClubsData = true;
    this.clubsData$ = this.ouService.getClubsFromSQLVIEW();
  }

  onAddClub(e) {
    e.stopPropagation();
    this.dialog.open(AddClubModalComponent, {
      width: '70%',
      height: '700px',
      disableClose: false,
      data: { clubCategories: this.clubCategories },
      panelClass: 'custom-dialog-container',
    });
    this.dialog.afterAllClosed.subscribe(() => this.getClubsData());
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
    this.getClubsData();
  }
}
