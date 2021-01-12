import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { FormValue } from 'src/app/shared/modules/forms/models/form-value.model';
import { getCurrentUser, loadAttributes } from 'src/app/store';
import { State } from 'src/app/store/reducers';
import {
  getAttributeByName,
  getAttributesLoadedState,
} from 'src/app/store/selectors/attributes.selectors';
import { AddProgramModalComponent } from '../../components/add-program-modal/add-program-modal.component';
import { SystemIdsService } from '../../services/system-ids.service';
import {
  addLoadedPrograms,
  createProgram,
  loadDatastoreConfigs,
  loadPrograms,
} from '../../store/actions';
import { getAllPrograms, getProgramsLoadingState } from '../../store/selectors';
import { getDatastoreConfigsById } from '../../store/selectors/datastore.selectors';

@Component({
  selector: 'app-settings-home',
  templateUrl: './settings-home.component.html',
  styleUrls: ['./settings-home.component.css'],
})
export class SettingsHomeComponent implements OnInit {
  programsLoadingState$: Observable<any>;
  programs$: Observable<any[]>;
  currentUser$: Observable<any>;
  currentProgram: any;
  canAdd: boolean = true;
  currentProgramConfigs$: Observable<any>;

  programFields: any[] = [];
  currentFormData: any;
  isFormValid: boolean;
  selectedAttribute$: Observable<any>;
  loadedAttributesState$: Observable<boolean>;
  systemIds$: Observable<any[]>;

  selectedTab = new FormControl(0);
  currentTabValue = 0;
  constructor(
    private store: Store<State>,
    private dialog: MatDialog,
    private systemIdsService: SystemIdsService
  ) {
    this.store.dispatch(loadPrograms());
    this.store.dispatch(loadAttributes());
  }

  ngOnInit(): void {
    this.currentUser$ = this.store.select(getCurrentUser);
    this.programsLoadingState$ = this.store.select(getProgramsLoadingState);
    this.selectedAttribute$ = this.store.select(getAttributeByName, {
      name: 'Club Category',
    });
    this.systemIds$ = this.systemIdsService.getSystemIds(2);
    this.loadedAttributesState$ = this.store.select(getAttributesLoadedState);
    this.programs$ = this.store.select(getAllPrograms);
    // this.programs$.subscribe((programs) => {
    //   console.log(programs);
    //   if (programs && programs?.length > 0) {
    //     this.currentFormData = {};
    //     this.currentProgram = programs[0];
    //     this.currentFormData['program-name'] = {
    //       value: this.currentProgram?.name,
    //       id: 'program-name',
    //     };
    //     this.store.dispatch(loadDatastoreConfigs({ id: programs[0]?.id }));
    //     this.currentProgramConfigs$ = this.store.select(
    //       getDatastoreConfigsById,
    //       {
    //         id: programs[0]?.id,
    //       }
    //     );
    //   }
    // });

    this.programFields = [
      {
        id: 'program-name',
        label: 'Program name',
        key: 'program-name',
        controlType: 'textbox',
        name: 'Program name',
        required: true,
      },
    ];
  }

  changeTab(e, val) {
    e.stopPropagation();
    this.selectedTab.setValue(val);
    this.currentTabValue = val;
  }

  onSetCurrentProgram(e, program): void {
    e.stopPropagation();
    this.currentProgram = program;
    this.currentFormData = {};
    this.currentFormData['program-name'] = {
      value: program?.name,
      id: program?.id,
    };
    this.store.dispatch(loadDatastoreConfigs({ id: program?.id }));
    this.currentProgramConfigs$ = this.store.select(getDatastoreConfigsById, {
      id: program?.id,
    });

    this.programFields = [
      {
        id: 'program-name',
        label: 'Program name',
        key: 'program-name',
        controlType: 'textbox',
        name: 'Program name',
        required: true,
      },
    ];
  }

  onOpenProgramModal(e): void {
    e.stopPropagation();
    this.dialog.open(AddProgramModalComponent, {
      height: '500px',
      width: '60%',
      disableClose: true,
      panelClass: 'custom-dialog-container',
    });
  }

  onFormUpdate(formValue: FormValue) {
    const values = formValue.getValues();
    let newProgram = {
      name: values['program-name']?.value,
      id: this.currentProgram.id,
    };
    this.currentProgram = newProgram;
    this.isFormValid = formValue.isValid;
  }

  onSaveProgramDetails(e): void {
    e.stopPropagation();
    console.log(this.currentProgram);
    this.store.dispatch(createProgram({ programDetails: this.currentProgram }));
  }
}
