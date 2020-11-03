import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assignment1',
  templateUrl: './assignment1.component.html',
  styleUrls: ['./assignment1.component.css']
})
export class Assignment1Component implements OnInit {

  constructor() { }

  lineChartData: any[] = [];
  ngOnInit(): void {
    this.lineChartData = this.getLineChartData();
  }

  getLineChartData(): any[] {
    return [{
      "avg": 18,
      "km": 40
    }, {
      "avg": 21,
      "km": 20
    }, {
      "avg": 27,
      "km": 80
    }, {
      "avg": 34,
      "km": 29
    }, {
      "avg": 44,
      "km": 65
    }, {
      "avg": 50,
      "km": 50
    }];
  }
}
