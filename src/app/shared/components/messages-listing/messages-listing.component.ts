import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-messages-listing',
  templateUrl: './messages-listing.component.html',
  styleUrls: ['./messages-listing.component.css'],
})
export class MessagesListingComponent implements OnInit {
  @Input() type: string;
  unReadMessages$: Observable<any>;
  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.getUnReadMessages();
  }

  getUnReadMessages(): void {
    this.unReadMessages$ = this.messageService.getMessageConversations(
      this.type,
      false
    );
  }
}
