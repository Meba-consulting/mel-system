import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-visualization-options',
  templateUrl: './visualization-options.component.html',
  styleUrls: ['./visualization-options.component.scss']
})
export class VisualizationOptionsComponent implements OnInit {
  @Input() visualizationConfig: any;
  @Input() visualizationType: string;

  @Output() update: EventEmitter<any> = new EventEmitter<any>();
  @Output() close: EventEmitter<any> = new EventEmitter<any>();
  constructor() {}

  ngOnInit() {}

  onClose(e) {
    e.stopPropagation();
    this.close.emit(this.visualizationConfig);
  }

  onUpdate(e) {
    e.stopPropagation();
    this.update.emit(this.visualizationConfig);
  }
}
