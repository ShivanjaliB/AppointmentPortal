import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointSummaryComponent } from './appoint-summary.component';

describe('AppointSummaryComponent', () => {
  let component: AppointSummaryComponent;
  let fixture: ComponentFixture<AppointSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
