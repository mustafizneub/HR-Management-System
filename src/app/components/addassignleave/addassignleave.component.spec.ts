import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddassignleaveComponent } from './addassignleave.component';

describe('AddassignleaveComponent', () => {
  let component: AddassignleaveComponent;
  let fixture: ComponentFixture<AddassignleaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddassignleaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddassignleaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
