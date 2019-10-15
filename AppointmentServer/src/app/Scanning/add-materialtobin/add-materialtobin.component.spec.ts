import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMaterialtobinComponent } from './add-materialtobin.component';

describe('AddMaterialtobinComponent', () => {
  let component: AddMaterialtobinComponent;
  let fixture: ComponentFixture<AddMaterialtobinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMaterialtobinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMaterialtobinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
