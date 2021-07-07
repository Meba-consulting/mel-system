import { Component, Input, OnInit } from '@angular/core';
import { FormValue } from 'src/app/shared/modules/forms/models/form-value.model';

import * as _ from 'lodash';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store';
import { from, Observable } from 'rxjs';
import { OuService } from 'src/app/core/services/ou.service';
import { AddClubModalComponent } from '../add-club-modal/add-club-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { OuRegistrationComponent } from '../ou-registration/ou-registration.component';
@Component({
  selector: 'app-create-organisation-unit',
  templateUrl: './create-organisation-unit.component.html',
  styleUrls: ['./create-organisation-unit.component.css'],
})
export class CreateOrganisationUnitComponent implements OnInit {
  formFields: any[];
  currentFormData: any;
  @Input() clubCategories: any[];
  @Input() selectedGroup: any[];
  @Input() programs: any[];
  @Input() currentUser: any;

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
  groups: any[] = [];

  selectedTab = new FormControl(0);
  ouFormGroup: any;
  paralegals$: Observable<any>;
  clinics$: Observable<any>;
  paralegalId: string = '';
  clinicsId: string = '';
  configurations$: Observable<any>;
  constructor(
    private store: Store<State>,
    private ouService: OuService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // console.log('selectedGroup', this.selectedGroup);
    // console.log(this.programs);
    this.groups = _.orderBy(
      this.selectedGroup['managedGroups'],
      ['name'],
      ['asc']
    );
    this.ouFormGroup = this.groups[0];
    this.configurations$ = this.ouService.getOrgUnitsRegistrationConfigs();
    // console.log('formFields', this.formFields);
  }

  getClubsData(id) {
    // console.log('id', id);
    this.clubsData$ = from([null]);
    this.loadingClubsData = true;
    this.clubsData$ = this.ouService.getClubsFromSQLVIEW('GOMCSNn5OdW');
    this.paralegals$ = this.ouService.getClubsFromSQLVIEW(this.paralegalId);
    this.clinics$ = this.ouService.getClubsFromSQLVIEW(this.clinicsId);
  }

  onAddClub(e) {
    e.stopPropagation();
    this.dialog.open(AddClubModalComponent, {
      width: '50%',
      height: '600px',
      disableClose: false,
      data: { clubCategories: this.clubCategories },
      panelClass: 'custom-dialog-container',
    });
    this.dialog.afterAllClosed.subscribe(() =>
      this.getClubsData(this.ouFormGroup?.id)
    );
  }

  onAddOu(e) {
    e.stopPropagation();
    this.dialog
      .open(OuRegistrationComponent, {
        width: '50%',
        height: '600px',
        disableClose: false,
        data: {
          clubCategories: this.clubCategories,
          group: this.selectedGroup,
        },
        panelClass: 'custom-dialog-container',
      })
      .afterClosed()
      .subscribe(() => {
        this.getClubsData(this.ouFormGroup?.id);
      });
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
    this.getClubsData(this.ouFormGroup?.id);
  }

  changeTab(e, val, group) {
    e.stopPropagation();
    this.getClubsData(this.ouFormGroup?.id);
    this.clubsData$.subscribe((res) => console.log('res##', res));
    this.ouFormGroup = group;
    this.selectedTab.setValue(val);
  }
}
