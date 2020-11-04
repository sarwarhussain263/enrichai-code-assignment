import { Component, OnInit, Inject, NgZone, PLATFORM_ID, Input } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
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
  @Input() data = null;
  @Input() width: string = null;
  @Input() height: string = null;
  constructor(@Inject(PLATFORM_ID) private platformId, private zone: NgZone) { }

  ngOnInit(): void {
  }

  // Run the function only in the browser
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  ngAfterViewInit() {
    // Chart code goes in here
    this.browserOnly(() => {
      am4core.useTheme(am4themes_animated);

      // Create chart instance
      var container = am4core.create("microChartDiv", am4core.Container);
      container.layout = "grid";
      //container.fixedWidthGrid = false;
      container.width = am4core.percent(100);
      container.height = am4core.percent(100);

      // Color set
      var colors = new am4core.ColorSet();

      let data = [
        { "date": new Date(2018, 0, 1, 8, 0, 0), "value": 15 },
        { "date": new Date(2018, 0, 1, 9, 0, 0), "value": 18 },
        { "date": new Date(2018, 0, 1, 10, 0, 0), "value": 21 },
        { "date": new Date(2018, 0, 1, 11, 0, 0), "value": 23 },
        { "date": new Date(2018, 0, 1, 12, 0, 0), "value": 28 },
        { "date": new Date(2018, 0, 1, 13, 0, 0), "value": 30 },
        { "date": new Date(2018, 0, 1, 14, 0, 0), "value": 35 },
      ];


      this.chart = this.createLine(container, "AAPL (Price)", data, colors.getIndex(0));
    });
  }

  // Functions that create various sparklines
  createLine(container, title, data, color) {

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
    gradient.addColor(am4core.color("orange"));
    gradient.addColor(am4core.color("yellow"));
    gradient.rotation = 90;
    series.fill = gradient;

    return chart;
  }

  ngOnDestroy() {
    // Clean up chart when the component is removed
    this.browserOnly(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }
}
