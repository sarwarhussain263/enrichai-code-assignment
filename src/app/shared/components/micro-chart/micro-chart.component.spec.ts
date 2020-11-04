import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MicroChartComponent } from './micro-chart.component';

describe('MicroChartComponent', () => {
  let component: MicroChartComponent;
  let fixture: ComponentFixture<MicroChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MicroChartComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MicroChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
