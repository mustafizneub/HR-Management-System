import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterOneComponent } from './filter-one.component';

describe('FilterOneComponent', () => {
  let component: FilterOneComponent;
  let fixture: ComponentFixture<FilterOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
