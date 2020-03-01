import { Component, OnInit, Input } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-render-html',
  templateUrl: './render-html.component.html',
  styleUrls: ['./render-html.component.css']
})
export class RenderHtmlComponent implements OnInit {
  @Input() htmlCodes: SafeHtml;
  @Input() id: string;
  constructor() {}

  ngOnInit(): void {}
}
