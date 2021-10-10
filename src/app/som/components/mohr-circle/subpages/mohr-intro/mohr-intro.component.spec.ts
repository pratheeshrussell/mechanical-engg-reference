import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MohrIntroComponent } from './mohr-intro.component';

describe('MohrIntroComponent', () => {
  let component: MohrIntroComponent;
  let fixture: ComponentFixture<MohrIntroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MohrIntroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MohrIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
