import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { Observable, of } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userDetails: any;
  userProfile: FormGroup;
  updateResponse$: Observable<any>;
  firstName: string;
  surname: string;
  email: string;
  phoneNumber: string;
  keyBeingEdited: string = '';
  jobTitle: string;
  nationality: string;
  gender: string;
  constructor(private dialogRef: MatDialogRef<UserProfileComponent>,
    private http: NgxDhis2HttpClientService,
    private httpClient: HttpClient,
    @Inject(MAT_DIALOG_DATA) data) {
      this.userDetails = data?.user;
      this.firstName = this.userDetails?.firstName;
      this.surname = this.userDetails?.surname;
      this.email = this.userDetails?.email;
      this.phoneNumber = this.userDetails?.phoneNumber;
      this.gender = this.userDetails?.gender;
      this.jobTitle = this.userDetails?.jobTitle;
      this.nationality = this.userDetails?.nationality;
      // this.userProfile = new FormGroup({
      //   firstName: new FormControl(this.userDetails?.firstName, [Validators.required, Validators.minLength(3)]),
      //   surname: new FormControl(this.userDetails?.surname, [Validators.required, Validators.minLength(3)]),
      //   phoneNumber: new FormControl(this.userDetails?.phoneNumber, [
      //     Validators.minLength(13)
      //   ]
      //   ),
      //   email: new FormControl(this.userDetails?.email, [
      //     Validators.minLength(6)
      //   ]
      //   ),
      // });
     }

  ngOnInit(): void {
    console.log("this.userDetails", this.userDetails)
  }

  onSaveItem(e, type) {
    const val = e.target.value
    this.keyBeingEdited = type;
    let data;
    if (type == 'avatar') {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('domain', 'USER_AVATAR');
      this.http.post('fileResources', formData).pipe(take(1)).subscribe((res: any) =>  {
        if (res) {
          const fileId = res?.response?.fileResource?.id;
          this.updateResponse$ = this.httpClient.patch('../../../../users/' + this.userDetails?.id, {avatar: fileId}).pipe(map(res => res),catchError(e => {
            return of(e)
          }))
        }
      })
    }
    data = type =='firstName' ? {firstName: val } : type == 'surname'?  {surname: val}: 
    type == 'email'? {surname: val}: type =='phoneNumber'? {surname: val}:
     type =='gender'? {gender: val}: type =='nationality'? {nationality: val}: type =='jobTitle'? {jobTitle: val}: {}
    if (type != 'avatar') {
      this.updateResponse$ = this.http.put('me', data).pipe(map(res => res),catchError(e => {
        return of(e)
      }))
    }
    this.updateResponse$.subscribe(res => {
      if (res) {
        setTimeout(() => {
          this.keyBeingEdited = ''
        }, 1000)
      }
    })
  }

  // get firstName() {
  //   const firstName = this.userProfile.get('firstName').value;
  //   return this.userProfile.get('firstName')
  // }

  onSave(e, details) {
    e.stopPropagation()
    console.log(details)
  }

  onClose(e) {
    e.stopPropagation()
    this.dialogRef.close()
  }

}
