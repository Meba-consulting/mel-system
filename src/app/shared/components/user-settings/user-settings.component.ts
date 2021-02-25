import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { Observable, of } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css'],
})
export class UserSettingsComponent implements OnInit {
  user: any;
  passwordChanged: boolean = false;
  passwordsMatch: boolean = false;
  errorMessage: string = '';
  changePassword: FormGroup = new FormGroup({
    oldPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    repeatPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });
  hide = true;
  hideRepeat = true;
  hideOld = true;
  updateResponse$: Observable<any>;
  get passwordOldInput() {
    const pwd = this.changePassword.get('oldPassword')?.value;
    // console.log(pwd)
    const isPassWordCorrect = this.validatePassword(pwd);
    if (pwd.length >= 8 && !isPassWordCorrect) {
      this.errorMessage =
        'At least one number, one small letter, one capital later and one special character required';
    } else if (pwd.length > 4 && pwd.length < 8) {
      this.errorMessage = 'At least 8 characters required';
    } else {
      this.errorMessage = '';
    }
    return this.changePassword.get('oldPassword');
  }

  get passwordInput() {
    const pwd = this.changePassword.get('password')?.value;
    const repeatPwd = this.changePassword.get('repeatPassword')?.value;
    // console.log(pwd)
    const isPassWordCorrect = this.validatePassword(pwd);
    if (pwd.length >= 8 && !isPassWordCorrect) {
      this.errorMessage =
        'At least one number, one small letter, one capital later and one special character required';
    } else if (pwd.length > 4 && pwd.length < 8) {
      this.errorMessage = 'At least 8 characters required';
    } else {
      this.errorMessage = '';
    }
    this.passwordsMatch = pwd == repeatPwd ? true : false;
    return this.changePassword.get('password');
  }

  get passwordRepeatInput() {
    const pwd = this.changePassword.get('password')?.value;
    const repeatPwd = this.changePassword.get('repeatPassword')?.value;
    // console.log(pwd)
    const isPassWordCorrect = this.validatePassword(repeatPwd);
    if (pwd.length >= 8 && !isPassWordCorrect) {
      this.errorMessage =
        'At least one number, one small letter, one capital later and one special character required';
    } else {
      this.errorMessage = '';
    }
    this.passwordsMatch = pwd == repeatPwd ? true : false;
    console.log('isPassWordCorrect', isPassWordCorrect);
    return this.changePassword.get('repeatPassword');
  }
  constructor(
    private dialogRef: MatDialogRef<UserSettingsComponent>,
    private http: NgxDhis2HttpClientService,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.user = data?.user;
  }

  onSave(e, changePassword) {
    e.stopPropagation();

    const data = {
      oldPassword: changePassword?.oldPassword,
      newPassword: changePassword.password,
    };
    this.updateResponse$ = this.http.put('me/changePassword', data).pipe(
      map((response) => {
        console.log(response);
      }),
      catchError((error) => {
        return of(error);
      })
    );

    this.updateResponse$.subscribe((res) => console.log('res', res));
    this.updateResponse$.pipe(take(1)).subscribe((res) => {
      if (res?.status) {
        this.passwordChanged = false;
      } else {
        this.passwordChanged = true;
      }
    });
  }

  ngOnInit(): void {}

  validatePassword(inputtxt) {
    var check = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    if (inputtxt.match(check)) {
      return true;
    } else {
      return false;
    }
  }

  onClose(e) {
    e.stopPropagation();
    this.dialogRef.close(this.passwordChanged);
  }
}
