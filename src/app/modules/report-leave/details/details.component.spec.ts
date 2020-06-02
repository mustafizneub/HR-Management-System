import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeViewComponent } from './notice-view.component';

describe('NoticeViewComponent', () => {
  let component: NoticeViewComponent;
  let fixture: ComponentFixture<NoticeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoticeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
