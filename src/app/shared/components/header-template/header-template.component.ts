import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header-template',
  templateUrl: './header-template.component.html',
  styleUrls: ['./header-template.component.css'],
})
export class HeaderTemplateComponent implements OnInit {

  @Input() title: string = null;
  constructor() {
  }

  ngOnInit(): void {
  }
}
