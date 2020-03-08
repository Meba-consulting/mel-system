import { Component, OnInit, Input } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chatting',
  templateUrl: './chatting.component.html',
  styleUrls: ['./chatting.component.css']
})
export class ChattingComponent implements OnInit {
  itemRef: AngularFireObject<any>;
  textMessage: string = '';
  messages$: Observable<any>;
  @Input() currentUserUsername: any;
  @Input() usernamePartner: any;
  constructor(private db: AngularFireDatabase) {
    this.textMessage = 'Hello!';
    this.messages$ = db.list('messages').valueChanges();
    this.messages$.subscribe(items => {
      console.log('items', items);
    });
  }

  ngOnInit() {}

  send(message) {
    this.textMessage = '';
    const data = {
      id: 'ew7GteYfs23',
      message: message,
      sender: this.currentUserUsername,
      receiver: this.usernamePartner,
      priority: 2
    };
    this.db.list('messages').push(data);
  }
}
