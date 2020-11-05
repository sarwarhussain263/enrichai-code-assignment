import { Component, OnInit, ViewChild } from '@angular/core';

declare function initMap(): any;
@Component({
  selector: 'app-assignment2',
  templateUrl: './assignment2.component.html',
  styleUrls: ['./assignment2.component.css']
})
export class Assignment2Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
    initMap();
  }
}
