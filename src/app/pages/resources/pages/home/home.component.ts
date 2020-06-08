import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/reducers';
import { Observable } from 'rxjs';
import { getCurrentUser } from 'src/app/store/selectors';
import { loadResources } from '../../store/actions';
import {
  getResources,
  getResourcesLoadingState
} from '../../store/selectors/resources.selector';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  resources$: Observable<any>;
  currentUser$: Observable<any>;
  loadingState$: Observable<boolean>;
  constructor(private store: Store<State>) {
    this.currentUser$ = this.store.select(getCurrentUser);
    this.store.dispatch(loadResources());
  }

  ngOnInit(): void {
    this.store.select(getResourcesLoadingState);
    this.resources$ = this.store.select(getResources);
  }
}
