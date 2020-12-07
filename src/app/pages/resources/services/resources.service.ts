import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { Observable } from 'rxjs';
import {
  HttpClientModule,
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResourcesService {
  getResources(): Observable<any> {
    return this.httpClient.get('documents.json?fields=*&paging=false');
  }

  fileUpload(fileResource): Observable<any> {
    const formData = new FormData();
    formData.append('file', fileResource.file);
    formData.append('domain', 'DOCUMENT');
    return this.httpClient.post('fileResources', formData);
  }

  uploadDataValueResource(fileResource): Observable<any> {
    const formData = new FormData();
    formData.append('file', fileResource.file);
    formData.append('domain', 'DATA_VALUE');
    return this.httpClient.post('fileResources', formData);
  }

  saveDocument(data): Observable<any> {
    return this.httpClient.post('documents', data);
  }

  saveSharingSettingsForDocuments(data): Observable<any> {
    return this.httpClient.post(
      'sharing?type=document&id=' + data.object.id,
      data
    );
  }

  saveSharingSettingsForPrograms(data): Observable<any> {
    return this.httpClient.post(
      'sharing?type=program&id=' + data.object.id,
      data
    );
  }

  deleteResource(itemId) {
    return this.httpClient.delete('documents/' + itemId);
  }

  _refineResource(resource) {
    const newResource = {};
    if (resource.external === true) {
      newResource['url'] = resource.url;
      newResource['external'] = resource.external;
      newResource['name'] = resource.name;
    } else {
      newResource['upload'] = resource.upload;
      newResource['external'] = 'false';
      newResource['attachment'] = resource.attachment;
      newResource['name'] = resource.name;
    }

    const formData = new FormData();
    for (const property in newResource) {
      if (newResource[property]) {
        formData.append(property, newResource[property]);
      }
    }
    return formData;
  }

  constructor(
    private httpClient: NgxDhis2HttpClientService,
    private defaultHttpClient: HttpClient
  ) {}
}
