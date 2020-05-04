import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllEmployeesHomeComponent } from './all-employees-home.component';

describe('AllEmployeesHomeComponent', () => {
  let component: AllEmployeesHomeComponent;
  let fixture: ComponentFixture<AllEmployeesHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllEmployeesHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllEmployeesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
