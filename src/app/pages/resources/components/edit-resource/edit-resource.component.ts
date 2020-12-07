import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-edit-resource',
  templateUrl: './edit-resource.component.html',
  styleUrls: ['./edit-resource.component.css']
})
export class EditResourceComponent implements OnInit {
  @Input() resourceGroup: any;
  @Input() action: string;
  @Input() resource: any;
  @Input() currentUser: any;
  constructor() {}

  ngOnInit(): void {}
}
