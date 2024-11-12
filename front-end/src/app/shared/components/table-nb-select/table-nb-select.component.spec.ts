import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableNbSelectComponent } from './table-nb-select.component';

describe('TableNbSelectComponent', () => {
  let component: TableNbSelectComponent;
  let fixture: ComponentFixture<TableNbSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableNbSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableNbSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
