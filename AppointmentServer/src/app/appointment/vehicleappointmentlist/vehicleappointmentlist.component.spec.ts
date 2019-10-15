import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleappointmentlistComponent } from './vehicleappointmentlist.component';

describe('VehicleappointmentlistComponent', () => {
  let component: VehicleappointmentlistComponent;
  let fixture: ComponentFixture<VehicleappointmentlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleappointmentlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleappointmentlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
