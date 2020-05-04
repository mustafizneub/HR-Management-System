import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Template6CreateComponent } from './template6-create.component';

describe('Template6CreateComponent', () => {
  let component: Template6CreateComponent;
  let fixture: ComponentFixture<Template6CreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Template6CreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Template6CreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
