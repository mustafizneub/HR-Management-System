import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminleaverequestComponent } from './adminleaverequest.component';

describe('AdminleaverequestComponent', () => {
  let component: AdminleaverequestComponent;
  let fixture: ComponentFixture<AdminleaverequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminleaverequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminleaverequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
