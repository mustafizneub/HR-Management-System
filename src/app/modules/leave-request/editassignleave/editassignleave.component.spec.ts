import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditassignleaveComponent } from './editassignleave.component';

describe('EditassignleaveComponent', () => {
  let component: EditassignleaveComponent;
  let fixture: ComponentFixture<EditassignleaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditassignleaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditassignleaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
