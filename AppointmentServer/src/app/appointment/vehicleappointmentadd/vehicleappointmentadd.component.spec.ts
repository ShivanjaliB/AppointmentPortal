import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleappointmentaddComponent } from './vehicleappointmentadd.component';

describe('VehicleappointmentaddComponent', () => {
  let component: VehicleappointmentaddComponent;
  let fixture: ComponentFixture<VehicleappointmentaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleappointmentaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleappointmentaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
