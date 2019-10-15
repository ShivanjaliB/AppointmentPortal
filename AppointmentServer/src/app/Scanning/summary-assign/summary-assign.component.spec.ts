import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryAssignComponent } from './summary-assign.component';

describe('SummaryAssignComponent', () => {
  let component: SummaryAssignComponent;
  let fixture: ComponentFixture<SummaryAssignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryAssignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
