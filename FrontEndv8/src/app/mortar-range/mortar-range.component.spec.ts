import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MortarRangeComponent } from './mortar-range.component';

describe('MortarRangeComponent', () => {
  let component: MortarRangeComponent;
  let fixture: ComponentFixture<MortarRangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MortarRangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MortarRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
