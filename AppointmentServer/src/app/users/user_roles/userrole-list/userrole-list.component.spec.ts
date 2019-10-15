import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserroleListComponent } from './userrole-list.component';

describe('UserroleListComponent', () => {
  let component: UserroleListComponent;
  let fixture: ComponentFixture<UserroleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserroleListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserroleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
