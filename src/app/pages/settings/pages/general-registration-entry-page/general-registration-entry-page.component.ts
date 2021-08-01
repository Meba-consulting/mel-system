import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  getAllPrograms,
  getAllUserGroups,
  getCurrentUser,
  getUserGroupById,
  State,
} from 'src/app/store';
import {
  getAttributeByName,
  getAttributesLoadedState,
} from 'src/app/store/selectors/attributes.selectors';
import { getProgramsLoadingState } from '../../store/selectors';

@Component({
  selector: 'app-general-registration-entry-page',
  templateUrl: './general-registration-entry-page.component.html',
  styleUrls: ['./general-registration-entry-page.component.css'],
})
export class GeneralRegistrationEntryPageComponent implements OnInit {
  currentFormGroupId: string;
  programsLoadingState$: Observable<any>;
  programs$: Observable<any[]>;
  currentUser$: Observable<any>;
  userGroups$: Observable<any>;
  currentProgram: any;
  canAdd: boolean = true;
  currentProgramConfigs$: Observable<any>;

  programFields: any[] = [];
  currentFormData: any;
  isFormValid: boolean;
  selectedAttribute$: Observable<any>;
  loadedAttributesState$: Observable<boolean>;
  currentUserGroup$: Observable<any>;
  constructor(private route: ActivatedRoute, private store: Store<State>) {}

  ngOnInit(): void {
    this.currentFormGroupId = this.route.snapshot.params['id'];
    this.currentUser$ = this.store.select(getCurrentUser);
    this.programsLoadingState$ = this.store.select(getProgramsLoadingState);
    this.selectedAttribute$ = this.store.select(getAttributeByName, {
      name: 'Club Category',
    });
    this.loadedAttributesState$ = this.store.select(getAttributesLoadedState);
    this.programs$ = this.store.select(getAllPrograms);
    this.userGroups$ = this.store.select(getAllUserGroups);
    this.currentUserGroup$ = this.store.select(getUserGroupById, {
      id: this.currentFormGroupId,
    });
  }
}
