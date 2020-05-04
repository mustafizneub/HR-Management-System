import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsHomeComponent } from './jobs-home.component';

describe('JobsHomeComponent', () => {
  let component: JobsHomeComponent;
  let fixture: ComponentFixture<JobsHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobsHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
