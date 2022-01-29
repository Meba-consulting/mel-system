import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/reducers';
import { Observable } from 'rxjs';
import { getCurrentUser } from 'src/app/store/selectors';
import { loadResources } from '../../store/actions';
import {
  getResources,
  getResourcesLoadingState,
} from '../../store/selectors/resources.selector';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  resources$: Observable<any>;
  currentUser$: Observable<any>;
  loadingState$: Observable<boolean>;
  isInfoOpen: boolean = false;
  isExpanded: boolean = true;
  isDark: boolean = false;
  documentURL: string =
    'https://josephatj.github.io/MEL-user-manual/docs/resources/summary';
  constructor(private store: Store<State>, private route: ActivatedRoute) {
    this.currentUser$ = this.store.select(getCurrentUser);
    this.store.dispatch(loadResources({ reload: false }));
  }

  toggleMELHelp(event: Event): void {
    event.stopPropagation();
    this.isInfoOpen = !this.isInfoOpen;
  }

  onOpenInfo(): void {
    this.isInfoOpen = true;
  }

  onInfoClose(e): void {
    this.isInfoOpen = e;
  }

  toggleLogMonitor() {
    this.isExpanded = !this.isExpanded;
  }

  toggleTheme() {
    this.isDark = !this.isDark;
  }

  onOpenConsole() {
    this.isExpanded = !this.isExpanded;
  }

  ngOnInit(): void {
    // console.log(this.route.snapshot.queryParams);
    this.store.select(getResourcesLoadingState);
    this.resources$ = this.store.select(getResources);
  }
}
