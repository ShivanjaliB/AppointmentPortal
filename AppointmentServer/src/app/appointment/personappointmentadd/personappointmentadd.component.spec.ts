import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonappointmentaddComponent } from './personappointmentadd.component';

describe('PersonappointmentaddComponent', () => {
  let component: PersonappointmentaddComponent;
  let fixture: ComponentFixture<PersonappointmentaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonappointmentaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonappointmentaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
