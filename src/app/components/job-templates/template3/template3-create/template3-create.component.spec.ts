import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Template3CreateComponent } from './template3-create.component';

describe('Template3CreateComponent', () => {
  let component: Template3CreateComponent;
  let fixture: ComponentFixture<Template3CreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Template3CreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Template3CreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
