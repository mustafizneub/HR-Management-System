import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagedJobComponent } from './managed-job.component';

describe('ManagedJobComponent', () => {
  let component: ManagedJobComponent;
  let fixture: ComponentFixture<ManagedJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagedJobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagedJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
