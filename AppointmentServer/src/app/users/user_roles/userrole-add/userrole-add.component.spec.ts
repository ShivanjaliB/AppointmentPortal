import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserroleAddComponent } from './userrole-add.component';

describe('UserroleAddComponent', () => {
  let component: UserroleAddComponent;
  let fixture: ComponentFixture<UserroleAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserroleAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserroleAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
