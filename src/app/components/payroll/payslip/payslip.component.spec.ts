import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayslipComponent } from './payslip.component';

describe('PayslipComponent', () => {
  let component: PayslipComponent;
  let fixture: ComponentFixture<PayslipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayslipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayslipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
