import { Component, OnInit, Input } from '@angular/core';

import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { State, getCurrentUser, getAllPrograms } from 'src/app/store';
import { loadDataEntryFlow } from '../../store/actions';
import { getFormsLoadedState } from '../../store/selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser$: Observable<any>;
  programs$: Observable<any[]>;
  programsLoadedState$: Observable<any>;
  constructor(private store: Store<State>) {
    this.currentUser$ = this.store.select(getCurrentUser);
    this.programs$ = this.store.select(getAllPrograms);
    this.programsLoadedState$ = this.store.select(getFormsLoadedState);
    this.store.dispatch(loadDataEntryFlow());
  }

  ngOnInit() {}
}
