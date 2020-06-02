import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyJobComponent } from './my-job.component';

describe('MyJobComponent', () => {
  let component: MyJobComponent;
  let fixture: ComponentFixture<MyJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyJobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
