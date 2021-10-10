import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MohrCalcComponent } from './mohr-calc.component';

describe('MohrCalcComponent', () => {
  let component: MohrCalcComponent;
  let fixture: ComponentFixture<MohrCalcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MohrCalcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MohrCalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
