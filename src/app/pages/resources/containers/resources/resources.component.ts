import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/reducers';
import { getCurrentUser, getAllUserGroups } from 'src/app/store';
import { loadResources } from '../../store/actions';
import {
  getResourcesLoadingState,
  getResources,
} from '../../store/selectors/resources.selector';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css'],
})
export class ResourcesComponent implements OnInit, OnDestroy {
  resources$: Observable<any>;
  currentUser$: Observable<any>;
  loadingState$: Observable<boolean>;
  navigationSubscription: any;
  allDataLoaded: boolean = false;
  userGroups$: Observable<any>;
  constructor(
    private store: Store<State>,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.currentUser$ = this.store.select(getCurrentUser);

    // this.loadingState$ = this.store.select(getResourcesLoadingState);
    // this.resources$ = this.store.select(getResources);
    this.allDataLoaded = false;
    // unsubscribe later.
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
      }
    });
  }

  ngOnInit(): void {
    this.userGroups$ = this.store.select(getAllUserGroups);
    this.allDataLoaded = false;
    this.store.dispatch(loadResources({ reload: true }));
    setTimeout(() => {
      this.allDataLoaded = true;
      this.resources$ = this.store.select(getResources);
      if (this.route.snapshot.queryParams.status == 'added') {
        this.allDataLoaded = false;
        setTimeout(() => {
          this.allDataLoaded = true;
          this.resources$ = this.store.select(getResources);
          // this.router.navigate(['resources/documents']);
        }, 1000);
      }

      if (this.route.snapshot.queryParams.status == 'delete') {
        this.allDataLoaded = false;
        setTimeout(() => {
          this.allDataLoaded = true;
          this.resources$ = this.store.select(getResources);
          // this.router.navigate(['resources/documents']);
        }, 1000);
      }
    }, 100);
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }
}
