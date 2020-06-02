import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Template2CreateComponent } from './template2-create.component';

describe('Template2CreateComponent', () => {
  let component: Template2CreateComponent;
  let fixture: ComponentFixture<Template2CreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Template2CreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Template2CreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
