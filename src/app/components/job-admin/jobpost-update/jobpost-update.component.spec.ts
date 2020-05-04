import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobpostUpdateComponent } from './jobpost-update.component';

describe('JobpostUpdateComponent', () => {
  let component: JobpostUpdateComponent;
  let fixture: ComponentFixture<JobpostUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobpostUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobpostUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
