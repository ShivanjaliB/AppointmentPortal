import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayAppointComponent } from './today-appoint.component';

describe('TodayAppointComponent', () => {
  let component: TodayAppointComponent;
  let fixture: ComponentFixture<TodayAppointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodayAppointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodayAppointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
