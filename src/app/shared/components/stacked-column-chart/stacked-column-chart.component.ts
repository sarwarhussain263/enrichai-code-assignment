import { Component, OnInit, Inject, NgZone, PLATFORM_ID, Input } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
// amCharts imports
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

@Component({
  selector: 'app-stacked-column-chart',
  templateUrl: './stacked-column-chart.component.html',
  styleUrls: ['./stacked-column-chart.component.css']
})
export class StackedColumnChartComponent implements OnInit {
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
      let chart = am4core.create("stackedColumnChartDiv", am4charts.XYChart);

      // Add data
      // Add data
      chart.data = [{
        "year": "18",
        "critical": 2.5,
        "major": 2.5,
        "minor": 2.1
      }, {
        "year": "17",
        "critical": 2.6,
        "major": 2.7,
        "minor": 2.2
      }, {
        "year": "16",
        "critical": 2.8,
        "major": 2.9,
        "minor": 2.4
      }, {
        "year": "15",
        "critical": 2.8,
        "major": 2.9,
        "minor": 2.4
      }];

      // Create axes
      let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "year";
      categoryAxis.renderer.grid.template.location = 0;


      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.min = 0;
      valueAxis.title.text = 'Alarams';

      this.createSeries(chart, "critical", "Critical");
      this.createSeries(chart, "major", "Major");
      this.createSeries(chart, "minor", "Minor");

      // Legend
      let chartLegends = chart.legend = new am4charts.Legend();
      chartLegends.position = "bottom";

      chart.colors.list = [
        am4core.color("#845EC2"),
        am4core.color("#D65DB1"),
        am4core.color("#FF6F91"),
        am4core.color("#FF9671"),
        am4core.color("#FFC75F"),
        am4core.color("#F9F871")
      ];

    });
  }

  // Create series
  createSeries(chart, field, name) {

    // Set up series
    let series = chart.series.push(new am4charts.ColumnSeries());
    series.name = name;
    series.dataFields.valueY = field;
    series.dataFields.categoryX = "year";
    series.sequencedInterpolation = true;
//series

    // Make it stacked
    series.stacked = true;

    // Configure columns
    series.columns.template.width = am4core.percent(60);
    series.columns.template.tooltipText = "[bold]{name}[/]\n[font-size:14px]{categoryX}: {valueY}";

    // Add label
    let labelBullet = series.bullets.push(new am4charts.LabelBullet());
    labelBullet.label.text = "{valueY}";
    labelBullet.locationY = 0.5;
    labelBullet.label.hideOversized = true;

    return series;
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
