import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Template4CreateComponent } from './template4-create.component';

describe('Template4CreateComponent', () => {
  let component: Template4CreateComponent;
  let fixture: ComponentFixture<Template4CreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Template4CreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Template4CreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
