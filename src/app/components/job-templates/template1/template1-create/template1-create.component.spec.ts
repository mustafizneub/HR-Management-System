import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Template1CreateComponent } from './template1-create.component';

describe('Template1CreateComponent', () => {
  let component: Template1CreateComponent;
  let fixture: ComponentFixture<Template1CreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Template1CreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Template1CreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
