import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMaterialtobinComponent } from './list-materialtobin.component';

describe('ListMaterialtobinComponent', () => {
  let component: ListMaterialtobinComponent;
  let fixture: ComponentFixture<ListMaterialtobinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListMaterialtobinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMaterialtobinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
