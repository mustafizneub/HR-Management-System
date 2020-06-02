import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewadminleaveComponent } from './viewadminleave.component';

describe('ViewadminleaveComponent', () => {
  let component: ViewadminleaveComponent;
  let fixture: ComponentFixture<ViewadminleaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewadminleaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewadminleaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
