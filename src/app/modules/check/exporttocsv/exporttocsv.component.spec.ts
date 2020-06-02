import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExporttocsvComponent } from './exporttocsv.component';

describe('ExporttocsvComponent', () => {
  let component: ExporttocsvComponent;
  let fixture: ComponentFixture<ExporttocsvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExporttocsvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExporttocsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
