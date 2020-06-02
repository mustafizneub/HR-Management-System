import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingPolicyComponent } from './pending-policy.component';

describe('PendingPolicyComponent', () => {
  let component: PendingPolicyComponent;
  let fixture: ComponentFixture<PendingPolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingPolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
