import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagedJobsHomeComponent } from './managed-jobs-home.component';

describe('ManagedJobsHomeComponent', () => {
  let component: ManagedJobsHomeComponent;
  let fixture: ComponentFixture<ManagedJobsHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagedJobsHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagedJobsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
