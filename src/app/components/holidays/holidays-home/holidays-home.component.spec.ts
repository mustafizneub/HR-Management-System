import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidaysHomeComponent } from './holidays-home.component';

describe('HolidaysHomeComponent', () => {
  let component: HolidaysHomeComponent;
  let fixture: ComponentFixture<HolidaysHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HolidaysHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HolidaysHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
