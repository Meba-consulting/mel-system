import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store';
import { getContactsPageDesign } from '../../store/selectors';
import { loadContactsPageDesign } from '../../store/actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  contactsPageDesign$: Observable<any>;
  constructor(private store: Store<State>) {
    this.store.dispatch(loadContactsPageDesign());
  }

  ngOnInit() {
    this.contactsPageDesign$ = this.store.select(getContactsPageDesign);
  }
}
