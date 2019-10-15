import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentInvoiceComponent } from './appointment-invoice.component';

describe('AppointmentInvoiceComponent', () => {
  let component: AppointmentInvoiceComponent;
  let fixture: ComponentFixture<AppointmentInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
