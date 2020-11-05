import { Component, OnInit, Input } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
// amCharts imports
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

@Component({
  selector: 'app-time-chart',
  templateUrl: './time-chart.component.html',
  styleUrls: ['./time-chart.component.css']
})
export class TimeChartComponent implements OnInit {
  private chart: am4charts.XYChart;
  @Input() width: string = null;
  @Input() height: string = null;
  constructor() { }

  ngOnInit(): void {
  }

  initChart(data: any) {
    am4core.useTheme(am4themes_animated);

    // Create chart instance
    let chart = am4core.create("timeChartDiv", am4charts.XYChart);

    chart.data = data;

    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataFields.category = "trip";
    categoryAxis.renderer.minGridDistance = 60;
    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.grid.template.disabled = true;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.extraMax = 0.1;
    valueAxis.title.text = "KM"

    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.categoryX = "trip";
    series.dataFields.valueY = "km";
    series.tooltipText = "{valueY.value}"
    series.columns.template.strokeOpacity = 0;
    series.columns.template.width = am4core.percent(17);

    let gradient = new am4core.LinearGradient();
    gradient.addColor(am4core.color("#fdda98"));
    gradient.addColor(am4core.color("#f0ac97"));
    gradient.addColor(am4core.color("#ff95a4"));
    gradient.addColor(am4core.color("#64c7e7"));

    gradient.rotation = 90;
    series.columns.template.fill = gradient;

    let labelBullet = series.bullets.push(new am4charts.LabelBullet());
    labelBullet.label.verticalCenter = "bottom";
    labelBullet.label.dy = -10;
    labelBullet.label.text = "{values.valueY.workingValue.formatNumber('#.')}";

    chart.zoomOutButton.disabled = true;
  }
}
