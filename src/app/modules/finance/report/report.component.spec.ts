import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphExpenseComponent } from './graph-expense.component';

describe('GraphExpenseComponent', () => {
  let component: GraphExpenseComponent;
  let fixture: ComponentFixture<GraphExpenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphExpenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
