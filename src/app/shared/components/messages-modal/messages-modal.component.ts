import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { UsersService } from 'src/app/core/services';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

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

  @ViewChild('userInput') userInput: ElementRef<HTMLInputElement>;
  constructor(
    private dialogRef: MatDialogRef<MessagesModalComponent>,
    private userService: UsersService
  ) {}

  ngOnInit(): void {}

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

  onSave(event: Event, message: string, selectedUsers: any[]): void {
    event.stopPropagation();
    this.sendingMessage = true;
    console.log(message);
    console.log(selectedUsers);
  }

  onCancel(event: Event): void {
    event.stopPropagation();
    this.dialogRef.close();
  }
}
