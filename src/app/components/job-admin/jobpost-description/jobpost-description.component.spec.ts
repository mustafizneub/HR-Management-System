import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobpostDescriptionComponent } from './jobpost-description.component';

describe('JobpostDescriptionComponent', () => {
  let component: JobpostDescriptionComponent;
  let fixture: ComponentFixture<JobpostDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobpostDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobpostDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
