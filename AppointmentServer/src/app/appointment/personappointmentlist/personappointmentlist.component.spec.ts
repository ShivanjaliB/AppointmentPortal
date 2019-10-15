import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonappointmentlistComponent } from './personappointmentlist.component';

describe('PersonappointmentlistComponent', () => {
  let component: PersonappointmentlistComponent;
  let fixture: ComponentFixture<PersonappointmentlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonappointmentlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonappointmentlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
