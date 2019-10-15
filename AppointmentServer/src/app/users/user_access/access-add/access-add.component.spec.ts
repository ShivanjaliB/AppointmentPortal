import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessAddComponent } from './access-add.component';

describe('AccessAddComponent', () => {
  let component: AccessAddComponent;
  let fixture: ComponentFixture<AccessAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
