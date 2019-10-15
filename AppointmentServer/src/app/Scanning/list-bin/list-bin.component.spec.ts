import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBinComponent } from './list-bin.component';

describe('ListBinComponent', () => {
  let component: ListBinComponent;
  let fixture: ComponentFixture<ListBinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListBinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
