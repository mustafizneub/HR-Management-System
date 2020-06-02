import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminleaveeditComponent } from './adminleaveedit.component';

describe('AdminleaveeditComponent', () => {
  let component: AdminleaveeditComponent;
  let fixture: ComponentFixture<AdminleaveeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminleaveeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminleaveeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
