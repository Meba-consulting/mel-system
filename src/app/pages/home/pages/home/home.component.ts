import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store';
import { loadHomePageDesign } from '../../store/actions';
import { SafeHtml } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { getHomePageDesign } from '../../store/selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  homePageDesign$: Observable<any>;
  constructor(private store: Store<State>) {
    this.store.dispatch(loadHomePageDesign());
  }

  ngOnInit(): void {
    this.homePageDesign$ = this.store.select(getHomePageDesign);
  }
}
