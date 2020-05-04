import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Template5CreateComponent } from './template5-create.component';

describe('Template5CreateComponent', () => {
  let component: Template5CreateComponent;
  let fixture: ComponentFixture<Template5CreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Template5CreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Template5CreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
