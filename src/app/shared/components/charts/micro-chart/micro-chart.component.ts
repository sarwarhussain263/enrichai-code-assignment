import { Component, OnInit, Input } from '@angular/core';
// amCharts imports
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

@Component({
  selector: 'app-micro-chart',
  templateUrl: './micro-chart.component.html',
  styleUrls: ['./micro-chart.component.css']
})
export class MicroChartComponent implements OnInit {
  private chart: am4charts.XYChart;
  @Input() width: string = null;
  @Input() height: string = null;
  constructor() { }

  ngOnInit(): void {
  }

  initChart(data: any) {
    am4core.useTheme(am4themes_animated);

    // Create chart instance
    var container = am4core.create("microChartDiv", am4core.Container);
    container.layout = "grid";
    container.width = am4core.percent(100);
    container.height = am4core.percent(100);

    let rewampData = [];
    data.forEach((el: any) => {
      rewampData.push({
        'date': new Date(el.date.yyyy, el.date.mm, el.date.dd), 'value': el.value
      })
    });

    this.chart = this.createLine(container, rewampData);
  }

  // Functions that create various sparklines
  createLine(container: am4core.Container, data: any) {

    var chart = container.createChild(am4charts.XYChart);
    chart.data = data;
    chart.padding(20, 5, 2, 5);
    chart.cursor = new am4charts.XYCursor();

    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.startLocation = 0.5;
    dateAxis.endLocation = 0.7;
    dateAxis.cursorTooltipEnabled = false;
    dateAxis.fill = am4core.color("#104547");

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.cursorTooltipEnabled = false;

    // Create series
    var series = chart.series.push(new am4charts.LineSeries());
    series.tooltipText = "{date}: [bold]{value}";
    series.dataFields.valueY = "value";
    series.dataFields.dateX = "date";
    series.name = "Sales";
    series.strokeWidth = 2;
    series.fillOpacity = 2;
    series.tensionX = 0.8;

    let gradient = new am4core.LinearGradient();
    gradient.addColor(am4core.color("#ff5d02"));
    gradient.addColor(am4core.color("#ffc140"));
    gradient.rotation = 90;
    series.fill = gradient;

    return chart;
  }
}
