import { Component, OnInit, ViewChild } from '@angular/core';
import { forkJoin } from 'rxjs'
import { ChartService } from '../shared/services/chart-service';
import { LineChartComponent } from '../shared/components/charts/line-chart/line-chart.component';
import { StackedColumnChartComponent } from '../shared/components/charts/stacked-column-chart/stacked-column-chart.component';
import { MicroChartComponent } from '../shared/components/charts/micro-chart/micro-chart.component';
import { TimeChartComponent } from '../shared/components/charts/time-chart/time-chart.component';
@Component({
  selector: 'app-assignment1',
  templateUrl: './assignment1.component.html',
  styleUrls: ['./assignment1.component.css']
})
export class Assignment1Component implements OnInit {

  constructor(protected chartService: ChartService) { }

  lineChartData: any = null;
  ngOnInit(): void {

    this.getDataFromAPI();
  }

  @ViewChild(LineChartComponent) childLineChartComponent: LineChartComponent;
  @ViewChild(StackedColumnChartComponent) childStackedChartComponent: StackedColumnChartComponent;
  @ViewChild(MicroChartComponent) childMicroChartComponent: MicroChartComponent;
  @ViewChild(TimeChartComponent) timeChartComponent: TimeChartComponent;
  getDataFromAPI() {
    const lineChart = this.chartService.getLineChartData();
    const stackedChart = this.chartService.getStackedChartData();
    const microChartData = this.chartService.getMicroChartData();
    const timeChartData = this.chartService.getTimeChartData();
    forkJoin({
      lineChart: lineChart,
      stackedChart: stackedChart,
      microChartData: microChartData,
      timeChartData: timeChartData
    }).subscribe((res: any) => {
      this.childLineChartComponent.initChart(res.lineChart);
      this.childStackedChartComponent.initChart(res.stackedChart);
      this.childMicroChartComponent.initChart(res.microChartData);
      this.timeChartComponent.initChart(res.timeChartData);
    });
  }
}
