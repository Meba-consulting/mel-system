import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State, getProgramById } from 'src/app/store';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-program-data-entry',
  templateUrl: './program-data-entry.component.html',
  styleUrls: ['./program-data-entry.component.css']
})
export class ProgramDataEntryComponent implements OnInit {
  category: string;
  type: string;
  id: string;
  currentProgram$: Observable<any>;
  constructor(private store: Store<State>, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.category = this.route.snapshot.params['category'].toLowerCase();
    this.type = this.route.snapshot.params['type'].toLowerCase();
    this.id = this.route.snapshot.params['id'];
    this.currentProgram$ = this.store.select(getProgramById, { id: this.id });
  }
}
