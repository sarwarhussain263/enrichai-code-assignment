import { Component, OnInit, Inject, NgZone, PLATFORM_ID, Input } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
// amCharts imports
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {
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
      let chart = am4core.create("lineChartDiv", am4charts.XYChart);

      // Add data
      chart.data = this.data;

      // Create X axes
      var valueAxisX = chart.xAxes.push(new am4charts.ValueAxis());
      valueAxisX.title.text = 'Avg.';
      valueAxisX.renderer.minGridDistance = 40;

      // Create Y axis
      var valueAxisY = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxisY.title.text = "KM"

      // Create series
      let lineSeries = chart.series.push(new am4charts.LineSeries());
      lineSeries.dataFields.valueY = "km";
      lineSeries.dataFields.valueX = "avg";
      lineSeries.strokeWidth = 3;

      // Add simple bullet
      let circleBullet = lineSeries.bullets.push(new am4charts.CircleBullet());
      circleBullet.circle.fill = am4core.color("red");
      circleBullet.circle.fillOpacity = 0.5;
      circleBullet.propertyFields.showTooltipOn = "showTooltip"
      circleBullet.circle.radius = 12;

      let labelBullet = lineSeries.bullets.push(new am4charts.LabelBullet());
      labelBullet.label.text = "{km}";
      labelBullet.label.fontSize = "12px"

      lineSeries.tooltip.pointerOrientation = "vertical";

      chart.cursor = new am4charts.XYCursor();
      chart.cursor.snapToSeries = lineSeries;
      chart.cursor.xAxis = valueAxisX;
      this.chart = chart;
    });
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
