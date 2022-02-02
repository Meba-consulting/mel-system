import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { UsersService } from 'src/app/core/services';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-messages-modal',
  templateUrl: './messages-modal.component.html',
  styleUrls: ['./messages-modal.component.css'],
})
export class MessagesModalComponent implements OnInit {
  message: string;
  users$: Observable<any[]>;
  addOnBlur = true;
  sendingMessage: boolean = false;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  selectedUsers: any[] = [];
  userControl = new FormControl();

  dialogData: any;
  unReadMessages$: Observable<any>;
  currentMessage: any;
  currentMessage$: Observable<any>;
  savingReplay: boolean = false;
  messageSubject: string;
  showComposeMessage: boolean = false;
  messageSent: boolean = false;

  @ViewChild('userInput') userInput: ElementRef<HTMLInputElement>;
  constructor(
    private dialogRef: MatDialogRef<MessagesModalComponent>,
    private userService: UsersService,
    @Inject(MAT_DIALOG_DATA) data,
    private messageService: MessageService
  ) {
    this.dialogData = data;
  }

  ngOnInit(): void {
    this.showComposeMessage = !this.dialogData?.shouldShowMessages;
    if (this.dialogData?.shouldShowMessages) {
      this.getUnReadMessages();
    }
  }

  openComposeMessage(event: Event): void {
    event.stopPropagation();
    this.showComposeMessage = !this.showComposeMessage;
  }

  getUnReadMessages(): void {
    this.unReadMessages$ = this.messageService.getMessageConversations(
      'PRIVATE',
      false
    );
  }

  getCurrentMessageConversation(id): void {
    this.currentMessage$ =
      this.messageService.getMessageConversationsDetails(id);
  }

  setCurrentMessage(event: Event, message: any): void {
    event.stopPropagation();
    this.getCurrentMessageConversation(message?.id);
    this.currentMessage = message;
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.selectedUsers.push(value);
    }

    // Clear the input value
    // event.chipInput!.clear();
  }

  searchUsers(event: any): void {
    this.users$ = this.userService.getUsersFromLookUp(event.target.value);
  }

  remove(user: any): void {
    const index = this.selectedUsers.indexOf(user);

    if (index >= 0) {
      this.selectedUsers.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedUsers.push(event.option.value);
    this.userInput.nativeElement.value = '';
    this.userControl.setValue(null);
  }

  onGetMessage(event: any): void {
    this.message = event.target.value;
  }

  setSubject(event: any): void {
    this.messageSubject = event?.target.value;
  }

  onSave(event: Event, message: string, selectedUsers: any[]): void {
    event.stopPropagation();
    this.sendingMessage = true;
    const data = {
      subject: this.messageSubject,
      users: selectedUsers.map((user) => {
        return {
          ...user,
          type: 'user',
        };
      }),
      userGroups: [],
      organisationUnits: [],
      attachments: [],
      text: message,
    };

    this.messageService.createNewMessage(data).subscribe((response) => {
      if (response) {
        this.sendingMessage = false;
        this.message = '';
        this.messageSubject = '';
        this.selectedUsers = [];
        this.messageSent = true;
        setTimeout(() => {
          this.messageSent = false;
          setTimeout(() => {
            this.showComposeMessage = false;
            this.getUnReadMessages();
          }, 1000);
        }, 2000);
      }
    });
  }

  onSaveMessageConversation(
    event: Event,
    message: string,
    conversation: any
  ): void {
    event.stopPropagation();
    this.savingReplay = true;
    this.messageService
      .saveMessageConversion(conversation?.id, message)
      .subscribe((response) => {
        if (response) {
          this.savingReplay = false;
          this.getCurrentMessageConversation(conversation?.id);
          this.message = '';
        }
      });
  }

  onCancel(event: Event): void {
    event.stopPropagation();
    this.dialogRef.close();
  }
}
