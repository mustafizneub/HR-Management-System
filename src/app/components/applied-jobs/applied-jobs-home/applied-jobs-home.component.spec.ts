import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppliedJobsHomeComponent } from './applied-jobs-home.component';

describe('AppliedJobsHomeComponent', () => {
  let component: AppliedJobsHomeComponent;
  let fixture: ComponentFixture<AppliedJobsHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppliedJobsHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppliedJobsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
