import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { State, getCurrentUser, getAllUserGroups } from 'src/app/store';
import { Observable } from 'rxjs';
import { loadSSBResources } from '../../store/actions';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { getResources } from '../../store/selectors';

@Component({
  selector: 'app-uploaded-reports',
  templateUrl: './uploaded-reports.component.html',
  styleUrls: ['./uploaded-reports.component.css'],
})
export class UploadedReportsComponent implements OnInit, OnDestroy {
  currentUser$: Observable<any>;
  @Input() currentUser: any;
  resources$: Observable<any>;
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
    this.store.dispatch(loadSSBResources({ reload: false }));

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
    console.log(this.route.snapshot.queryParams.status);
    this.allDataLoaded = false;
    this.store.dispatch(loadSSBResources({ reload: true }));
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
