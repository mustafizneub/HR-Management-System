import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateadminComponent } from './createadmin.component';

describe('CreateadminComponent', () => {
  let component: CreateadminComponent;
  let fixture: ComponentFixture<CreateadminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateadminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
