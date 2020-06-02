import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewassignleaveComponent } from './viewassignleave.component';

describe('ViewassignleaveComponent', () => {
  let component: ViewassignleaveComponent;
  let fixture: ComponentFixture<ViewassignleaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewassignleaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewassignleaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
