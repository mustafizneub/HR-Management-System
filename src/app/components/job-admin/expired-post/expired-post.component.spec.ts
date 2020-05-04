import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpiredPostComponent } from './expired-post.component';

describe('ExpiredPostComponent', () => {
  let component: ExpiredPostComponent;
  let fixture: ComponentFixture<ExpiredPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpiredPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpiredPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
