import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentsHomeComponent } from './departments-home.component';

describe('DepartmentsHomeComponent', () => {
  let component: DepartmentsHomeComponent;
  let fixture: ComponentFixture<DepartmentsHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmentsHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
