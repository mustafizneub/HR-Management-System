import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignationsHomeComponent } from './designations-home.component';

describe('DesignationsHomeComponent', () => {
  let component: DesignationsHomeComponent;
  let fixture: ComponentFixture<DesignationsHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignationsHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignationsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
