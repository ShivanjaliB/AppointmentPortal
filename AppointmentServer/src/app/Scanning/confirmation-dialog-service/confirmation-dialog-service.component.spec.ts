import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationDialogServiceComponent } from './confirmation-dialog-service.component';

describe('ConfirmationDialogServiceComponent', () => {
  let component: ConfirmationDialogServiceComponent;
  let fixture: ComponentFixture<ConfirmationDialogServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationDialogServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationDialogServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
