import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgScatterDirectionalChartComponent } from './ng-scatter-directional-chart.component';

describe('NgScatterDirectionalChartComponent', () => {
  let component: NgScatterDirectionalChartComponent;
  let fixture: ComponentFixture<NgScatterDirectionalChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgScatterDirectionalChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgScatterDirectionalChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
