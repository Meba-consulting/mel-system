import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { createBatchs } from '../../helpers';

@Component({
  selector: 'app-batch-control',
  templateUrl: './batch-control.component.html',
  styleUrls: ['./batch-control.component.css']
})
export class BatchControlComponent implements OnInit {
  @Input() trackedEntityInstances: any;
  @Output() selectedItem: EventEmitter<any> = new EventEmitter<any>();
  @Input() attributeReferenceId: string;
  @Input() itemName: string;
  batches: Array<any>;
  constructor() {}

  ngOnInit(): void {
    this.batches = createBatchs(
      this.trackedEntityInstances,
      this.attributeReferenceId
    );
  }

  onDataSetSelectionChanged(data) {
    this.selectedItem.emit(data);
  }
}
